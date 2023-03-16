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

  ngOnInit() {
    this.list();
  }
  add() {
    if (this.campusForm.invalid) {
      console.log("error occured !")
    } else {
      var get = this.campusForm.value;
      this.makeapi
        .addItem("campus", get)
        // .then((data) => {})
        // .catch((Response) => {
        //   this.list();
        // });
    }
  }
  campList:any=[];
  list() {
    this.makeapi.listItem("campus").subscribe((res) => {
      this.campList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      console.log(this.campList);
    });
  }

  edit(){
  }

  remove(i){
    this.makeapi.deleteItem("campus", i);

  }

}
