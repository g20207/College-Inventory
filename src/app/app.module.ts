import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BlockComponent } from './components/block/block.component';
import { NavpageComponent } from './components/navpage/navpage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AddComponent } from './components/add/add.component';
import { CampusComponent } from './components/campus/campus.component';
import { FloorComponent } from './components/floor/floor.component';
import { HttpClientModule } from  '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {DataService} from './services/data.service';
import {ApiService} from './services/api.service';
import {firebase} from '../environments/firebase';
import { FormsModule } from '@angular/forms';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ItemsComponent } from './components/items/items.component';
import { AddItemsComponent } from './components/add-items/add-items.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { RoomDetailsLandingComponent } from './components/room-details-landing/room-details-landing.component';
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlockComponent,
    NavpageComponent,
    TopbarComponent,
    AddComponent,
    CampusComponent,
    FloorComponent,
    RoomsComponent,
    ItemsComponent,
    AddItemsComponent,
    ItemDetailsComponent,
    RoomDetailsComponent,
    RoomDetailsLandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [DataService,ApiService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

