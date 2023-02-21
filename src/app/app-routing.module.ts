import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockComponent } from './components/block/block.component';
import { FiltersComponent } from './components/filters/filters.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'block',component:BlockComponent},
  {path:'filters',component:FiltersComponent},
  {path:'mapping',component:MappingComponent},
  {path:'products',component:ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
