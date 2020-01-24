import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faBookMedical, faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { BookService } from './book.service';


@Component({
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  faTrash = faTrash;
  faUserEdit = faUserEdit;
  faSearch = faSearch;
  faBookMedical = faBookMedical

  Books: any;
  Delete: any;
  searchText: any;
  p: number = 1;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private BookService: BookService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }


  ngOnInit() {

    this.BookService.getAllBook().subscribe((reponse) => {
      this.Books = reponse;

    });


  }

  GetAllBooks() {
    this.BookService.getAllBook().subscribe((reponse) => {
      this.Books = reponse;

    });
  }


  AddBook() {
    this.router.navigate(['/addBook']);
  }

  DeleteBook(selectedItem: any) {
    this.Delete = selectedItem.book_id;
    return this.http.delete("http://localhost:3000/book/" + this.Delete).subscribe(response => { console.log(response), this.GetAllBooks(), this.showSuccess() },
      error => { this.errorSuccess() });

  }

  EditBook(selectedItem: any) {
    this.router.navigate(['/editBook/' + selectedItem.book_id]);

  }

  showSuccess() {
    this.toastr.success('Book successfully deleted', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('The book has not been deleted', 'Error');
  }



}
