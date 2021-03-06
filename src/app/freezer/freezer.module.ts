import { RouterModule, ChildrenOutletContexts } from "@angular/router";
import { FreezerDataService } from "./freezer-data.service";
import { CompartmentComponent } from "./compartment/compartment.component";
import { NgModule, Component } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { FreezerComponent } from "./freezer/freezer.component";
import { ItemComponent } from "./item/item.component";
import { AddFreezerComponent } from "./add-freezer/add-freezer.component";
import { FreezerListComponent } from "./freezer-list/freezer-list.component";
import { FreezerDetailComponent } from "./freezer-detail/freezer-detail.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FreezerFilterPipe } from './freezer-filter.pipe';
import { FreezerResolver } from "./freezer-resolver";
import { AddItemComponent } from "./add-item/add-item.component";
import { CompartmentDetailComponent } from './compartment-detail/compartment-detail.component';
import { CompartmentResolver } from "../compartment-resolver";
import { httpInterceptorProviders } from "../http-interceptors";


const routes = [
    { path: 'list', component: FreezerListComponent},
    { path: 'detail/:id', 
        component: FreezerDetailComponent,
        resolve: { freezer : FreezerResolver}
    },
    { path: 'detail/:id/compartment/:compid/detail', 
        component: CompartmentDetailComponent, 
        resolve:{ compartment : CompartmentResolver, freezer :  FreezerResolver}
    },
    { path: 'add', component: AddFreezerComponent},
    { path: 'additem', component: AddItemComponent}
  ];
  @NgModule({
    imports: [
        HttpClientModule,
        HttpModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        FreezerComponent,
        CompartmentComponent,
        ItemComponent,
        FreezerDetailComponent,
        CompartmentDetailComponent,
        FreezerListComponent,
        AddFreezerComponent,
        AddItemComponent,
        FreezerFilterPipe,
        
    ],
    providers: [
        httpInterceptorProviders,
        FreezerDataService,
        FreezerResolver,
        CompartmentResolver
     ]
  })
  export class FreezerModule { }