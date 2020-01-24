import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublisherService } from '../publisher.service';
import { PublisherModel } from '../PublisherModel';


@Component({
  templateUrl: './editPublisher.component.html',
  styleUrls: ['./editPublisher.component.css'],
})

export class EditPublisherComponent {

  registrationForm: FormGroup;
  publisher_id: any;
  publisher_name: string;

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private _location: Location, private PublisherService: PublisherService, private fb: FormBuilder, private router: Router, private http: HttpClient) {
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.publisher_id = params.get('publisher_id');
    })

    this.PublisherService.getPublisherById(this.publisher_id).subscribe((reponse: PublisherModel) => {
      console.log(reponse);
      this.publisher_name = reponse.publisher_name
    });

    this.registrationForm = this.fb.group({
      publisher_id: [''],
      publisher_name: [''],
    })
  }

  EditPublisher(selectedItem: true) {

    this.publisher_id = this.registrationForm.value.publisher_id,
      this.publisher_name = this.registrationForm.value.publisher_name;

    if (this.registrationForm.value.publisher_name !== '') {
      return this.http.put("http://localhost:3000/publisher/" + this.publisher_id, selectedItem).subscribe(response => { this.showSuccess(response), this._location.back() }, error => { this.errorSuccess() });
    } else {
      this.errorSuccess()
    }
  }

  showSuccess(any) {
    this.toastr.success('Publisher' + ' ' + this.registrationForm.value.publisher_name + ' ' + 'has been successfully edited', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Publisher not edited, please fill the required fields or try again', 'Error')
  }

}
