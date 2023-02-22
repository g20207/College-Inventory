import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      pwd: new FormControl('')
    });
   }

  ngOnInit() {

  }


}
