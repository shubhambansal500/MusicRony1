import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CreateclassComponent } from './createclass/createclass.component';

const routes: Routes = [
  { path: 'createclass', component: CreateclassComponent },
]
@NgModule({
  declarations: [CreateclassComponent],
  imports: [
    FormsModule,
    CommonModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ]
})
export class MyClassesModule { }
