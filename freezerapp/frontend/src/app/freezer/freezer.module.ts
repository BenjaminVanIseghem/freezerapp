import { RouterModule, ChildrenOutletContexts } from "@angular/router";
import { FreezerDataService } from "./freezer-data.service";
import { CompartmentComponent } from "./compartment/compartment.component";
import { NgModule } from "@angular/core";
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


const routes = [
    { path: 'list', component: FreezerListComponent},
    { 
        path: 'detail/:id', component: FreezerDetailComponent,
            resolve: { freezer : FreezerResolver},
            child:{path: 'compartment/:compid', component: CompartmentComponent}
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
        FreezerListComponent,
        AddFreezerComponent,
        AddItemComponent,
        FreezerFilterPipe,
        CompartmentDetailComponent
    ],
    providers: [
        FreezerDataService,
        FreezerResolver
     ]
  })
  export class FreezerModule { }