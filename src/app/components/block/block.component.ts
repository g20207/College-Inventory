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
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  blockForm: FormGroup;
    Afs: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private makeapi: ApiService
  ) {
    this.blockForm = new FormGroup({
    block: new FormControl("", [Validators.required,Validators.minLength(2)]),
    selectedOption: new FormControl()
    });
  }
  isEditMode:boolean = false;

  ngOnInit() {
    this.camplist();
    this.blocklist();
  }

  onSubmit() {
    this.isEditMode = false;
      var get = this.blockForm.value;
      this.makeapi
        .addItem("block", get)
        .then((data) => {})
        .catch((Response) => {
          this.camplist();
        });
      this.blockForm.reset();
  }

  onUpdate(){
    var get = this.blockForm.value;
    this.makeapi.updateItem("block",get).then(() => {
      this.isEditMode = false;
      // try {
        this.blockForm.reset();
      // } catch (error) {
      //   console.error(error);
      // }
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
    });
  }
  getValue: any;
  edit(i){
    this.isEditMode = true;

    this.makeapi.getItem("block", i).subscribe((res) => {
      this.getValue = res;
      this.blockForm.patchValue(res);
    }, (err) => {
      console.log('error occured!');
    });
  }

  remove(i){
    this.makeapi.deleteItem("block", i);
  }

}
