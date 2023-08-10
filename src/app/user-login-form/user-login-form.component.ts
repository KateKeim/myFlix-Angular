import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UserRegistrationService } from '../fetch-api-data.service';

import { MatDialogRef } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { R3PartialDeclaration } from '@angular/compiler';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((data) => {
      
      localStorage.setItem("user", JSON.stringify(data.user.Username))
      localStorage.setItem("token", data.token);
      this.router.navigate(['movies']);

      // console.log(data)
      this.dialogRef.close();
      this.snackBar.open('you\'ve been logged in', 'OK', {
        duration: 2000
      });
    }, () => {
      this.snackBar.open('sorry, something went wrong. please try again', 'OK', {
        duration: 2000
      });
    })
  }

}
