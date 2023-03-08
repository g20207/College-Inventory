import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {
  campusForm: FormGroup;
public getForm = [];
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
      this.campusForm = this.formBuilder.group({
        campus: ["", [Validators.required,Validators.minLength(3)]],
      });
    }

  ngOnInit() {
  }

  onSubmit() {
    this.getForm = this.campusForm.value;
    console.log(this.getForm);
    }

}
