import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Group } from 'src/app/models';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  groups$: Observable<Group[]>;
  displayedColumns = ['name', 'clientName', 'edit', 'delete'];

  constructor(private dialog: MatDialog, private db: AngularFirestore) {}

  ngOnInit() {
    this.groups$ = this.db
      .collection<Group>('groups')
      .valueChanges({ idField: 'id' });
  }

  deleteGroup(id: string) {
    // Todo: don't delete if this group has any trucks
    // (so the database doesn't contain trucks with no groups)
    // Show an alert (ex: 'Please delete all trucks first') instead
    if (confirm('Are you sure?')) {
      this.db
        .collection<Group>('trucks', ref => ref.where('groupId', '==', id))
        .valueChanges()
        .pipe(
          take(1),
          map(groups => groups.length > 0)
        )
        .subscribe(hasTrucks => {
          if (hasTrucks) {
            alert('Please delete all trucks first');
          } else {
            this.db.doc(`groups/${id}`).delete();
          }
        });
    }
  }
}
