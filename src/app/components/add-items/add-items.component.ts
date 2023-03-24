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
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {
  AddForm: FormGroup;
  Afs: any;
  isEditMode:boolean = false;

  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
    private makeapi: ApiService) { }

  ngOnInit() {
    this.AddForm = this.fb.group({
      ItemName: ['', [Validators.required, Validators.minLength(2)]],
      amount: ['', [Validators.required, Validators.minLength(2)]],
      itemno: ['', [Validators.required]],
      selectedCampus:['', [Validators.required]],
      selectedBlock:['', [Validators.required]],
      selectedFloor:['', [Validators.required]],
      selectedRoom:['', [Validators.required]],
      // warranty: [false, Validators.requiredTrue],
      // warrantyClaim: [false,Validators.requiredTrue],
      description: ['',[Validators.required, Validators.minLength(2)]]
    });
    this.camplist();
    this.blocklist();
    this.floorlist();
    this.roomlist();
    this.itemslist();
  }


  SubmitBtn() {
    if (this.AddForm.invalid) {
      this.AddForm.markAllAsTouched();
    } else {
      this.isEditMode = false;
      var get = this.AddForm.value;
      this.makeapi
        .addItem("items", get)
        .then((data) => {})
        .catch((Response) => {
          // this.itemslist();
        });
    this.AddForm.reset();
    }
  }
  onUpdate(){
    var get = this.AddForm.value;
    this.makeapi.updateItem("rooms",get);
    this.isEditMode = false;
    this.AddForm.reset();
    // this.camplist();
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
    // console.log(this.roomList);
  });
}
  itemsList:any=[];
itemslist(){
  this.makeapi.listItem("items")
  .subscribe((res) => {
    this.itemsList = res.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    })
    // console.log(this.itemsList);
  });
}
getValue: any;
// edit(i){
//   this.isEditMode = true;

//   this.makeapi.getItem("rooms", i).subscribe((res) => {
//     this.getValue = res;
//     this.AddForm.patchValue(res);
//   }, (err) => {
//     console.log('error occured!');
//   });
// }

// remove(i){
//   this.makeapi.deleteItem("rooms", i);
// }
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
