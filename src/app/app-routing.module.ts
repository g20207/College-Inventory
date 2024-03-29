import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockComponent } from './components/block/block.component';
import { LoginComponent } from './components/login/login.component';
import { AddComponent } from './components/add/add.component';
import { CampusComponent } from './components/campus/campus.component';
import { FloorComponent } from './components/floor/floor.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ItemsComponent } from './components/items/items.component';
import { AddItemsComponent } from './components/add-items/add-items.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { RoomDetailsLandingComponent } from './components/room-details-landing/room-details-landing.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'block',component:BlockComponent},
  {path:'add',component:AddComponent},
  {path:'campus',component:CampusComponent},
  {path:'floor',component:FloorComponent},
  {path:'rooms',component:RoomsComponent},
  {path:'items',component:ItemsComponent},
  {path:'add-items',component:AddItemsComponent},
  {path:'item-details',component:ItemDetailsComponent},
  {path:'room-details',component:RoomDetailsComponent},
  {path:'room-details-landing',component:RoomDetailsLandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
