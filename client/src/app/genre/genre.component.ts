import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { GenreService } from './genre.service';

@Component({
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  faTrash = faTrash;
  faUserEdit = faUserEdit;
  faSearch = faSearch

  Genres: any;
  Delete: any;
  searchText: any;
  p: number = 1;


  constructor(private GenreService: GenreService, private router: Router, private toastr: ToastrService, private http: HttpClient) {
  }


  ngOnInit() {

    this.GenreService.getAllGenres().subscribe((reponse) => {
      console.log(reponse)
      this.Genres = reponse;
    });


  }


  GetAllGenres() {
    // User data which we have received from the registration form.
    this.GenreService.getAllGenres().subscribe((reponse) => {
      this.Genres = reponse;
    });

  }

  AddGenre() {
    this.router.navigate(['/addGenre']);
  }

  DeleteGenre(selectedItem: any) {
    this.Delete = selectedItem.genre_id;
    return this.http.delete("http://localhost:3000/genre/" + this.Delete).subscribe(response => { console.log(response), this.GetAllGenres(), this.showSuccess() },
      error => { this.errorSuccess() });
  }

  EditGenre(selectedItem: any) {
    this.router.navigate(['/editGenre/' + selectedItem.genre_id]);

  }

  showSuccess() {
    this.toastr.success('Genre successfully deleted', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Genre has not been deleted', 'Error');
  }





}
