import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  hide = true;
  loading = false;

  constructor(
    private dialogRef: MatDialogRef<SignInComponent>,
    private snackbar: MatSnackBar,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    this.loading = true;
    this.auth.auth
      .signInWithEmailAndPassword(f.value.email, f.value.password)
      .then(value => {
        this.snackbar.open('Welcome ' + value.user.email, 'Close', {
          duration: 3000
        });
        this.dialogRef.close();
      })
      .catch(() => {
        this.snackbar.open('Login failed, check your information', 'Close', {
          duration: 3000
        });
        this.loading = false;
      });
  }

  onForget(email: string) {
    if (confirm(`A password reset link will be sent to ${email}, Continue ?`)) {
      this.loading = true;
      this.auth.auth
        .sendPasswordResetEmail(email)
        .then(() =>
          this.snackbar.open('Check your mailbox', 'X', { duration: 3000 })
        )
        .catch(() =>
          this.snackbar.open('Failed sending email', 'X', { duration: 3000 })
        )
        .finally(() => (this.loading = false));
    }
  }
}
