import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

import { Client } from 'src/app/models';

@Component({
  selector: 'app-clients-emails',
  templateUrl: './clients-emails.component.html',
  styleUrls: ['./clients-emails.component.css']
})
export class ClientsEmailsComponent implements OnInit {
  client$: Observable<Client>;
  loading = false;
  deleting = false;
  displayedColumns = ['name', 'active', 'delete'];

  constructor(
    private db: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.client$ = this.db
      .doc<Client>(`clients/${this.data.id}`)
      .valueChanges();
  }

  onChange(toggle: MatSlideToggle, checked: boolean, email: string) {
    this.deleting = true;
    this.db
      .doc<Client>(`clients/${this.data.id}`)
      .get()
      .pipe(
        take(1),
        switchMap(doc => {
          const emails: {
            email: string;
            active: boolean;
          }[] = doc.data().emails as any;
          emails.forEach(e => {
            if (e.email === email) {
              e.active = checked;
            }
          });
          return doc.ref.update({ emails });
        })
      )
      .subscribe(
        () => (this.deleting = false),
        () => {
          this.deleting = false;
          toggle.checked = !checked;
        }
      );
  }

  deleteEmail(email: string) {
    this.deleting = true;
    this.db
      .doc<Client>(`clients/${this.data.id}`)
      .get()
      .pipe(
        take(1),
        switchMap(doc =>
          doc.ref.update({
            emails: doc.data().emails.filter(e => e.email !== email)
          })
        )
      )
      .subscribe(() => (this.deleting = false), () => (this.deleting = false));
  }

  onSubmit(form: NgForm) {
    const email = {
      email: form.value.email,
      active: !!form.value.active
    };
    this.loading = true;
    this.db
      .doc<Client>(`clients/${this.data.id}`)
      .get()
      .pipe(
        take(1),
        switchMap(doc => {
          let emails = doc.data().emails;
          if (!emails) {
            emails = [];
          }
          if (emails.map(e => e.email).indexOf(email.email) !== -1) {
            this.snack.open('Email already exist', 'Close', { duration: 3000 });
            return throwError('Email exists');
          }
          return doc.ref.update({ emails: [...emails, email] });
        })
      )
      .subscribe(
        () => {
          this.loading = false;
          form.resetForm();
        },
        () => (this.loading = false)
      );
  }
}
