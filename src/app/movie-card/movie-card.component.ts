import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})


export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getMovies();

}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((response: any) => {
    this.movies = response;
    console.log(this.movies);
    return this.movies;
  });
}


/**
 * 
 * @param name 
 * @param description
 * param data will passeds into the dialog when opened.
 */

getGenre(name: string, description: string): void {
  this.dialog.open(MovieGenreComponent, {
    data: {
      title: name,
      content: description,
    }
  })
}

/**
 * 
 * @param name 
 * @param bio 
 * param data will passeds into the dialog when opened.
 */

getDirector(name: string, bio: string): void {
  this.dialog.open(MovieGenreComponent, {
    data: {
      title: name,
      content: bio,
    }
  })
}

/**
 * 
 * @param description 
 * param data will passeds into the dialog when opened.
 */

getSynopsis(description: string): void {
  this.dialog.open(MovieGenreComponent, {
    data: {
      title: "Description",
      content: description,
    }
  })
}

/**
 * 
 * @param id 
 * add movie to the user profile
 */
addFavorite(id: string): void {
  this.fetchApiData.addFavoriteMovie(id).subscribe((Response: any) => {
    this.snackBar.open('added to favorites', 'OK', {
      duration: 2000
    })
  })
}

isFavorite(id: string): boolean {
  return this.fetchApiData.isFavoriteMovie(id)
}

removeFavorite(id: string): void {
  this.fetchApiData.deleteFavoriteMovie(id).subscribe((Response: any) => {
    this.snackBar.open('removed to favorites', 'OK', {
      duration: 2000
    })
  })
}
}
