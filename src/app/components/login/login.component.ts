import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  authService: AuthService;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  SubmitBtn() {
    const name = this.loginForm.value.name;
    const password = this.loginForm.value.password;
    this.authService.login(name, password);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    else if (this.loginForm.get("name").value === "guru" && this.loginForm.get("password").value === "guru07")
     {
      this.router.navigate(["/campus"]);
    }
    else if (this.loginForm.get("name").value === "user" && this.loginForm.get("password").value === "user07")
     {
      this.router.navigate(["/campus"]);
    }
    else if (this.loginForm.get("name").value === "admin" && this.loginForm.get("password").value === "admin07")
    {
     this.router.navigate(["/campus"]);
   }
    else {
      alert("invalid username or password!");
    }
  }

}
