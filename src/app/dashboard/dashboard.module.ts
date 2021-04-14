import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import {InstantclassComponent} from './instantclass/instantclass.component';

const routes: Routes = [
  { path: 'instantclass', component: InstantclassComponent },
]
@NgModule({
  declarations: [InstantclassComponent],
  imports: [
    FormsModule,
    CommonModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
