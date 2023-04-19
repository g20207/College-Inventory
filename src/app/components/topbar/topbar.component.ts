import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  myForm1 = new FormGroup({
    input1: new FormControl()
      });

      myForm2 = new FormGroup({
        input2: new FormControl()
          });

}
