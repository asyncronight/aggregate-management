import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take, map, tap, mergeMap } from 'rxjs/operators';

import { Group, Truck, Client } from 'src/app/models';
import { TrucksAddComponent } from '../trucks-add/trucks-add.component';

@Component({
  selector: 'app-trucks-list',
  templateUrl: './trucks-list.component.html',
  styleUrls: ['./trucks-list.component.css']
})
export class TrucksListComponent implements OnInit {
  client$: Observable<Client>;
  group$: Observable<Group>;
  trucks$: Observable<Truck[]>;
  idClient: string;
  idGroup: string;
  displayedColumns = ['id', 'name', 'type', 'edit', 'delete', 'purge'];
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private db: AngularFirestore,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idClient = params.get('idClient');
      this.idGroup = params.get('idGroup');
      this.client$ = this.db
        .doc<Client>(`clients/${this.idClient}`)
        .valueChanges();
      this.group$ = this.db
        .doc<Group>(`clients/${this.idClient}/groups/${this.idGroup}`)
        .valueChanges();
      this.trucks$ = this.db
        .collection<Truck>(
          `clients/${this.idClient}/groups/${this.idGroup}/trucks`
        )
        .valueChanges({ idField: 'id' });
    });
  }

  openNewTruckDialog() {
    this.dialog.open(TrucksAddComponent, {
      width: '400px',
      data: { idClient: this.idClient, idGroup: this.idGroup }
    });
  }

  openEditTruckDialog(truck: Truck) {
    this.dialog.open(TrucksAddComponent, {
      width: '400px',
      data: { idClient: this.idClient, idGroup: this.idGroup, truck }
    });
  }

  deleteTruck(idTruck: string) {
    // Todo: don't delete if this group has any data
    // (so the database doesn't contain data with no truck)
    // Show an alert (ex: 'Please delete all data first') instead
    if (confirm('Are you sure?')) {
      this.db
        .collection('data', ref => ref.where('id', '==', idTruck))
        .valueChanges()
        .pipe(
          take(1),
          map(data => data.length > 0)
        )
        .subscribe(hasdata => {
          if (hasdata) {
            alert('Please delete all data first');
          } else {
            this.db
              .doc(
                `clients/${this.idClient}/groups/${
                  this.idGroup
                }/trucks/${idTruck}`
              )
              .delete();
          }
        });
    }
  }

  purgeData(id: string) {
    if (confirm('Are you sure?')) {
      this.db
        .collection('data', ref => ref.where('id', '==', id))
        .snapshotChanges()
        .pipe(
          take(1),
          mergeMap(docs => {
            const batch = this.db.firestore.batch();
            docs.forEach(doc => batch.delete(doc.payload.doc.ref));
            return batch.commit();
          })
        )
        .subscribe(
          () =>
            this.snack.open('Data deleted', 'Close', {
              duration: 3000
            }),
          () =>
            this.snack.open('An error occured', 'Close', {
              duration: 3000
            })
        );
    }
  }
}
