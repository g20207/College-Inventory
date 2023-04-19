import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  SubmitBtn() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    else if (this.loginForm.get("name").value === "guru" && this.loginForm.get("password").value === "guru07") {
      this.router.navigate(["/campus"]);
    }
    else if (this.loginForm.get("name").value === "employee" && this.loginForm.get("password").value === "employee07") {
      this.router.navigate(["/campus"]);
    }
    else {
      alert("invalid username or password!");
    }
  }

}
