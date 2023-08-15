import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  user: any = {};

  favoriteMovies: any[] = [];



  @Input() userData = { Name: '', Username: '', Password: '', Email: '', Birthday: '', };

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

//get all the user data and display it.
  
getUser(): void {
  this.fetchApiData.getOneUser().subscribe((response: any) => {
    this.user = response;
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.user.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');


    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.favoriteMovies = response.filter((m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0)
    })
  })
}

editUser(): void {
  this.fetchApiData.editUser(this.userData).subscribe((data) => {
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('Username', data.Username);
    // console.log(data);
    this.snackBar.open('User has been updated', 'OK', {
      duration: 2000
    })
    window.location.reload();
  }, (result) => {
    this.snackBar.open(result, 'OK', {
      duration: 2000
    })
  });
}


//delete user will delete their account permanently and be sent back to the welcome screen.
deleteUser(): void {
  if (confirm('are you sure?')) {
    this.router.navigate(['welcome']).then(() => {
      this.snackBar.open(
        'You have successfully deleted your account',
        'OK',
        {
          duration: 2000,
        }
      );
    });
    this.fetchApiData.deleteUser().subscribe((result) => {
      // console.log(result);
      localStorage.clear();
    });
  }
}


}