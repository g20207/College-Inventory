import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myForm1 = new FormGroup({
    // name: new FormControl('')
  });
  // myForm2 = new FormGroup({
  //   // name: new FormControl('')
  // });

  constructor() { }

  ngOnInit() {
  }

}
