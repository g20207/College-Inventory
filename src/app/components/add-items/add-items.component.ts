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
  getValue: any;
  isEditing = false;
  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
    private makeapi: ApiService) { }
    paramsObject: any = {};

  ngOnInit() {
    this.AddForm = this.fb.group({
      ItemName: ['', [Validators.required, Validators.minLength(2)]],
      amount: ['', [Validators.required, Validators.minLength(2)]],
      itemno: ['', [Validators.required]],
      selectedCampus:['', [Validators.required]],
      selectedBlock:['', [Validators.required]],
      selectedFloor:['', [Validators.required]],
      selectedRoom:['', [Validators.required]],
      description: ['',[Validators.required, Validators.minLength(2)]]
    });
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.paramsObject = params.id;
        if(params.isEditing === 'true'){
          this.isEditing = params.isEditing;
        }
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params.id && params.isEditing) {
        this.isEditing = true;
        this.paramsObject = params.id;
        this.makeapi.getItem("items", this.paramsObject).subscribe((res) => {
          this.getValue = res;
          console.log(this.getValue);
          this.AddForm.patchValue(res);
        }, (err) => {
          console.log('error occurred!');
        });
      }
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
      if (this.itemsList.some(item => item.selectedBlock === get.selectedBlock && item.selectedCampus===get.selectedCampus && item.selectedFloor === get.selectedFloor  && item.selectedRoom === get.selectedRoom && item.ItemName === get.ItemName)) {
        alert("The Item already exists in this room");
      }
      else{
        this.makeapi
        .addItem("items", get)
        .then((data) => {})
        .catch((Response) => {
        });
      }
    this.AddForm.reset();
    }
  }

  onUpdate(){
    var get = this.AddForm.value;
    this.makeapi.updateItem("items",get);
    this.isEditing = false;
    this.AddForm.reset();
    this.router.navigateByUrl("item-details");
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
