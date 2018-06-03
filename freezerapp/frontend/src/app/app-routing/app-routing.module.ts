import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';

const appRoutes: Routes = [
    { path: 'freezer',
      loadChildren: 'app/freezer/freezer.module#FreezerModule', 
      data: {preload: true}
    },
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