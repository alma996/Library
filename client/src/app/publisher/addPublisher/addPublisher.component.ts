import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublisherService } from '../publisher.service';

@Component({
  templateUrl: './addPublisher.component.html',
  styleUrls: ['./addPublisher.component.css']
})
export class AddPublisherComponent {

  registrationForm: FormGroup;

  get publisher_id() {
    return this.registrationForm.get('publisher_id')
  }

  get publisher_name() {
    return this.registrationForm.get('publisher_name')
  }

  constructor(private PublisherService: PublisherService, private toastr: ToastrService, private _location: Location, private fb: FormBuilder, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      publisher_id: [''],
      publisher_name: [''],
    })
  }

  AddPublisher(publisherdata) {
    if (this.registrationForm.value.publisher_name !== '') {
      this.PublisherService.addPublisher(publisherdata).subscribe((response) => { this.showSuccess(response), this._location.back() }, error => { this.errorSuccess() });
    } else {
      this.errorSuccess()
    }
  }

  showSuccess(any) {
    this.toastr.success('Publisher' + ' ' + this.registrationForm.value.publisher_name + ' ' + 'successfully added', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Please fill the required fields', 'Error');
  }

}
