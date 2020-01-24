import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthorService } from './author.service';

@Component({
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  faTrash = faTrash;
  faSearch = faSearch
  faUserEdit = faUserEdit;

  Authors: any;
  Delete: any;
  searchText: any;
  p: number = 1;


  constructor(private AuthorService: AuthorService, private router: Router, private http: HttpClient, private toastr: ToastrService) {
  }


  ngOnInit() {

    this.AuthorService.getAllUsers().subscribe((reponse) => {
      console.log(reponse)
      this.Authors = reponse;
    });


  }



  GetAllUser() {
    // User data which we have received from the registration form.
    this.AuthorService.getAllUsers().subscribe((reponse) => {
      console.log(reponse)
      this.Authors = reponse;
    });

  }

  AddAuthor() {
    this.router.navigate(['/addAuthor']);
  }

  DeleteAuthor(selectedItem: any) {
    console.log("Selected item Id: ", selectedItem.author_id);
    this.Delete = selectedItem.author_id;
    return this.http.delete("http://localhost:3000/author/" + this.Delete).subscribe(response => { console.log(response), this.GetAllUser(), this.showSuccess() },
      error => { this.errorSuccess() });
  }

  EditAuthor(selectedItem: any) {
    this.router.navigate(['/editAuthor/' + selectedItem.author_id]);
    console.log("Selected item id: ", selectedItem.author_id, selectedItem.first_name, selectedItem.last_name);

  }

  showSuccess() {
    this.toastr.success('Author successfully deleted', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Author has not been deleted', 'Error');
  }





}
