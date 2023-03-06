import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BlockComponent } from './components/block/block.component';
import { FloorComponent } from './components/floor/floor.component';
import { ProductsComponent } from './components/products/products.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { FiltersComponent } from './components/filters/filters.component';
import { NavpageComponent } from './components/navpage/navpage.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlockComponent,
    FloorComponent,
    ProductsComponent,
    MappingComponent,
    FiltersComponent,
    NavpageComponent,
    HomeComponent,
    TopbarComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
