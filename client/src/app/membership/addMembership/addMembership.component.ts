import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MembershipService } from '../membership.service';

@Component({
  templateUrl: './addMembership.component.html',
  styleUrls: ['./addMembership.component.css']
})
export class AddMembershipComponent {

  registrationForm: FormGroup;

  get membership_id() {
    return this.registrationForm.get('membership_id')
  }

  member_id: any;

  get date_of_payment() {
    return this.registrationForm.get('date_of_payment')
  }

  get year() {
    return this.registrationForm.get('year')
  }

  get amount() {
    return this.registrationForm.get('amount')
  }

  constructor(private MembershipService: MembershipService, private toastr: ToastrService, private _location: Location, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.member_id = params.get('member_id');
    })

    this.registrationForm = this.fb.group({
      membership_id: [''],
      member_id: [''],
      date_of_payment: [''],
      year: [''],
      amount: [''],
    })
  }

  AddMembership(membershipdata) {
    console.log("alma", this.registrationForm.value.amount)
    if (this.registrationForm.value.date_of_payment !== '0000-00-00' && this.registrationForm.value.date_of_payment !== '' && this.registrationForm.value.year !== '' && this.registrationForm.value.year !== null && this.registrationForm.value.amount !== '' && this.registrationForm.value.amount !== null) {
      this.http.post("http://localhost:3000/membership/" + this.member_id, membershipdata).subscribe((response) => { this.showSuccess(response), this.router.navigate(['/membership/' + this.member_id]) }, error => { this.errorSuccess() });
    } else {
      this.errorSuccess();
    }
  }


  showSuccess(any) {
    this.toastr.success('Membership successfully added', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Please fill the required fields', 'Error');
  }

  BackToMember() {
    this.router.navigate(['/member']);
  }
}