import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueComponent } from './revenue/revenue.component';
import { StudentsComponent } from './students/students.component';
import { SessionsComponent } from './sessions/sessions.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MiscComponent } from './misc/misc.component';
import { ChartsModule } from 'ng2-charts';
import { AttendenceComponent } from './attendence/attendence.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  { path: 'revenue', component: RevenueComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'sessions', component: SessionsComponent },
  { path: 'misc', component: MiscComponent },
  { path: 'attendence', component: AttendenceComponent},
  { path: 'payments', component: PaymentsComponent},
]
@NgModule({
  declarations: [RevenueComponent, StudentsComponent, SessionsComponent, MiscComponent, AttendenceComponent, PaymentsComponent],
  imports: [
    FormsModule,
    CommonModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ]
})
export class AnalyticsModule { }
