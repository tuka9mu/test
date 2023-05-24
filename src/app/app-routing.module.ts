import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ReportComponent } from './components/report/report.component';
import { TableComponent } from './components/table/table.component';
import { BankComponent } from './components/banks/bank.component';
import { StatmentsComponent } from './components/statments/statments.component';
const routes: Routes = [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'statment', component: StatmentsComponent ,canActivate: [AuthGuard]},
      { path: 'main', component: TableComponent,canActivate: [AuthGuard]},
      { path: 'report', component: ReportComponent,canActivate: [AuthGuard]},
      { path: 'bank', component: BankComponent},
];
//
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
