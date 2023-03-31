import { Component, OnInit } from "@angular/core";
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
@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  // @ViewChild('searchButton', {static: false}) searchButton: ElementRef;
  roomForm: FormGroup;
  Afs: any;
constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private route: ActivatedRoute,
  private makeapi: ApiService
) {
  this.roomForm = new FormGroup({
  selectedRoom: new FormControl()
  });
}
isEditMode:boolean = false;

ngOnInit() {
  this.roomlist();
  this.additemslist();
  // this.getFilteredBrandList();
}

roomList:any=[];
roomlist(){
  this.makeapi.listItem("rooms")
  .subscribe((res) => {
    this.roomList = res.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    })
  });
}

additemsList:any=[];
additemslist(){
  this.makeapi.listItem("add-items")
  .subscribe((res) => {
    this.additemsList = res.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    })
  });
// console.log(this.additemsList);
}
selectedItem:string;
nameChanged(event) {
  this.selectedItem = event.target.value;
  console.log(this.selectedItem)
}
getFilteredBrandList():any{
  // debugger;
  return this.additemsList.filter(additems => additems.ItemName === this.selectedItem);
// console.log(mybrand);
}


getValue: any;
edit(itemId: string) {
  this.router.navigate(['add-items'], { queryParams: { id: itemId, isEditing: true } });
}

remove(i){
  this.makeapi.deleteItem("items", i);
}


}
