import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../book.service';
import { BookModel } from '../BookModel';


@Component({
  templateUrl: './editBook.component.html',
  styleUrls: ['./editBook.component.css'],
})

export class EditBookComponent {

  faPlusCircle = faPlusCircle;

  registrationForm: FormGroup;
  book_id: any;
  author_id: string;
  genre_id: string;
  publisher_id: string;
  book_name: string;
  book: string;

  Genres: any;
  Authors: any;
  Publishers: any;

  constructor(private toastr: ToastrService, private _location: Location, private route: ActivatedRoute, private BookService: BookService, private fb: FormBuilder, private router: Router, private http: HttpClient) {
  }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.book_id = params.get('book_id');
    })

    this.BookService.getBookById(this.book_id).subscribe((response: BookModel) => {
      this.author_id = response.author_id
      this.genre_id = response.genre_id
      this.publisher_id = response.publisher_id
      this.book_name = response.book_name
    });

    this.BookService.getAllGenre().subscribe((reponse) => {
      this.Genres = reponse;

    });

    this.BookService.getAllAuthor().subscribe((reponse) => {
      this.Authors = reponse;

    });

    this.BookService.getAllPublisher().subscribe((reponse) => {
      this.Publishers = reponse;

    })

    this.registrationForm = this.fb.group({
      book_id: [''],
      author_id: [''],
      genre_id: [''],
      publisher_id: [''],
      book_name: [''],
    })

  }

  AddGenre() {
    this.router.navigate(['/addGenre'])
  }

  AddAuthor() {
    this.router.navigate(['/addAuthor'])
  }

  AddPublisher() {
    this.router.navigate(['/addPublisher'])
  }

  EditBook(selectedItem: true) {

    this.book_id = this.registrationForm.value.book_id,
      this.author_id = this.registrationForm.value.author_id,
      this.genre_id = this.registrationForm.value.genre_id,
      this.publisher_id = this.registrationForm.value.publisher_id,
      this.book_name = this.registrationForm.value.book_name;

    if (this.registrationForm.value.book_name !== '' && this.registrationForm.value.author_id !== '' && this.registrationForm.value.genre_id !== '' && this.registrationForm.value.publisher_id !== '') {
      return this.http.put("http://localhost:3000/book/" + this.book_id, selectedItem).subscribe(response => { this.showSuccess(response), this._location.back() }, error => { this.errorSuccess() });
    } else {
      this.errorSuccess()
    }
  }

  showSuccess(any) {
    this.toastr.success('The ' + this.registrationForm.value.book_name + ' ' + 'book has been successfully edited', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Book not edited, please try again', 'Error')
  }
}
