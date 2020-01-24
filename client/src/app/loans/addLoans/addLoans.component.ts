import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { LoansService } from '../loans.service';

@Component({
  templateUrl: './addLoans.component.html',
  styleUrls: ['./addLoans.component.css']
})
export class AddLoansComponent {

  faPlusCircle = faPlusCircle;
  registrationForm: FormGroup;
  Books: any;
  Members: any;
  Loans: any;


  get book_id() {
    return this.registrationForm.get('book_id')
  }


  get member_id() {
    return this.registrationForm.get('member_id')
  }


  get loans_date() {
    return this.registrationForm.get('loans_date')
  }

  get return_status() {
    return this.registrationForm.get('return_status')
  }

  constructor(private LoansService: LoansService, private route: ActivatedRoute, private toastr: ToastrService, private _location: Location, private fb: FormBuilder, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {

    this.registrationForm = this.fb.group({
      book_id: [''],
      member_id: [''],
      loans_date: [''],
      return_status: [''],
    })


    this.LoansService.getAllBook().subscribe((reponse) => {
      this.Books = reponse;

    });

    this.LoansService.getAllMember().subscribe((reponse) => {
      this.Members = reponse;

    })
  }
  AddLoans(loansdata) {
    if (this.registrationForm.value.return_status !== '' && this.registrationForm.value.loans_date !== '' && this.registrationForm.value.member_id !== '' && this.registrationForm.value.book_id !== '') {
      this.http.post("http://localhost:3000/loans/" + this.registrationForm.value.member_id + '/' + this.registrationForm.value.book_id, loansdata).subscribe((response) => { this.showSuccess(response), this._location.back() }, error => { this.errorSuccess() });
    } else {
      this.errorSuccess()

    }
  }

  AddMember() {
    this.router.navigate(['/addMember']);
  }

  AddBook() {
    this.router.navigate(['/addBook']);
  }

  showSuccess(any) {
    this.toastr.success('Loan successfully added', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Please fill the required fields', 'Error');
  }

}