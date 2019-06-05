import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Client, Group } from 'src/app/models';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  groups$ : Observable<Group[]>;
  displayedColumns = ['name', 'clientName', 'edit', 'delete'];

  constructor(private dialog: MatDialog, private db: AngularFirestore) { }

  ngOnInit() {
    //TODO : subscribe on this observable and pipe that to new object { name , client_name }
    this.db
      .collection<Group>('groups')
      .valueChanges({ idField: 'id' });
  }

  deleteGroup(id: string) {
    // Todo: don't delete if this client has any groups
    // (so the database doesn't contain groups with no clients)
    // Show an alert (ex: 'Please delete all groups first') instead
    if (confirm('Are you sure?')) {
      this.db
        .collection<Group>('camions', ref => ref.where('groupId', '==', id))
        .valueChanges()
        .pipe(
          take(1),
          map(groups => groups.length > 0)
        )
        .subscribe(hasCamions => {
          if (hasCamions) {
            alert('Please delete all camions first');
          } else {
            this.db.doc(`groups/${id}`).delete();
          }
        });
    }
  }
}
