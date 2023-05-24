import { Bank } from './../../model/bank';
import { Invoice } from './../../model/invoice';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import { GET_BANKS } from '../services/banks';
import { GET_INVOICE } from '../services/invoice';

export interface frod {
  cid: number;
  value: number;
}
export interface forin2 {
  id: number;
  name: String;
}
export interface IraqiCalculated {
  cid: number;
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

  constructor(
    private modalService: NgbModal,
    private apolloProvider: Apollo,
    private fb: FormBuilder,
    private fd: FormBuilder
  ) {
    this.apollo = this.apolloProvider.use('addwafariz');
  }
  listfrod: frod[] = [];
  listIraqiCalculated: IraqiCalculated[] = [];
  listIraqiUnCalculated: IraqiUnCalculated[] = [];

  all: Invoice[] = [];

  all2: Statement[] = [];

  openXl(longContent: any, Currency:any) {
    console.log(Currency);


    this.modalService.open(longContent, { size: 'xl' });
  }
  selectedId!: string;
  banks: Bank[] = [];
  selectedItems: any[] = [];
  dropdownSettings!: IDropdownSettings;
  showModal = false;

  products: any = (data as any).default;

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_BANKS,
      })
      .valueChanges.subscribe(({ data }: any) => {
        this.banks = data.GetBanks;
      });

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
      achieved: ['', Validators.pattern('^[0-9]*$')],
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
      IraqiUnCalculated: this.fb.group({
        IraqiUnCalculated_50: [0],
        IraqiUnCalculated_25: [0],
        IraqiUnCalculated_10: [0],
        IraqiUnCalculated_5: [0],
        IraqiUnCalculated_1000: [0],
        IraqiUnCalculated_500: [0],
        IraqiUnCalculated_250: [0],
      }),
      UnIraqiCalculated: [0],
      UnIraqiUnCalculated: [0],
      unIraqiCalculated_Details: [''],
      unIraqiUnCalculated_Details: [''],
      extra: [0],
      unacceptable: [0],
      auger: [0],
      buried: [0],
      cashier: [''],
      notes: [''],
    });

    this.myForm = this.fb.group({
      workingdate: [''],
      bank: [''],
    });
  }
  public save2() {
    console.log(this.myForm.value);
    console.log(this.all);
    let Create_Invoice = `
        mutation{
          SetInvoice(data:{
            id:0,
            workingdate:"${this.myForm.value.workingdate}",
            Bank:[{id:"${this.selectedItems[0].id}",name:"${this.selectedItems[0].name}"}]
            bankId:"${this.selectedItems[0].id}",,
            siteId:1,
            Statement:[{
              id:0,
              currencyId:"${this.formReactiveForms.value.currency}",
              achieved:"${this.formReactiveForms.value.achieved}",
              loss:"${this.formReactiveForms.value.loss}",
              unIraqiCalculated:"${this.formReactiveForms.value.unIraqiCalculated}",
              unIraqiUnCalculated:"${this.formReactiveForms.value.unIraqiUnCalculated}",
              unIraqiCalculated_Details: "${this.formReactiveForms.value.unIraqiCalculated_Details}",
              unIraqiUnCalculated_Details: "${this.formReactiveForms.value.unIraqiUnCalculated_Details}",
              extra: "${this.formReactiveForms.value.extra}",
              unacceptable: "${this.formReactiveForms.value.unacceptable}",
              auger: "${this.formReactiveForms.value.auger}",
              buried: "${this.formReactiveForms.value.buried}",
              cashier: "${this.formReactiveForms.value.cashier}",
              notes: "${this.formReactiveForms.value.notes}",
              userId:1,
              Faked_Logs:[
                {
                currencyId:"${this.listfrod[0]?.cid}",
                value:"${this.listfrod[0]?.value}"
              }]
            }]
        })
        {
          id
        }
      }
    `;
    console.log(Create_Invoice);
    // const ADD_INVOICE = gql`
    //   ${Create_Invoice}
    // `;
    // this.apollo
    //   .mutate({ mutation: ADD_INVOICE })
    //   .pipe(
    //     map((result: any) => result?.data),
    //     map((data) => data?.SetInvoice)
    //   )
    //   .subscribe((dd) => {
    //     console.log(dd);
    //   });
  }

  public save() {
    let frodform = this.formReactiveForms.value.forged;
    this.listfrod = [];
    if (frodform.forged_50 > 0)
      this.listfrod.push({ cid: 1, value: frodform.forged_50 });
    if (frodform.forged_25 > 0)
      this.listfrod.push({ cid: 2, value: frodform.forged_25 });
    if (frodform.forged_10 > 0)
      this.listfrod.push({ cid: 3, value: frodform.forged_10 });
    if (frodform.forged_5 > 0)
      this.listfrod.push({ cid: 4, value: frodform.forged_5 });
    if (frodform.forged_1000 > 0)
      this.listfrod.push({ cid: 5, value: frodform.forged_1000 });
    if (frodform.forged_500 > 0)
      this.listfrod.push({ cid: 6, value: frodform.forged_500 });
    if (frodform.forged_250 > 0)
      this.listfrod.push({ cid: 7, value: frodform.forged_250 });

    let IraqiCalculatedform = this.formReactiveForms.value.IraqiCalculated;
    this.listIraqiCalculated = [];
    if (IraqiCalculatedform.IraqiCalculated_50)
      this.listIraqiCalculated.push({
        cid: 1,
        value: IraqiCalculatedform.IraqiCalculated_50,
      });
    if (IraqiCalculatedform.IraqiCalculated_25)
      this.listIraqiCalculated.push({
        cid: 2,
        value: IraqiCalculatedform.IraqiCalculated_25,
      });
    if (IraqiCalculatedform.IraqiCalculated_10)
      this.listIraqiCalculated.push({
        cid: 3,
        value: IraqiCalculatedform.IraqiCalculated_10,
      });
    if (IraqiCalculatedform.IraqiCalculated_5)
      this.listIraqiCalculated.push({
        cid: 4,
        value: IraqiCalculatedform.IraqiCalculated_5,
      });
    if (IraqiCalculatedform.IraqiCalculated_1000)
      this.listIraqiCalculated.push({
        cid: 5,
        value: IraqiCalculatedform.IraqiCalculated_1000,
      });
    if (IraqiCalculatedform.IraqiCalculated_500)
      this.listIraqiCalculated.push({
        cid: 6,
        value: IraqiCalculatedform.IraqiCalculated_500,
      });
    if (IraqiCalculatedform.IraqiCalculated_250)
      this.listIraqiCalculated.push({
        cid: 7,
        value: IraqiCalculatedform.IraqiCalculated_250,
      });

    let IraqiUnCalculatedform = this.formReactiveForms.value.IraqiUnCalculated;
    this.listIraqiUnCalculated = [];
    if (IraqiUnCalculatedform.IraqiUnCalculated_50)
      this.listIraqiUnCalculated.push({
        cid: 1,
        value: IraqiUnCalculatedform.IraqiUnCalculated_50,
      });
    if (IraqiUnCalculatedform.IraqiUnCalculated_25)
      this.listIraqiUnCalculated.push({
        cid: 2,
        value: IraqiUnCalculatedform.IraqiUnCalculated_25,
      });
    if (IraqiUnCalculatedform.IraqiUnCalculated_10)
      this.listIraqiUnCalculated.push({
        cid: 3,
        value: IraqiUnCalculatedform.IraqiUnCalculated_10,
      });
    if (IraqiUnCalculatedform.IraqiUnCalculated_50)
      this.listIraqiUnCalculated.push({
        cid: 4,
        value: IraqiUnCalculatedform.IraqiUnCalculated_5,
      });
    if (IraqiUnCalculatedform.IraqiUnCalculated_50)
      this.listIraqiUnCalculated.push({
        cid: 5,
        value: IraqiUnCalculatedform.IraqiUnCalculated_1000,
      });
    if (IraqiUnCalculatedform.IraqiUnCalculated_50)
      this.listIraqiUnCalculated.push({
        cid: 6,
        value: IraqiUnCalculatedform.IraqiUnCalculated_500,
      });
    if (IraqiUnCalculatedform.IraqiUnCalculated_50)
      this.listIraqiUnCalculated.push({
        cid: 7,
        value: IraqiUnCalculatedform.IraqiUnCalculated_250,
      });

    this.all2 = [
      {
        id: 1,
        invoiceId: 1,
        Currency: {
          id: 1,
          name: '5000',
          createdAt: new Date('2023-05-10T09:40:32.956Z'),
          updatedAt: new Date('2023-05-10T09:40:32.956Z'),
          isActive: true,
        },
        currencyId: 1,
        userId: 2,
        achieved: this.formReactiveForms.value.achieved,
        loss: this.formReactiveForms.value.loss,
        forged: this.listfrod,
        IraqiCalculated: this.listIraqiCalculated,
        IraqiUnCalculated: this.listIraqiUnCalculated,
        UnIraqiCalculated: this.formReactiveForms.value.UnIraqiCalculated,
        UnIraqiUnCalculated: this.formReactiveForms.value.UnIraqiUnCalculated,
        unIraqiCalculated_Details:
          this.formReactiveForms.value.unIraqiCalculated_Details,
        unIraqiUnCalculated_Details:
          this.formReactiveForms.value.unIraqiUnCalculated_Details,
        extra: this.formReactiveForms.value.extra,
        unacceptable: this.formReactiveForms.value.unacceptable,
        auger: this.formReactiveForms.value.auger,
        buried: this.formReactiveForms.value.buried,
        cashier: this.formReactiveForms.value.cashier,
        notes: this.formReactiveForms.value.cashier,
      },
    ];
    console.log(this.all2);
  }

  public datess() {}

  get achived() {
    return this.formReactiveForms.get('achieved');
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  toggleModal(name: any) {
    this.showModal = !this.showModal;
    console.log((this.selectedId = name));
  }
  closeModel() {
    this.showModal = !this.showModal;
  }
}
