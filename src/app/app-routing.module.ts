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
  {path:'floor',component:FloorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
