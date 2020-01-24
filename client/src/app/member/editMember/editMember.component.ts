import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from '../member.service';
import { MemberModel } from '../MemberModel';


@Component({
  templateUrl: './editMember.component.html',
  styleUrls: ['./editMember.component.css'],
})

export class EditMemberComponent {

  registrationForm: FormGroup;
  member_id: any;
  first_name: string;
  last_name: string;
  birth_date: any;
  address: string;
  email: string;
  phone_number: any;

  constructor(private route: ActivatedRoute, private MemberService: MemberService, private _location: Location, private toastr: ToastrService, private fb: FormBuilder, private router: Router, private http: HttpClient) {
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.member_id = params.get('member_id');
    })

    this.MemberService.getMemberById(this.member_id).subscribe((response: MemberModel) => {
      console.log(response);
      this.first_name = response.first_name
      this.last_name = response.last_name
      this.birth_date = response.birth_date
      this.address = response.address
      this.email = response.email
      this.phone_number = response.phone_number
    });

    this.registrationForm = this.fb.group({
      member_id: [''],
      first_name: [''],
      last_name: [''],
      birth_date: [''],
      address: [''],
      email: [''],
      phone_number: [''],
    })
  }

  EditMember(selectedItem: true) {

    this.member_id = this.registrationForm.value.member_id,
      this.first_name = this.registrationForm.value.first_name,
      this.last_name = this.registrationForm.value.last_name,
      this.birth_date = this.registrationForm.value.birth_date,
      this.address = this.registrationForm.value.address,
      this.email = this.registrationForm.value.email,
      this.phone_number = this.registrationForm.value.phone_number;

    if (this.first_name !== '' && this.last_name !== '' && this.birth_date !== '' && this.address !== '' && this.email !== '' && this.phone_number !== '') {
      return this.http.put("http://localhost:3000/member/" + this.member_id, selectedItem).subscribe(response => { this.showSuccess(response), this._location.back() }, error => { this.errorSuccess() });
    } else {
      this.errorSuccess()
    }
  }

  showSuccess(any) {
    this.toastr.success('Member' + ' ' + this.registrationForm.value.first_name + ' ' + this.registrationForm.value.last_name + ' ' + 'has been successfully edited', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Member not edited, please fill the required fields or try again', 'Error')
  }

}
