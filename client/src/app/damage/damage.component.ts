import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { DamageService } from './damage.service';

@Component({
  templateUrl: './damage.component.html',
  styleUrls: ['./damage.component.css']
})
export class DamageComponent implements OnInit {
  faTrash = faTrash;
  faUserEdit = faUserEdit;
  faSearch = faSearch

  Damages: any;
  Delete: any;
  searchText: any;
  p: number = 1;
  loans_id: any;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private DamageService: DamageService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }


  ngOnInit() {



    this.route.paramMap.subscribe(params => {
      this.loans_id = params.get('loans_id');
    })


    this.http.get("http://localhost:3000/damage/" + this.loans_id).subscribe((response) => {
      this.Damages = response;

    });

  }

  GetAllDamages() {

    this.http.get("http://localhost:3000/damage/" + this.loans_id).subscribe((response) => {
      this.Damages = response;

    });
  }

  AddDamage() {
    this.router.navigate(['/addDamage/' + this.loans_id]);
  }

  DeleteDamage(selectedItem: any) {
    this.Delete = selectedItem.damage_id;
    return this.http.delete("http://localhost:3000/damage/" + this.Delete).subscribe(response => { console.log(response), this.GetAllDamages(), this.showSuccess() },
      error => { this.errorSuccess() });
  }

  EditDamage(selectedItem: any) {
    this.router.navigate(['/editDamage/' + selectedItem.damage_id + '/' + selectedItem.loans_id]);

  }


  Back() {
    this.router.navigate(['/loans']);
  }

  showSuccess() {
    this.toastr.success('Damage successfully deleted', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Damage has not been deleted', 'Error');
  }





}
