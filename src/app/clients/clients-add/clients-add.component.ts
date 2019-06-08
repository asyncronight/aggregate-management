import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';

import { Client } from 'src/app/models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.css']
})
export class ClientsAddComponent implements OnInit {
  editMode: boolean;
  isLoading = false;
  @ViewChild('f', { static: true }) form: NgForm;

  constructor(
    private afs: AngularFirestore,
    private dialogRef: MatDialogRef<ClientsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.editMode = this.data && !!this.data.client;
    if (this.editMode) {
      // Use setTimeout to delay the form initialization until
      // all formControls are registred
      setTimeout(() => {
        this.form.setValue({
          name: this.data.client.name,
          description: this.data.client.description
        });
      }, 0);
    }
  }

  onSubmit(f: NgForm) {
    this.isLoading = true;
    const client: Client = f.value;
    let p: Promise<any>;
    if (this.editMode) {
      p = this.afs.doc<Client>(`clients/${this.data.client.id}`).update(client);
    } else {
      p = this.afs.collection<Client>('clients').add(client);
    }

    p.then(() => {
      this.snack.open('Client saved', 'Close', {
        duration: 3000
      });
      this.dialogRef.close();
    })
      .catch(() => {
        this.snack.open('An error occured', 'Close', {
          duration: 3000
        });
      })
      .finally(() => (this.isLoading = false));
  }
}
