import {
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AngularFirestore } from '@angular/fire/firestore';

import { Client } from 'src/app/models';

@Component({
  selector: 'app-clients-emails',
  templateUrl: './clients-emails.component.html',
  styleUrls: ['./clients-emails.component.css']
})
export class ClientsEmailsComponent implements OnInit {
  displayedColumns = ['name', 'active', 'delete'];
  loading = false;
  deleting = false;

  constructor(
    private db: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    private snack: MatSnackBar,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  onChange(toggle: MatSlideToggle, checked: boolean, client: Client) {
    toggle.checked = !checked;
  }

  deleteEmail(email: string) {
    this.deleting = true;
    this.db
      .doc<Client>(`clients/${this.data.client.id}`)
      .update({
        emails: this.data.client.emails.filter(e => e.email !== email)
      })
      .finally(() => (this.deleting = false));
  }

  onSubmit(form: NgForm) {
    const email = {
      email: form.value.email,
      active: !!form.value.active
    };
    if (this.data.client.emails.map(e => e.email).indexOf(email.email) !== -1) {
      this.snack.open('Email already exist', 'Close', { duration: 3000 });
      return;
    }
    this.loading = true;
    this.db
      .doc<Client>(`clients/${this.data.client.id}`)
      .update({
        emails: [...this.data.client.emails, email]
      })
      .then(() => {
        form.resetForm();
      })
      .finally(() => (this.loading = false));
  }
}
