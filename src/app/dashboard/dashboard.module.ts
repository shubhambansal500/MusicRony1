import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import {InstantclassComponent} from './instantclass/instantclass.component';
import {CreateclassComponent} from '../myclasses/createclass/createclass.component';

const routes: Routes = [
  { path: 'instantclass', component: InstantclassComponent },
  { path: 'createclass', component: CreateclassComponent },
]
@NgModule({
  declarations: [InstantclassComponent,CreateclassComponent],
  imports: [
    FormsModule,
    CommonModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
