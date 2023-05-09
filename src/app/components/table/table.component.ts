import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as data from './configration.json';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, RequiredValidator, Validators, ReactiveFormsModule } from '@angular/forms';
import * as NoWorkResult from 'postcss/lib/no-work-result';

export interface Cat {
      name: String;
}


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

export interface IraqiUnCalculated{
      cid:number;
      value:number
}
export interface UnIraqiCalculated {
      cid: number;
      value: number;
}

export interface UnIraqiUnCalculated{
      cid:number;
      value:number
}
export interface Statement {
      id:Number,
      invoiceId:Number,
      currencyId: Number,
      userId:Number,
      achieved:Number,
      loss:Number,
      forged: frod[],
      IraqiCalculated:IraqiCalculated[],
      IraqiUnCalculated:IraqiUnCalculated[],
      UnIraqiCalculated:number,
      UnIraqiUnCalculated:number,
      unIraqiCalculated_Details:string,
      unIraqiUnCalculated_Details:string,
      extra:Number,
      unacceptable:Number,
      auger:Number,
      buried:Number,
      cashier:string,
      notes:string,
      // createdAt:Date,
      // updatedAt:Date,
      // isActive:boolean

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

	constructor(private modalService: NgbModal) {}

      listfrod:frod[]= [];
      listIraqiCalculated:IraqiCalculated[]=[];
      listIraqiUnCalculated:IraqiUnCalculated[]=[];

      all:Statement[] = [];

	openXl(longContent: any) {
		this.modalService.open(longContent, { size: 'xl' });
	}

	openFullscreen(longContent: any) {
		this.modalService.open(longContent, { fullscreen: true });
	}

      selectedId!: string;
      dropdownList: any[] = [];
      selectedItems: any[] = [];
      dropdownSettings!: IDropdownSettings;
      showModal = false;

      products: any = (data as any).default;


