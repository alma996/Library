import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorService } from '../author.service';
import { AuthorModel } from '../AuthorModel';

@Component({
  templateUrl: './editAuthor.component.html',
  styleUrls: ['./editAuthor.component.css']
})


export class EditAuthorComponent {

  registrationForm: FormGroup;
  author_id: any;
  first_name: string;
  last_name: string;

  Alma: any;



  constructor(private route: ActivatedRoute, private _location: Location, private toastr: ToastrService, private AuthorService: AuthorService, private fb: FormBuilder, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {


    this.route.paramMap.subscribe(params => {
      this.author_id = params.get('author_id');
    })

    this.AuthorService.getUserById(this.author_id).subscribe((reponse: AuthorModel) => {
      console.log(reponse);
      this.first_name = reponse.first_name
      this.last_name = reponse.last_name
    });

    this.registrationForm = this.fb.group({
      author_id: [''],
      first_name: [''],
      last_name: [''],
    })
  }

  GetAllAuthors() {
    this.AuthorService.getUserById(this.author_id).subscribe((reponse: AuthorModel) => {
      console.log(reponse);
      this.first_name = reponse.first_name
      this.last_name = reponse.last_name
    })
  }

  EditAuthor(selectedItem: true) {

    this.author_id = this.registrationForm.value.author_id,
      this.first_name = this.registrationForm.value.first_name,
      this.last_name = this.registrationForm.value.last_name;


    if (this.registrationForm.value.first_name !== '' && this.registrationForm.value.last_name !== '') {
      return this.http.put("http://localhost:3000/author/" + this.author_id, selectedItem).subscribe(response => { this.showSuccess(response), this._location.back() }, error => { this.errorSuccess(), this.GetAllAuthors() });
    } else {
      this.errorSuccess()
    }
  }


  showSuccess(any) {
    this.toastr.success('Author' + ' ' + this.registrationForm.value.first_name + ' ' + this.registrationForm.value.last_name + ' ' + 'has been successfully edited', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Author not edited, please fill the required fields or try again', 'Error')
  }


}