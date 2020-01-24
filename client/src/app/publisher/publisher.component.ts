import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PublisherService } from './publisher.service';

@Component({
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {
  faTrash = faTrash;
  faSearch = faSearch;
  faUserEdit = faUserEdit;

  Publishers: any;
  Delete: any;
  searchText: any;
  p: number = 1;


  constructor(private PublisherService: PublisherService, private router: Router, private http: HttpClient, private toastr: ToastrService) {
  }


  ngOnInit() {

    this.PublisherService.getAllPublisher().subscribe((reponse) => {
      console.log(reponse)
      this.Publishers = reponse
    });


  }

  GetAllPublisher() {
    this.PublisherService.getAllPublisher().subscribe((reponse) => {
      console.log(reponse)
      this.Publishers = reponse
    });

  }

  AddPublisher() {
    this.router.navigate(['/addPublisher']);
  }

  DeletePublisher(selectedItem: any) {
    this.Delete = selectedItem.publisher_id;
    return this.http.delete("http://localhost:3000/publisher/" + this.Delete).subscribe(response => { console.log(response), this.GetAllPublisher(), this.showSuccess() },
      error => { this.errorSuccess() });
  }

  EditPublisher(selectedItem: any) {
    this.router.navigate(['/editPublisher/' + selectedItem.publisher_id]);

  }

  showSuccess() {
    this.toastr.success('Publisher successfully deleted', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Publisher has not been deleted', 'Error');
  }



}
