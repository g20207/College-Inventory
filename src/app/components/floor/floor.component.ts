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
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {
  @ViewChild('searchButton', {static: false}) searchButton: ElementRef;

  floorForm: FormGroup;
  Afs: any;
constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private route: ActivatedRoute,
  private makeapi: ApiService
) {
  this.floorForm = new FormGroup({
  selectedBlock: new FormControl(),
  selectedCampus: new FormControl(),
  floor: new FormControl("",[Validators.required,Validators.minLength(2)])
  });
}
isEditMode:boolean = false;

ngOnInit() {
  this.camplist();
  this.blocklist();
  this.floorlist();
}
onSubmit() {
  this.isEditMode = false;

    var get = this.floorForm.value;
    this.makeapi
      .addItem("floor", get)
      .then((data) => {})
      .catch((Response) => {
        this.floorlist();
      });
  this.floorForm.reset();
}

onUpdate(){
  var get = this.floorForm.value;
  this.makeapi.updateItem("floor",get).then(() => {
    this.isEditMode = false;
      this.floorForm.reset();
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
  });
}
getValue: any;
edit(i){
  this.isEditMode = true;

  this.makeapi.getItem("floor", i).subscribe((res) => {
    this.getValue = res;
    this.floorForm.patchValue(res);
  }, (err) => {
    console.log('error occured!');
  });
}

remove(i){
  this.makeapi.deleteItem("floor", i);
}
selectedCampusValue: string;
getFilteredBlockList(): any[] {
  return this.blockList.filter(block => block.selectedOption === this.selectedCampusValue);
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
    return this.floorList.filter(floor => floor.floor === this.searchValue);
  }
}
