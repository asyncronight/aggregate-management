import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';

import { Truck } from 'src/app/models';

@Component({
  selector: 'app-trucks-add',
  templateUrl: './trucks-add.component.html',
  styleUrls: ['./trucks-add.component.css']
})
export class TrucksAddComponent implements OnInit {
  editMode: boolean;
  isLoading = false;
  @ViewChild('f', { static: true }) form: NgForm;
  truckTypes = ['Type 1', 'Type 2'];

  constructor(
    private afs: AngularFirestore,
    private dialogRef: MatDialogRef<TrucksAddComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { idClient: string; idGroup: string; truck: Truck },
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.editMode = this.data && !!this.data.truck;
    if (this.editMode) {
      setTimeout(() => {
        this.form.setValue({
          name: this.data.truck.name,
          type: this.data.truck.type
        });
      }, 0);
    }
  }

  onSubmit(f: NgForm) {
    this.isLoading = true;
    const truck: Truck = f.value;
    let p: Promise<any>;
    if (this.editMode) {
      p = this.afs
        .doc<Truck>(
          `clients/${this.data.idClient}/groups/${this.data.idGroup}/trucks/${
            this.data.truck.id
          }`
        )
        .update(truck);
    } else {
      p = this.afs
        .collection<Truck>(
          `clients/${this.data.idClient}/groups/${this.data.idGroup}/trucks`
        )
        .add(truck);
    }
    p.then(() => {
      this.snack.open('Truck saved', 'Close', {
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
