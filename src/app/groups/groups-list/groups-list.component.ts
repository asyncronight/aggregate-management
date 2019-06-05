import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {  Group } from 'src/app/models';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  groups$ : Observable<Group[]>;
  displayedColumns = ['name', 'clientId', 'edit' , 'delete'];

  constructor(private dialog: MatDialog, private db: AngularFirestore) { }

  ngOnInit() {
    //TODO : subscribe on this observable and pipe that to new object { name , client_name }
    this.groups$ = this.db
      .collection<Group>('groups')
      .valueChanges({ idField: 'id' });
  }

}
