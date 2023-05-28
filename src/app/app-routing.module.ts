import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './components/report/report.component';
import { TableComponent } from './components/table/table.component';
import { BankComponent } from './components/banks/bank.component';
import { StatmentsComponent } from './components/statments/statments.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthService } from './components/auth/Service/auth.service';
import { AuthGuard } from './components/auth/guard/auth.guard';
const Approutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [ {
            path: 'auth',
            loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
        }
    ]
},
      { path: 'statment', component: StatmentsComponent, canActivate:[AuthGuard]},
      { path: 'main', component: TableComponent, canActivate:[AuthGuard]},
      { path: 'report', component: ReportComponent},
      { path: 'bank', component: BankComponent},
];
//
@NgModule({
  imports: [RouterModule.forRoot(Approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
