import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';

import { Group } from '../../../models';

@Component({
  selector: 'app-groups-add',
  templateUrl: './groups-add.component.html',
  styleUrls: ['./groups-add.component.css']
})
export class GroupsAddComponent implements OnInit {
  editMode: boolean;
  isLoading = false;
  @ViewChild('f', { static: true }) form: NgForm;

  constructor(
    private afs: AngularFirestore,
    private dialogRef: MatDialogRef<GroupsAddComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { idClient: string; group: Group },
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.editMode = this.data && !!this.data.group;
    if (this.editMode) {
      setTimeout(() => {
        this.form.setValue({
          name: this.data.group.name
        });
      }, 0);
    }
  }

  onSubmit(f: NgForm) {
    this.isLoading = true;
    const group: Group = f.value;
    let p: Promise<any>;
    if (this.editMode) {
      p = this.afs
        .doc<Group>(
          `clients/${this.data.idClient}/groups/${this.data.group.id}`
        )
        .update(group);
    } else {
      p = this.afs
        .collection<Group>(`clients/${this.data.idClient}/groups`)
        .add(group);
    }
    p.then(() => {
      this.snack.open('Group saved', 'Close', {
        duration: 3000
      });
      this.dialogRef.close();
    }).catch(() => {
      this.snack.open('An error occured', 'Close', {
        duration: 3000
      });
      this.isLoading = false;
    });
  }
}
