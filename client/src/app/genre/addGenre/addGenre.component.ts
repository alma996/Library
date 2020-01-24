import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GenreService } from '../genre.service';

@Component({
  templateUrl: './addGenre.component.html',
  styleUrls: ['./addGenre.component.css']
})
export class AddGenreComponent {

  registrationForm: FormGroup;

  get genre_id() {
    return this.registrationForm.get('genre_id')
  }

  get genre_name() {
    return this.registrationForm.get('genre_name')
  }

  constructor(private GenreService: GenreService, private toastr: ToastrService, private _location: Location, private fb: FormBuilder, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      genre_id: [''],
      genre_name: [''],
    })
  }

  AddGenre(genredata) {
    if (this.registrationForm.value.genre_name !== '') {
      this.GenreService.addGenres(genredata).subscribe((response) => { this.showSuccess(response), this._location.back() }, error => { this.errorSuccess() });

    } else {
      this.errorSuccess()
    }
  }

  showSuccess(any) {
    this.toastr.success('Genre' + ' ' + this.registrationForm.value.genre_name + ' ' + 'successfully added', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Please fill the required fields', 'Error');
  }

}