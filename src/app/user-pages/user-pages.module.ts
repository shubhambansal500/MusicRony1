import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import {DemoComponent} from './demo/demo.component';
import { DboardComponent } from './dboard/dboard.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'dboard', component: DboardComponent },
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, DemoComponent, DboardComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserPagesModule { }
