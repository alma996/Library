import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DamageService } from '../damage.service';
import { DamageModel } from '../DamageModel';


@Component({
  templateUrl: './editDamage.component.html',
  styleUrls: ['./editDamage.component.css'],
})

export class EditDamageComponent {

  registrationForm: FormGroup;
  damage_id: any;
  loans_id: any;
  damage_description: any;

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private _location: Location, private DamageService: DamageService, private fb: FormBuilder, private router: Router, private http: HttpClient) {
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.damage_id = params.get('damage_id');
      this.loans_id = params.get('loans_id');
    })

    this.DamageService.getDamageById(this.damage_id, this.loans_id).subscribe((response: DamageModel) => {
      console.log(response)
      this.damage_description = response.damage_description
      console.log(this.damage_description)
      console.log()
    });

    this.registrationForm = this.fb.group({
      damage_id: [''],
      loans_id: [''],
      damage_description: [''],
    })
  }

  EditDamage(selectedItem: true) {

    this.damage_id = this.registrationForm.value.damage_id,
      this.loans_id = this.registrationForm.value.loans_id,
      this.damage_description = this.registrationForm.value.damage_description;

    if (this.registrationForm.value.damage_description !== '') {
      return this.http.put("http://localhost:3000/damage/" + this.damage_id, selectedItem).subscribe(response => { this.showSuccess(response), this._location.back() }, error => { this.errorSuccess() });
    } else {
      this.errorSuccess()
    }
  }

  showSuccess(any) {
    this.toastr.success('Damage has been successfully edited', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Damage not edited, please try again', 'Error')
  }


}
