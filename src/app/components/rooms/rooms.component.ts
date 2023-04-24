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

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  @ViewChild('searchButton', {static: false}) searchButton: ElementRef;

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
  room: new FormControl("",[Validators.required,Validators.minLength(2)]),
  roomno: new FormControl("",Validators.required)
  });
}
isEditMode:boolean = false;

ngOnInit() {
  this.camplist();
  this.blocklist();
  this.floorlist();
  this.roomlist();
}
onSubmit() {
  this.isEditMode = false;
    var get = this.roomForm.value;
    if (this.roomList.some(room => room.selectedBlock === get.selectedBlock && room.selectedCampus===get.selectedCampus && room.selectedFloor === get.selectedFloor && room.room === get.room)) {
      alert("room already exists!");
    }
    else{
      this.makeapi
      .addItem("rooms", get)
      .then((data) => {})
      .catch((Response) => {
        this.roomlist();
      });
    }
  this.roomForm.reset();
}

onUpdate(){
  var get = this.roomForm.value;
  this.makeapi.updateItem("rooms",get).then(() => {
    this.isEditMode = false;
      this.roomForm.reset();
  });
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
    // console.log(this.campList);
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
    // console.log(this.blockList);
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
    // console.log(this.floorList);
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
getValue: any;
edit(i){
  this.isEditMode = true;

  this.makeapi.getItem("rooms", i).subscribe((res) => {
    this.getValue = res;
    this.roomForm.patchValue(res);
  }, (err) => {
    console.log('error occured!');
  });
}

remove(i){
  this.makeapi.deleteItem("rooms", i);
}
selectedCampusValue: string;
getFilteredBlockList(): any[] {
  return this.blockList.filter(block => block.selectedOption === this.selectedCampusValue);
}
selectedBlockValue: string;
getFilteredFloorList(): any[] {
  return this.floorList.filter(floor => floor.selectedBlock === this.selectedBlockValue);
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
    return this.roomList.filter(room => room.room === this.searchValue);
  }
  selectedFloorValue:string;
filteredFloorDetails(): any[] {
  return this.roomList.filter(rooms =>
    rooms.selectedCampus === this.selectedCampusValue &&
    rooms.selectedBlock === this.selectedBlockValue &&
     rooms.selectedFloor === this.selectedFloorValue
     );
}
filteredBlockDetails(): any[] {
  return this.roomList.filter(floor =>
    floor.selectedCampus === this.selectedCampusValue &&
    floor.selectedBlock === this.selectedBlockValue
    );
}
filteredCampusDetails(): any[] {
  return this.roomList.filter(block => block.selectedCampus === this.selectedCampusValue);
}
}
