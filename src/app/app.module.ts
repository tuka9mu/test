import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
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
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        TableComponent,
        ReportComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgMultiSelectDropDownModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbPaginationModule, NgbAlertModule, NgbDatepickerModule,

    ]
})
export class AppModule { }
