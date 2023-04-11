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
  isEditing = false;
  getValue: any;

constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private route: ActivatedRoute,
  private makeapi: ApiService
)
{
  this.roomForm = new FormGroup({
  selectedRoom: new FormControl(),
  selectedRoomNo: new FormControl()
  // selectedItem: new FormControl(),
  // brand: new FormControl(),
  // noOfItems: new FormControl()
  });
}
isEditMode:boolean = false;
paramsObject: any = {};
ngOnInit() {
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
      this.makeapi.getItem("room details", this.paramsObject).subscribe((res) => {
        this.getValue = res;
        console.log(this.getValue);
        this.roomForm.patchValue(res);
      }, (err) => {
        // console.log('error occurred!');
      });
    }
  });
  this.roomlist();
  this.additemslist();
}
myArray: any[] = [{
  id: 1,
  selectedItem: '',
  brand: '',
  numOfItems: 0
}];

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
nameChanged(row) {
   this.selectedItem = row.selectedItem;
  const filteredList = this.additemsList.filter(additems => additems.ItemName === this.selectedItem);
  row.brand = filteredList.length > 0 ? filteredList[0].Brand : '';
//   filteredList.length > 0 checks if the filteredList array has at least one element. If it does, then the selected item has a corresponding brand value in the additemsList array.
// If filteredList.length > 0 is true, filteredList[0].Brand returns the brand value of the first object in the filteredList array.
}

addRow() {
  const newRow = {
    id:    1,
    itemName: '',
    brand: '',
    numOfItems: 0
  };
  this.myArray.push(newRow);
}

selectedRoomValue: string;
selectedRoomnoValue: string;

onSubmit() {
    var get = this.roomForm.value;
      const itemsData = [];

      for (let i = 0; i < this.myArray.length; i++) {
        const item = this.myArray[i];
        itemsData.push({
          itemName: item.selectedItem,
          brand: item.brand,
          numOfItems: item.noOfItems
        });
      }

      // console.log(itemsData);
      const itemsObj = {
        selectedRoom: this.selectedRoomValue,
        selectedRoomno: this.selectedRoomnoValue,

        itemsData: itemsData.reduce((obj, item) => {
          return {...obj, [item.itemName]: {brand: item.brand, numOfItems: item.numOfItems}};
        }, {})
      };
      this.makeapi
      .addItem("room details", itemsObj)
      .then((data) => {})
      .catch((Response) => {
      });
  this.roomForm.reset();
}
onUpdate() {
  var get = this.roomForm.value;
    const itemsData = [];

    for (let i = 0; i < this.myArray.length; i++) {
      const item = this.myArray[i];
      itemsData.push({
        itemName: item.selectedItem,
        brand: item.brand,
        numOfItems: item.noOfItems
      });
    }

    const itemsObj = {
      selectedRoom: this.selectedRoomValue,
      selectedRoomno: this.selectedRoomnoValue,

      itemsData: itemsData.reduce((obj, item) => {
        return {...obj, [item.itemName]: {brand: item.brand, numOfItems: item.numOfItems}};
      }, {})
    };
    this.makeapi
    .updateItem("room details", itemsObj)
    .then((data) => {})
    .catch((Response) => {
    });
    // console.log(itemsObj);
    // this.isEditing = false;
    this.router.navigateByUrl("room-details-landing");

this.roomForm.reset();
}
deleteRow(index: number) {
  this.myArray.splice(index, 1);
}
}
