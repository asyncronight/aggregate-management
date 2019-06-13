import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';

import { Client } from 'src/app/models';

@Component({
  selector: 'app-clients-api-keys',
  templateUrl: './clients-api-keys.component.html',
  styleUrls: ['./clients-api-keys.component.css']
})
export class ClientsApiKeysComponent implements OnInit {
  client$: Observable<Client>;
  apiKey: string;

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

  generateKey() {
    this.apiKey = (
      Math.random()
        .toString(36)
        .substr(2, 7) +
      '-' +
      Math.random()
        .toString(36)
        .substr(2, 7) +
      '-' +
      Math.random()
        .toString(36)
        .substr(2, 7)
    ).toUpperCase();
  }

  saveKey() {
    if (
      !confirm(
        'The key will be lost after saving.\nMake sure you copied it before continuing.\nContinue?'
      )
    ) {
      return;
    }
    this.db
      .doc<Client>(`clients/${this.data.id}`)
      .update({
        apiKey: {
          time: firestore.Timestamp.now(),
          prefix: this.apiKey.substr(0, 4),
          hash: this.hash(this.apiKey)
        }
      })
      .finally(() => (this.apiKey = null));
  }

  revokeKey() {
    if (
      confirm(
        "Devices using this key won't be able to send data to the server.\nContinue?"
      )
    ) {
      this.db.doc<Client>(`clients/${this.data.id}`).update({ apiKey: null });
    }
  }

  private hash(key: string): number {
    return key
      .split('')
      .reduce(
        (prevHash, currVal) =>
          ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
        0
      );
  }
}
