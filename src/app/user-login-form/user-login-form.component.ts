import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {   
    @Input() userData = { Username: '', Password: '' };
  
    constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar,
      private router: Router 
    ) { }
  
    ngOnInit(): void {
    }
  
    // This is the function responsible for sending the form inputs to the backend
    loginUser(): void {
      this.fetchApiData.loginUser(this.userData).subscribe((result) => {
        // Logic for a successful user login goes here! (To be implemented)
        console.log(result);
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('userId', result.user._id);
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('user logged in successfully', 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
      }, (result) => {
        this.snackBar.open('User Login Failed', 'OK', {
          duration: 2000
        });
      });
    }
}
