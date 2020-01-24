import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MembershipService } from './membership.service';

@Component({
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  faTrash = faTrash;
  faUserEdit = faUserEdit;
  faSearch = faSearch;
  Memberships: any;
  Delete: any;
  searchText: any;
  p: number = 1;
  member_id: any;
  membership_id: any;

  constructor(private fb: FormBuilder, private MembershipService: MembershipService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.member_id = params.get('member_id');
    })


    this.http.get("http://localhost:3000/membership/" + this.member_id).subscribe((response) => {
      this.Memberships = response;

    });


  }


  GetAllMemberships() {
    // User data which we have received from the registration form.
    this.MembershipService.getAllMembership(this.member_id).subscribe((reponse) => {
      this.Memberships = reponse;
    });

  }

  AddMembership() {
    this.router.navigate(['/addMembership/' + this.member_id]);
  }

  BackToMember() {
    this.router.navigate(['/member']);
  }

  DeleteMembership(selectedItem: any) {
    this.Delete = selectedItem.membership_id;
    return this.http.delete("http://localhost:3000/membership/" + this.Delete).subscribe(response => { console.log(response), this.router.navigate(['/member']), this.showSuccess() },
      error => { this.errorSuccess() });
  }

  EditMembership(selectedItem: any) {
    this.router.navigate(['/editMembership/' + selectedItem.membership_id + '/' + selectedItem.member_id]);

  }

  showSuccess() {
    this.toastr.success('Membership successfully deleted', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Membership has not been deleted', 'Error');
  }



}
