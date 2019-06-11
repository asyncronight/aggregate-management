import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Group, Client, Truck } from '../../../models';
import { GroupsAddComponent } from '../groups-add/groups-add.component';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  client$: Observable<Client>;
  groups$: Observable<Group[]>;
  idClient: string;
  displayedColumns = ['name', 'edit', 'delete'];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idClient = params.get('idClient');
      this.client$ = this.db
        .doc<Client>(`clients/${this.idClient}`)
        .snapshotChanges()
        .pipe(
          map(doc => {
            const client = {
              ...doc.payload.data(),
              id: doc.payload.id
            } as Client;
            return client;
          })
        );
      this.groups$ = this.db
        .collection<Group>(`clients/${this.idClient}/groups`)
        .valueChanges({ idField: 'id' });
    });
  }

  openNewGroupDialog() {
    this.dialog.open(GroupsAddComponent, {
      width: '400px',
      data: { idClient: this.idClient }
    });
  }

  openEditGroupDialog(group: Group) {
    this.dialog.open(GroupsAddComponent, {
      width: '400px',
      data: { idClient: this.idClient, group }
    });
  }

  deleteGroup(idGroup: string) {
    // Todo: don't delete if this group has any trucks
    // (so the database doesn't contain trucks with no groups)
    // Show an alert (ex: 'Please delete all trucks first') instead
    if (confirm('Are you sure?')) {
      this.db
        .collection<Truck>(`clients/${this.idClient}/groups/${idGroup}/trucks`)
        .valueChanges()
        .pipe(
          take(1),
          map(trucks => trucks.length > 0)
        )
        .subscribe(hasTrucks => {
          if (hasTrucks) {
            alert('Please delete all trucks first');
          } else {
            this.db.doc(`clients/${this.idClient}/groups/${idGroup}`).delete();
          }
        });
    }
  }
}
