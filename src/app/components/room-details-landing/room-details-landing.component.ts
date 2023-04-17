import { Component, OnInit,ViewChild, ElementRef } from "@angular/core";
import { AngularFirestoreCollection } from "@angular/fire/firestore";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "src/app/services/api.service";
declare var $:any;

@Component({
  selector: 'app-room-details-landing',
  templateUrl: './room-details-landing.component.html',
  styleUrls: ['./room-details-landing.component.css']
})
export class RoomDetailsLandingComponent implements OnInit {
  @ViewChild('searchButton', {static: false}) searchButton: ElementRef;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private makeapi: ApiService) { }

  ngOnInit() {
    $(document).ready(function () {
      $('#myTable').DataTable();
    });
    this.roomdetailslist();
  }
  roomdetailsList:any=[];
  roomdetailslist(){
    this.makeapi.listItem("room details")
    .subscribe((res) => {
      this.roomdetailsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    });
  }
  edit(itemId: string) {
    this.router.navigate(['room-details'], { queryParams: { id: itemId, isEditing: true } });
  }
  remove(i){
    this.makeapi.deleteItem("room details", i);
  }
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  isButtonClicked: boolean = false;
  searchValue:string;
  onSearch() {
    this.isButtonClicked = true;
    this.searchValue = this.searchButton.nativeElement.value;
  }
  onInput() {
    if (!this.searchButton.nativeElement.value) {
      this.isButtonClicked = false;
    }
  }
  getSearchItem(): any[] {
    return this.roomdetailsList.filter(room => room.selectedRoom === this.searchValue);
  }
}
