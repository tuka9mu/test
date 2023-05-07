import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as data from './configration.json';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';

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
              achieved:new FormControl(null,Validators.required),
              loss:new FormControl(null),
              forged:new FormGroup({
                  forged_50:new FormControl(null),
                  forged_25:new FormControl(null),
                  forged_10:new FormControl(null),
                  forged_5:new FormControl(null),
                  forged_1000:new FormControl(null),
                  forged_500:new FormControl(null),
                  forged_250:new FormControl(null),
              }),
              unIraqiCalculated: new FormGroup({
                unIraqiCalculated_50:new FormControl(null),
                unIraqiCalculated_25:new FormControl(null),
                unIraqiCalculated_10:new FormControl(null),
                unIraqiCalculated_5:new FormControl(null),
                unIraqiCalculated_1000:new FormControl(null),
                unIraqiCalculated_500:new FormControl(null),
                unIraqiCalculated_250:new FormControl(null),
              }),
              unIraqiUnCalculated: new FormGroup({
                unIraqiUnCalculated_50:new FormControl(null),
                unIraqiUnCalculated_25:new FormControl(null),
                unIraqiUnCalculated_10:new FormControl(null),
                unIraqiUnCalculated_5:new FormControl(null),
                unIraqiUnCalculated_1000:new FormControl(null),
                unIraqiUnCalculated_500:new FormControl(null),
                unIraqiUnCalculated_250:new FormControl(null),
              }),
              CalculatedunIraqi: new FormControl(null),
              UnCalculatedunIraqi: new FormControl(null),
              unIraqiCalculated_Details: new FormControl(null),
              unIraqiUnCalculated_Details: new FormControl(null),
              extra: new FormControl(null),
              unacceptable:new FormControl(null),
              auger:new FormControl(null),
              buried:new FormControl(null),
              cashier:new FormControl(null),
              notes: new FormControl(null),

            });
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
            
            console.log(this.listfrod)
          
            


      }
}
