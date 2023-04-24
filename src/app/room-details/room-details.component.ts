import { Component, OnInit, Input,ViewChild, ElementRef  } from "@angular/core";
import { AngularFirestoreCollection } from "@angular/fire/firestore";
import {FormGroup,FormControl, FormBuilder,Validators,FormArray} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { ResponseData } from 'src/app/interfaces/response-data.interface';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  @ViewChild('searchButton', {static: false}) searchButton: ElementRef;

  roomForm: FormGroup;Afs: any; isEditing = false; getValue: any; ;
constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute,private makeapi: ApiService
)
{
  this.roomForm = new FormGroup({
  selectedRoom: new FormControl(),
  selectedRoomNo: new FormControl()
  });
}
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
      this.makeapi.getItem("room details", this.paramsObject).subscribe((res: ResponseData) => {
        console.log(res); // to verify if the data is fetched correctly
        this.roomForm.patchValue(res);
        if (this.isEditing) {
          this.myArray = Object.keys(res.itemsData).map((key) => ({
            selectedItem: res.itemsData[key].item,
            brand: res.itemsData[key].brand,
            noOfItems: res.itemsData[key].numOfItems
          }));
        }
      }, (err) => {
        console.error(err);
      });
    }
  });

  this.roomlist();this.additemslist();this.roomdetailslist();
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
  // console.log(this.roomList)
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
    selectedRoomNo: this.selectedRoomnoValue,
    itemsData: itemsData.reduce((obj, item) => {
      return {...obj, [item.itemName]: {item: item.itemName,brand: item.brand, numOfItems: item.numOfItems}};
    }, {}),
    totalRows: this.myArray.length
  };
  console.log(itemsObj);

  // some function returns true when the test is passed. here room in some(room) is a variable chosed by programmer. it takes the value in roomdetailsList and then executes the test.
  const roomExists = this.roomdetailsList.some((room) => {
    return room.selectedRoom === this.selectedRoomValue;
  });

  if (roomExists) {
    alert('The selected room exists in Room Details page. you can edit it from there');
  } else {
    this.makeapi
      .addItem("room details", itemsObj)
      .then((data) => {})
      .catch((Response) => {});
    this.roomForm.reset();
  }
}
onUpdate() {
  var get = this.roomForm.value;
    const itemsData = [];

    for (let i = 0; i < this.myArray.length; i++) {
      const item = this.myArray[i];
      itemsData.push({
        itemName: item.selectedItem,
        brand: item.brand,
        numOfItems: item.noOfItems,
      });
    }

    const itemsObj = {
      selectedRoom: this.selectedRoomValue,
      selectedRoomNo: this.selectedRoomnoValue,

      itemsData: itemsData.reduce((obj, item) => {
        return {...obj, [item.itemName]: {item: item.itemName,brand: item.brand, numOfItems: item.numOfItems}};
      }, {}),
      totalRows: this.myArray.length
    };
    this.makeapi
    .updateItem("room details", itemsObj)
    .then((data) => {})
    .catch((Response) => {
    });
    this.router.navigateByUrl("room-details-landing");
this.roomForm.reset();
}
deleteRow(index: number) {
  this.myArray.splice(index, 1);
}
cancel(){
  this.router.navigateByUrl("room-details-landing");
}

}
