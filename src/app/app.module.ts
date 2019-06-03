import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  FirebaseUIModule,
  firebase,
  FirebaseuiAngularLibraryComponent
} from 'firebaseui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot({
      signInFlow: 'popup',
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FirebaseuiAngularLibraryComponent]
})
export class AppModule {}
