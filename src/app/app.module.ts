import { StatmentsComponent } from './components/statments/statments.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReportComponent } from './components/report/report.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectComponent } from "ng-multiselect-dropdown";
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { CommonModule } from '@angular/common';
import { BankComponent } from './components/banks/bank.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './components/auth/guard/auth.guard';
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        TableComponent,
        ReportComponent,
        BankComponent,
        StatmentsComponent
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgMultiSelectDropDownModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbPaginationModule, NgbAlertModule, NgbDatepickerModule, GraphQLModule,CommonModule

    ]
})
export class AppModule { }
