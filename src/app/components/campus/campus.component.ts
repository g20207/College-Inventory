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
  selector: "app-campus",
  templateUrl: "./campus.component.html",
  styleUrls: ["./campus.component.css"],
})
export class CampusComponent implements OnInit {
  Afs: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private makeapi: ApiService
  ) {
    this.campusForm = new FormGroup({
      campus: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  campusForm: FormGroup;
  getValue: any;
  isEditMode:boolean = false;

  ngOnInit() {
    this.list();
  }
  onSubmit() {
    this.isEditMode = false;
    if (this.campusForm.invalid) {
      console.log("error occured !")
    } else {
      var get = this.campusForm.value;
      this.makeapi
        .addItem("campus", get)
        .then((data) => {})
        .catch((Response) => {
          this.list();
        });
    }
    this.campusForm.reset();
  }

  onEdit(){
    var get = this.campusForm.value;
    this.makeapi.updateItem("campus",get);
    this.isEditMode = false;
    debugger
    this.campusForm.reset();
    this. list()
  }

  campList:any=[];
  list() {
    this.makeapi.listItem("campus")
    .subscribe((res) => {
      this.campList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      console.log(this.campList);
    });
  }
  edit(i){
    this.isEditMode = true;

    this.makeapi.getItem("campus", i).subscribe((res) => {
      this.getValue = res;
      this.campusForm.patchValue(res);
    }, (err) => {
      console.log('error occured!');
    });
  }

  remove(i){
    this.makeapi.deleteItem("campus", i);
  }

}
