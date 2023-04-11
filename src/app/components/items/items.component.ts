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
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  roomForm: FormGroup;
  Afs: any;
constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private route: ActivatedRoute,
  private makeapi: ApiService
) {
  this.roomForm = new FormGroup({
  selectedBlock: new FormControl(),
  selectedCampus: new FormControl(),
  selectedFloor: new FormControl(),
  selectedRoom: new FormControl()
  });
}
isEditMode:boolean = false;

ngOnInit() {
  this.camplist();
  this.blocklist();
  this.floorlist();
  this.roomlist();
  this.itemslist();
}
onSubmit() {

    var get = this.roomForm.value;
    this.makeapi
      .addItem("rooms", get)
      .then((data) => {})
      .catch((Response) => {
        this.roomlist();
      });
  this.roomForm.reset();
}



campList:any=[];
camplist() {
  this.makeapi.listItem("campus")
  .subscribe((res) => {
    this.campList = res.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    })
  });
}
blockList:any=[];
blocklist(){
  this.makeapi.listItem("block")
  .subscribe((res) => {
    this.blockList = res.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    })
  });
}
floorList:any=[];
floorlist(){
  this.makeapi.listItem("floor")
  .subscribe((res) => {
    this.floorList = res.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    })
  });
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
itemsList:any=[];
itemslist(){
  this.makeapi.listItem("add-items")
  .subscribe((res) => {
    this.itemsList = res.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    })
  });
}
edit(itemId: string) {
  this.router.navigate(['add'], { queryParams: { id: itemId, isEditing: true } });
}

remove(i){
  this.makeapi.deleteItem("add-items", i);
}
selectedCampusValue: string;
getFilteredBlockList(): any[] {
  return this.blockList.filter(block => block.selectedOption === this.selectedCampusValue);
}
selectedBlockValue: string;
getFilteredFloorList(): any[] {
  return this.floorList.filter(floor => floor.selectedBlock === this.selectedBlockValue);
}
selectedFloorValue: string;
getFilteredRoomList(): any[] {
  return this.roomList.filter(rooms => rooms.selectedFloor === this.selectedFloorValue);
}
selectedRoomValue: string;
filteredRoomDetails(): any[] {
  return this.itemsList.filter(items => items.selectedRoom === this.selectedRoomValue);
}
}
