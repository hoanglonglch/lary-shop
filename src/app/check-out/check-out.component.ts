import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  shipping = {};
  shippingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.shippingForm = this.initForm();
  }

  placeOrder() {
    console.log(this.shippingForm.value);
  }

  initForm() {
    return this.fb.group({
      name: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      city: ['', [
        Validators.required
      ]]
    });
  }
}