      ngOnInit() {
            this.dropdownList = [
                  { item_id: 1, item_text: 'مصرف الرافدين' },
                  { item_id: 2, item_text: 'مصرف الرشيد' },
            ];

            this.dropdownSettings = {
                  singleSelection: true,
                  idField: 'item_id',
                  textField: 'item_text',
                  itemsShowLimit: 3,
                  allowSearchFilter: true,


            };
            this.formReactiveForms = new FormGroup({
              achieved:new FormControl([Validators.pattern("^[0-9]*$")]),
              loss:new FormControl(0),
              forged:new FormGroup({
                  forged_50:new FormControl(0),
                  forged_25:new FormControl(0),
                  forged_10:new FormControl(0),
                  forged_5:new FormControl(0),
                  forged_1000:new FormControl(0),
                  forged_500:new FormControl(0),
                  forged_250:new FormControl(0),
              }),
              IraqiCalculated: new FormGroup({
                  IraqiCalculated_50:new FormControl(0),
                  IraqiCalculated_25:new FormControl(0),
                  IraqiCalculated_10:new FormControl(0),
                  IraqiCalculated_5:new FormControl(0),
                  IraqiCalculated_1000:new FormControl(0),
                  IraqiCalculated_500:new FormControl(0),
                  IraqiCalculated_250:new FormControl(0),
              }),
              IraqiUnCalculated: new FormGroup({
                  IraqiUnCalculated_50:new FormControl(0),
                  IraqiUnCalculated_25:new FormControl(0),
                  IraqiUnCalculated_10:new FormControl(0),
                  IraqiUnCalculated_5:new FormControl(0),
                  IraqiUnCalculated_1000:new FormControl(0),
                  IraqiUnCalculated_500:new FormControl(0),
                  IraqiUnCalculated_250:new FormControl(0),
              }),
              UnIraqiCalculated: new FormControl(0),
              UnIraqiUnCalculated: new FormControl(0),
              unIraqiCalculated_Details: new FormControl(null),
              unIraqiUnCalculated_Details: new FormControl(null),
              extra: new FormControl(0),
              unacceptable:new FormControl(0),
              auger:new FormControl(0),
              buried:new FormControl(0),
              cashier:new FormControl(null),
              notes: new FormControl(null),

            });
            
      }
      get achived() {
            return this.formReactiveForms.get('achieved');
          }
      onItemSelect(item: any) {
            console.log(item);
      }
      toggleModal(name: any) {
            this.showModal = !this.showModal;
            console.log(this.selectedId = name);
      }
      closeModel(){
            this.showModal = !this.showModal;
      }
      save(){
            console.log(this.formReactiveForms)
            console.log(this.formReactiveForms.value)
            let frodform = this.formReactiveForms.value.forged;
            this.listfrod = [];
            if(frodform.forged_50>0)  this.listfrod.push({ cid: 1, value: frodform.forged_50, })
            if(frodform.forged_25>0)  this.listfrod.push({ cid:2, value: frodform.forged_25, })
            if(frodform.forged_10>0)  this.listfrod.push({ cid: 3, value: frodform.forged_10, })
            if(frodform.forged_5>0)  this.listfrod.push({ cid: 4, value: frodform.forged_5, })
            if(frodform.forged_1000>0)  this.listfrod.push({ cid: 5, value: frodform.forged_1000, })
            if(frodform.forged_500>0)  this.listfrod.push({ cid: 6, value: frodform.forged_500, })
            if(frodform.forged_250>0)  this.listfrod.push({ cid: 7, value: frodform.forged_250, })


            let IraqiCalculatedform = this.formReactiveForms.value.IraqiCalculated;
            this.listIraqiCalculated =[];
            if (IraqiCalculatedform.IraqiCalculated_50) this.listIraqiCalculated.push({cid:1, value: IraqiCalculatedform.IraqiCalculated_50})
            if (IraqiCalculatedform.IraqiCalculated_25) this.listIraqiCalculated.push({cid:2, value: IraqiCalculatedform.IraqiCalculated_25})
            if (IraqiCalculatedform.IraqiCalculated_10) this.listIraqiCalculated.push({cid:3, value: IraqiCalculatedform.IraqiCalculated_10})
            if (IraqiCalculatedform.IraqiCalculated_5) this.listIraqiCalculated.push({cid:4, value: IraqiCalculatedform.IraqiCalculated_5})
            if (IraqiCalculatedform.IraqiCalculated_1000) this.listIraqiCalculated.push({cid:5, value: IraqiCalculatedform.IraqiCalculated_1000})
            if (IraqiCalculatedform.IraqiCalculated_500) this.listIraqiCalculated.push({cid:6, value: IraqiCalculatedform.IraqiCalculated_500})
            if (IraqiCalculatedform.IraqiCalculated_250) this.listIraqiCalculated.push({cid:7, value: IraqiCalculatedform.IraqiCalculated_250})
            
            let IraqiUnCalculatedform = this.formReactiveForms.value.IraqiUnCalculated;
            this.listIraqiUnCalculated =[];
            if(IraqiUnCalculatedform.IraqiUnCalculated_50) this.listIraqiUnCalculated.push({cid:1,value:IraqiUnCalculatedform.IraqiUnCalculated_50})        
            if(IraqiUnCalculatedform.IraqiUnCalculated_25) this.listIraqiUnCalculated.push({cid:2,value:IraqiUnCalculatedform.IraqiUnCalculated_25})
            if(IraqiUnCalculatedform.IraqiUnCalculated_10) this.listIraqiUnCalculated.push({cid:3,value:IraqiUnCalculatedform.IraqiUnCalculated_10})
            if(IraqiUnCalculatedform.IraqiUnCalculated_50) this.listIraqiUnCalculated.push({cid:4,value:IraqiUnCalculatedform.IraqiUnCalculated_5})        
            if(IraqiUnCalculatedform.IraqiUnCalculated_50) this.listIraqiUnCalculated.push({cid:5,value:IraqiUnCalculatedform.IraqiUnCalculated_1000})        
            if(IraqiUnCalculatedform.IraqiUnCalculated_50) this.listIraqiUnCalculated.push({cid:6,value:IraqiUnCalculatedform.IraqiUnCalculated_500})        
            if(IraqiUnCalculatedform.IraqiUnCalculated_50) this.listIraqiUnCalculated.push({cid:7,value:IraqiUnCalculatedform.IraqiUnCalculated_250})        


          this.all = [
            {
                  id:1,
                  invoiceId:1,
                  currencyId:1,
                  userId:2,
                  achieved:this.formReactiveForms.value.achieved,
                  loss:this.formReactiveForms.value.loss,
                  forged:this.listfrod,
                  IraqiCalculated:this.listIraqiCalculated,
                  IraqiUnCalculated:this.listIraqiUnCalculated,
                  UnIraqiCalculated:this.formReactiveForms.value.UnIraqiCalculated,
                  UnIraqiUnCalculated:this.formReactiveForms.value.UnIraqiUnCalculated,
                  unIraqiCalculated_Details:this.formReactiveForms.value.unIraqiCalculated_Details,
                  unIraqiUnCalculated_Details:this.formReactiveForms.value.unIraqiUnCalculated_Details,
                  extra:this.formReactiveForms.value.extra,
                  unacceptable:this.formReactiveForms.value.unacceptable,
                  auger:this.formReactiveForms.value.auger,
                  buried:this.formReactiveForms.value.buried,
                  cashier:this.formReactiveForms.value.cashier,
                  notes:this.formReactiveForms.value.cashier,
            }
          ]
            
      console.log(this.all)
            // console.log(this.listunIraqiCalculated)
          
            


      }
}


