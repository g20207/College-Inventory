import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockComponent } from './components/block/block.component';
import { FiltersComponent } from './components/filters/filters.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { ProductsComponent } from './components/products/products.component';
import { AddComponent } from './components/add/add.component';
import { CampusComponent } from './components/campus/campus.component';
import { FloorComponent } from './components/floor/floor.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ItemsComponent } from './components/items/items.component';
import { AddItemsComponent } from './components/add-items/add-items.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'block',component:BlockComponent},
  {path:'filters',component:FiltersComponent},
  {path:'mapping',component:MappingComponent},
  {path:'products',component:ProductsComponent},
  {path:'add',component:AddComponent},
  {path:'campus',component:CampusComponent},
  {path:'floor',component:FloorComponent},
  {path:'rooms',component:RoomsComponent},
  {path:'items',component:ItemsComponent},
  {path:'add-items',component:AddItemsComponent},
  {path:'item-details',component:ItemDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
