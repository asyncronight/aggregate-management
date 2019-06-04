import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { ClientsAddComponent } from '../clients-add/clients-add.component';
import { Client, Group } from 'src/app/models';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  clients$: Observable<Client[]>;
  displayedColumns = ['name', 'description', 'edit', 'delete'];

  constructor(private dialog: MatDialog, private db: AngularFirestore) {}

  ngOnInit() {
    this.clients$ = this.db
      .collection<Client>('clients')
      .valueChanges({ idField: 'id' });
  }

  openNewClientDialog() {
    this.dialog.open(ClientsAddComponent, {
      width: '400px'
    });
  }

  openEditClientDialog(client: Client) {
    this.dialog.open(ClientsAddComponent, {
      width: '400px',
      data: { client }
    });
  }

  deleteClient(id: string) {
    // Todo: don't delete if this client has any groups
    // (so the database doesn't contain groups with no clients)
    // Show an alert (ex: 'Please delete all groups first') instead
    if (confirm('Are you sure?')) {
      this.db
        .collection<Group>('groups', ref => ref.where('clientId', '==', id))
        .valueChanges()
        .pipe(
          take(1),
          map(clients => clients.length > 0)
        )
        .subscribe(hasGroups => {
          if (hasGroups) {
            alert('Please delete all groups first');
          } else {
            this.db.doc(`clients/${id}`).delete();
          }
        });
    }
  }
}
