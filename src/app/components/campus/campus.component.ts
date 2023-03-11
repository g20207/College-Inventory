import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {

    }

  ngOnInit() {
  }

  onSubmit() {
    
    }

}
