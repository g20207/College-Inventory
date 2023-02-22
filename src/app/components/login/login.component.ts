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
    private formBuilder: FormBuilder, private router: Router
  ) {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
   }

  ngOnInit() {

  }

  onSubmit() {
    // Perform validation and login logic

    // If the login is successful, navigate to the home page
    this.router.navigate(['/home']);
  }
}
