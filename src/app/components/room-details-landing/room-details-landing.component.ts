import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-room-details-landing',
  templateUrl: './room-details-landing.component.html',
  styleUrls: ['./room-details-landing.component.css']
})
export class RoomDetailsLandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('#myTable').DataTable();
    });
  }

}
