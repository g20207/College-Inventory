import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore , AngularFirestoreCollection } from   '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private eventautherror = new BehaviorSubject<string>("");
  // eventautherror$ = this.eventautherror.asObservable();
  // tutorialsRef: AngularFirestoreCollection = null;


  constructor(private Afs: AngularFirestore, private Authfire: AngularFireAuth, private storage: AngularFireStorage, private router: Router) { }
  // new registration
  // registerItem(user) {
  //   var tenantId = "TENANT_ID1";
  //   var auth = this.Authfire.tenantId
  //   return this.Authfire.createUserWithEmailAndPassword(user.email, user.password)
  // }
  //instertuserdata
  // filePath: string
  // insertuserdata(userCredential: firebase.default.auth.UserCredential, registerdata) {
  //   this.filePath = `Users/${userCredential.user.uid}`;
  //   return this.Afs.doc(this.filePath).set(registerdata)
  // }
  //loginuser
  // login(email, password) {
  //   return this.Authfire.signInWithEmailAndPassword(email, password)
  // }
  //getuser
  getUser() {
    return this.Authfire.authState;
  }

  // list Function
  listItem(url) {
    return this.Afs.collection('/' + url).snapshotChanges();
  }
  // add Function
  addItem(url, data) {
    data.id = this.Afs.createId();
    return this.Afs.collection('/' + url).add(data)
  }
  // get Function
  getItem(url, id) {
    sessionStorage.setItem('id', id)
    return this.Afs.collection('/' + url).doc(id).valueChanges();
  }
  // update Function
  updateItem(url, data) {
    return this.Afs.collection('/' + url).doc('/' + sessionStorage.getItem('id')).update(data)
  }
  // delete Function
  deleteItem(url, id) {
    return this.Afs.collection('/' + url).doc(id).delete();
  }
  // image upload
  imageUpload(url, data) {
    return this.storage.upload(url, data)
  }
  // get Image
  getImage(url) {
    return this.storage.ref(url);
  }
  // delete images
  deleteImage(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete()
  }
}
