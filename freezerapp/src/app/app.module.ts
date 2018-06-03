import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserModule } from './user/user.module';
import { FreezerComponent } from './freezer/freezer.component';
import { CompartmentComponent } from './compartment/compartment.component';
import { ItemComponent } from './item/item.component';
import { AddFreezerComponent } from './add-freezer/add-freezer.component';
import { FreezerListComponent } from './freezer-list/freezer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    FreezerComponent,
    CompartmentComponent,
    ItemComponent,
    AddFreezerComponent,
    FreezerListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    UserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

