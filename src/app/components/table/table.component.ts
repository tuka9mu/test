import { Currency } from './../../model/currency';
import { BankServiceService } from './../banks/bank-service.service';

import { Invoice } from './../../model/invoice';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import * as data from './configration.json';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import * as NoWorkResult from 'postcss/lib/no-work-result';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Statement } from 'src/app/model/statement';
import { GET_INVOICE } from './invoice';
import { DOCUMENT } from '@angular/common';
import { shouldInclude } from '@apollo/client/utilities';
import { Bank } from '../banks/bank';
import { validate } from 'graphql';

export interface frod {
  currencyId: number;
  value: number;
}
export interface forin2 {
  id: number;
  name: String;
}
export interface IraqiCalculated {
  currencyId: number;
  value: number;
}
export interface IraqiUnCalculated {
  cid: number;
  value: number;
}
export interface UnIraqiCalculated {
  cid: number;
  value: number;
}
export interface UnIraqiUnCalculated {
  cid: number;
  value: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  closeResult: string | undefined;
  formReactiveForms: FormGroup;
  myForm: FormGroup;
  apollo: ApolloBase;
  CurID: 0;
  constructor(
    private modalService: NgbModal,
    private apolloProvider: Apollo,
    private fb: FormBuilder,
    private bankservice: BankServiceService,
    @Inject(DOCUMENT) document: Document
  ) {
    this.apollo = this.apolloProvider.use('addwafariz');
  }
  listfrod: frod[] = [];

  listStatments: String[] = [];
  listIraqiCalculated: IraqiCalculated[] = [];
  all: Invoice[] = [];
  all2: Statement[] = [];
  currency: Currency[] = [];
  test(aaCurID: any) { 
       return this.CurID != aaCurID;
 
    }
  openXl(longContent: any, c: any) {
    console.log(c);
    this.CurID = c;
    this.modalService.open(longContent, { size: 'xl' });
  }
  selectedId!: string;
  banks: Bank[] = [];
  selectedItems: any[] = [];
  dropdownSettings!: IDropdownSettings;
  showModal = false;

  products: any = (data as any).default;

  ngOnInit() {
    this.bankservice.getBank().subscribe((data: any) => {
      this.banks = data;
    });
    console.log(this.bankservice.getBank());

    this.apollo
      .watchQuery({
        query: GET_INVOICE,
      })
      .valueChanges.subscribe(({ data }: any) => {
        console.log(data.GetInvoice);
        this.all2 = data.GetInvoice?.Statement;
      });

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.formReactiveForms = this.fb.group({
      workingdate: ['', Validators.required],
      achieved: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      loss: [''],
      forged: this.fb.group({
        forged_50: [0],
        forged_25: [0],
        forged_10: [0],
        forged_5: [0],
        forged_1000: [0],
        forged_500: [0],
        forged_250: [0],
      }),
      IraqiCalculated: this.fb.group({
        IraqiCalculated_50: [0],
        IraqiCalculated_25: [0],
        IraqiCalculated_10: [0],
        IraqiCalculated_5: [0],
        IraqiCalculated_1000: [0],
        IraqiCalculated_500: [0],
        IraqiCalculated_250: [0],
      }),
      UnIraqiCalculated: [0],
      unIraqiCalculated_Details: [''],
      extra: [0],
      unacceptable: [0],
      auger: [0],
      buried: [0],
      cashier: [''],
      notes: [''],
    });

    this.myForm = this.fb.group({
      date: {
        value: new Date().toISOString().substring(0, 10),
        disabled: true,
      },
      bank: [''],
    });
  }

  public saveInvoice() {
    console.log(this.myForm.value);
    console.log(this.all);
    let StatementString = '';
    this.listStatments.forEach((dd) => {
      StatementString += `${dd}`;
    });
    if (this.listfrod.length > 0) {
      StatementString = `Statement:[${StatementString}] ,`;
    }

    console.log(StatementString);
   
    let Create_Invoice = `
        mutation{
          SetInvoice(data:{
            id:0,
            bankId:${this.selectedItems[0]?.id},
            siteId:1,
            ${StatementString}
        })
        {
          id
        }
      }
    `;
    console.log(Create_Invoice);
    const ADD_INVOICE = gql`
      ${Create_Invoice}
    `;
    this.apollo
      .mutate({ mutation: ADD_INVOICE })
      .pipe(
        map((result: any) => result?.data),
        map((data) => data?.SetInvoice)
      )
      .subscribe((dd) => {
        console.log(dd);
      });
  }

