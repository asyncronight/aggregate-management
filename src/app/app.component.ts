import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SignInComponent } from './sign-in/sign-in.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private ngUnsubscribe = new Subject();

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.auth.authState
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => (this.isAuthenticated = !!res));
  }

  onSigninOrSignout() {
    if (this.isAuthenticated) {
      this.auth.auth.signOut().then(() => this.router.navigate(['']));
    } else {
      this.dialog.open(SignInComponent, {
        width: '400px'
      });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
