import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ReportComponent } from './components/report/report.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'main', component: TableComponent,canActivate: [AuthGuard]},
      { path: 'report', component: ReportComponent,canActivate: [AuthGuard]},
];
//
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