  public saveStatment() {
    let tr = 'S' + this.CurID;

    let frodform = this.formReactiveForms.value.forged;
    this.listfrod = [];
    if (frodform.forged_50 > 0)
      this.listfrod.push({ currencyId: 1, value: frodform.forged_50 });
    if (frodform.forged_25 > 0)
      this.listfrod.push({ currencyId: 2, value: frodform.forged_25 });
    if (frodform.forged_10 > 0)
      this.listfrod.push({ currencyId: 3, value: frodform.forged_10 });
    if (frodform.forged_5 > 0)
      this.listfrod.push({ currencyId: 4, value: frodform.forged_5 });
    if (frodform.forged_1000 > 0)
      this.listfrod.push({ currencyId: 5, value: frodform.forged_1000 });
    if (frodform.forged_500 > 0)
      this.listfrod.push({ currencyId: 6, value: frodform.forged_500 });
    if (frodform.forged_250 > 0)
      this.listfrod.push({ currencyId: 7, value: frodform.forged_250 });
    console.log(this.listfrod);
    let IraqiCalculatedform = this.formReactiveForms.value.IraqiCalculated;
    this.listIraqiCalculated = [];
    if (IraqiCalculatedform.IraqiCalculated_50)
      this.listIraqiCalculated.push({
        currencyId: 1,
        value: IraqiCalculatedform.IraqiCalculated_50,
      });
    if (IraqiCalculatedform.IraqiCalculated_25)
      this.listIraqiCalculated.push({
        currencyId: 2,
        value: IraqiCalculatedform.IraqiCalculated_25,
      });
    if (IraqiCalculatedform.IraqiCalculated_10)
      this.listIraqiCalculated.push({
        currencyId: 3,
        value: IraqiCalculatedform.IraqiCalculated_10,
      });
    if (IraqiCalculatedform.IraqiCalculated_5)
      this.listIraqiCalculated.push({
        currencyId: 4,
        value: IraqiCalculatedform.IraqiCalculated_5,
      });
    if (IraqiCalculatedform.IraqiCalculated_1000)
      this.listIraqiCalculated.push({
        currencyId: 5,
        value: IraqiCalculatedform.IraqiCalculated_1000,
      });
    if (IraqiCalculatedform.IraqiCalculated_500)
      this.listIraqiCalculated.push({
        currencyId: 6,
        value: IraqiCalculatedform.IraqiCalculated_500,
      });
    if (IraqiCalculatedform.IraqiCalculated_250)
      this.listIraqiCalculated.push({
        currencyId: 7,
        value: IraqiCalculatedform.IraqiCalculated_250,
      });
    console.log(this.listIraqiCalculated);

    let frodString = '';
    this.listfrod.forEach((dd) => {
      frodString += `{ currencyId:${dd.currencyId} value:${dd.value} }`;
    });
    if (this.listfrod.length > 0) {
      frodString = `Faked_Logs:[${frodString}] ,`;
    }


    let CalculatedString = '';
    this.listIraqiCalculated.forEach((dd) => {
      CalculatedString += `{ currencyId:${dd.currencyId} value:${dd.value} }`;
    });
    if (this.listIraqiCalculated.length > 0) {
      CalculatedString = `Iraqicalculated_Logs:[${CalculatedString}] ,`;
    }
    let OneStat = ` {id:0,workingdate:"${this.formReactiveForms.value.workingdate}",
            currencyId:${this.CurID},
            achieved:${this.formReactiveForms.value.achieved},
            loss:${this.formReactiveForms.value.loss},
            unIraqiCalculated:${this.formReactiveForms.value.UnIraqiCalculated},
            unIraqiCalculated_Details: "${this.formReactiveForms.value.unIraqiCalculated_Details}",
            extra: ${this.formReactiveForms.value.extra},
            unacceptable: ${this.formReactiveForms.value.unacceptable},
            auger: ${this.formReactiveForms.value.auger},
            buried: ${this.formReactiveForms.value.buried},
            cashier: "${this.formReactiveForms.value.cashier}",
            notes: "${this.formReactiveForms.value.notes}",
            userId:1,
            ${frodString}
            ${CalculatedString} 
          }`;



    console.log(OneStat);
this.listStatments.push(OneStat)



    const tag = document.getElementById(tr);
    const cell0 = document.createElement('td');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    const cell4 = document.createElement('td');
    const cell5 = document.createElement('td');
    const cell6 = document.createElement('td');
    const cell7 = document.createElement('td');
    const cell8 = document.createElement('td');
    const cellText0 = document.createTextNode(
      `${this.formReactiveForms.value.workingdate}`
    );
    const cellText1 = document.createTextNode(
      `${this.formReactiveForms.value.achieved}`
    );
    const cellText2 = document.createTextNode(
      `${this.formReactiveForms.value.loss}`
    );
    const cellText3 = document.createTextNode(
      `${this.formReactiveForms.value.extra}`
    );
    const cellText4 = document.createTextNode(
      `${this.formReactiveForms.value.unacceptable}`
    );
    const cellText5 = document.createTextNode(
      `${this.formReactiveForms.value.auger}`
    );
    const cellText6 = document.createTextNode(
      `${this.formReactiveForms.value.buried}`
    );
    const cellText7 = document.createTextNode(
      `${this.formReactiveForms.value.cashier}`
    );
    const cellText8 = document.createTextNode(
      `${this.formReactiveForms.value.notes}`
    );
    cell0.appendChild(cellText0);
    document.getElementById(tr).appendChild(cell0);
    cell1.appendChild(cellText1);
    document.getElementById(tr).appendChild(cell1);
    cell2.appendChild(cellText2);
    document.getElementById(tr).appendChild(cell2);
    cell3.appendChild(cellText3);
    document.getElementById(tr).appendChild(cell3);
    cell4.appendChild(cellText4);
    document.getElementById(tr).appendChild(cell4);
    cell5.appendChild(cellText5);
    document.getElementById(tr).appendChild(cell5);
    cell6.appendChild(cellText6);
    document.getElementById(tr).appendChild(cell6);
    cell7.appendChild(cellText7);
    document.getElementById(tr).appendChild(cell7);
    cell8.appendChild(cellText8);
    document.getElementById(tr).appendChild(cell8);
    console.log(tag);

    //     this.all2 = [
    //       {
    //         id: 1,
    //         invoiceId: 1,
    //         Currency: {
    //           id: this.currency[0].id,
    //           name: this.currency[0].name,
    //         },
    //         currencyId: this.CurID,
    //         userId: 1,
    //         workingdate: this.formReactiveForms.value.workingdate,
    //         achieved: this.formReactiveForms.value.achieved,
    //         loss: this.formReactiveForms.value.loss,
    //         forged: this.listfrod,
    //         IraqiCalculated: this.listIraqiCalculated,
    //         UnIraqiCalculated: this.formReactiveForms.value.UnIraqiCalculated,
    //         unIraqiCalculated_Details:this.formReactiveForms.value.unIraqiCalculated_Details,
    //         extra: this.formReactiveForms.value.extra,
    //         unacceptable: this.formReactiveForms.value.unacceptable,
    //         auger: this.formReactiveForms.value.auger,
    //         buried: this.formReactiveForms.value.buried,
    //         cashier: this.formReactiveForms.value.cashier,
    //         notes: this.formReactiveForms.value.cashier,
    //       },
    //     ];
    //     console.log(this.all2);
    
    this.modalService.dismissAll();
    this.formReactiveForms.reset();

  }

  get achived() {
    return this.formReactiveForms.get('achieved');
  }
  get workingdate() {
    return this.formReactiveForms.get('workingdate');
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  toggleModal(name: any) {
    this.showModal = !this.showModal;
    console.log((this.selectedId = name));
  }
}
