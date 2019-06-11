import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { GroupMaterialModule } from './groups-material.module';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsAddComponent } from './groups-add/groups-add.component';

@NgModule({
  declarations: [GroupsListComponent, GroupsAddComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    AngularFirestoreModule,
    GroupMaterialModule,
    GroupsRoutingModule
  ],
  entryComponents: [GroupsAddComponent]
})
export class GroupsModule {}
