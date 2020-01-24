import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GenreService } from '../genre.service';
import { GenreModel } from '../GenreModel';


@Component({
  templateUrl: './editGenre.component.html',
  styleUrls: ['./editGenre.component.css'],
})

export class EditGenreComponent {

  registrationForm: FormGroup;
  genre_id: any;
  genre_name: string;

  constructor(private toastr: ToastrService, private _location: Location, private route: ActivatedRoute, private GenreService: GenreService, private fb: FormBuilder, private router: Router, private http: HttpClient) {
  }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.genre_id = params.get('genre_id');
    })

    this.GenreService.getGenreById(this.genre_id).subscribe((reponse: GenreModel) => {
      console.log(reponse);
      this.genre_name = reponse.genre_name
    });

    this.registrationForm = this.fb.group({
      genre_id: [''],
      genre_name: [''],
    })
  }

  EditGenre(selectedItem: true) {

    this.genre_id = this.registrationForm.value.genre_id,
      this.genre_name = this.registrationForm.value.genre_name;

    if (this.registrationForm.value.genre_name !== '') {
      return this.http.put("http://localhost:3000/genre/" + this.genre_id, selectedItem).subscribe(response => { this.showSuccess(response), this._location.back() }, error => { this.errorSuccess() });
    } else {
      this.errorSuccess()
    }
  }

  showSuccess(any) {
    this.toastr.success('Genre' + ' ' + this.registrationForm.value.genre_name + ' ' + 'has been successfully edited', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Genre not edited, please fill the required fields or try again', 'Error')
  }


}
