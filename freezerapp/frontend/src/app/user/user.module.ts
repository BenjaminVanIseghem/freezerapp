import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { HttpModule } from '../../../node_modules/@angular/http';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { AuthGuardService } from './auth-guard.service';

const routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [
    HttpClientModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent, 
    RegisterComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ]
})
export class UserModule { }
