import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MembershipService } from './membership.service';

@Component({
  templateUrl: './allMembership.component.html',
  styleUrls: ['./membership.component.css']
})
export class AllMembershipComponent implements OnInit {
  faTrash = faTrash;
  faUserEdit = faUserEdit;
  faSearch = faSearch
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


    this.http.get("http://localhost:3000/membership").subscribe((response) => {
      this.Memberships = response;
      console.log(this.Memberships)

    });


  }


  GetAllMemberships() {
    this.http.get("http://localhost:3000/membership").subscribe((response) => {
      this.Memberships = response;
      console.log(this.Memberships)
    });

  }

  AddMembership() {
    this.router.navigate(['/addMembership/' + this.member_id]);
  }

  DeleteMembership(selectedItem: any) {
    this.Delete = selectedItem.membership_id;
    return this.http.delete("http://localhost:3000/membership/" + this.Delete).subscribe(response => { console.log(response), this.GetAllMemberships(), this.showSuccess() },
      error => { this.errorSuccess() });
  }

  EditMembership(selectedItem: any) {
    this.router.navigate(['/editMembership/' + selectedItem.membership_id + '/' + selectedItem.member_id]);

  }


  showSuccess() {
    this.toastr.success('Member successfully deleted', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Member has not been deleted', 'Error');
  }


}
