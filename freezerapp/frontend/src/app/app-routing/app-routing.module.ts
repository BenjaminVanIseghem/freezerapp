import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';
import { RegisterComponent } from '../user/register/register.component';

const appRoutes: Routes = [
  { 
      path: 'freezer',
      loadChildren: 'app/freezer/freezer.module#FreezerModule', 
      data: {preload: true}
    },
    // { path: 'user',
    //   loadChildren: 'app/freezer/user/user.module#UserModule',
    //   data: {preload: true}
    // },
    { path: '', redirectTo: 'freezer/list', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent}
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: SelectivePreloadStrategy})
  ],
  providers: [SelectivePreloadStrategy],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }