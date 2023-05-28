import { Bank } from './bank';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql, ApolloBase } from 'apollo-angular';
import { map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankServiceService } from './bank-service.service';
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent implements OnInit {
  banks: Bank[] = [];
  mybank: Bank = new Bank();
  bankForms: FormGroup;
  apollo: ApolloBase;
  showModal = false;
  selected: any;
  constructor(
    private apolloProvider: Apollo,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private bankservice: BankServiceService
  ) {
    this.apollo = this.apolloProvider.use('addwafariz');
  }
  openXl(longContent: any, bank: Bank | null): void {
    this.modalService.open(longContent, { size: 'xl' });
    console.log(bank);
    if (bank != null) {
      this.selected = bank;
      this.bankForms?.patchValue({
        id: bank.id,
        name: bank.name,
      });
    }
  }
  ngOnInit(): void {
    this.bankservice.getBank().subscribe((data: any) => {
      this.banks = data;
    });
    this.bankForms = this.fb.group({
      id: [''],
      name: ['', Validators.required],
    });
  }
  public save(): any {
    if (this.bankForms != null) {
      this.mybank.name = this.bankForms.get('name').value;
    }
    console.log(this.mybank);
    return this.bankservice.addBank(this.mybank).subscribe((data: any) => {
      console.log('addbank   >>>>>');
      console.log(data);
    });
  }
  public update(id: number): any {
    if (this.bankForms != null) {
      this.mybank.name = this.bankForms.get('name').value;
    }
    this.bankservice.updateBank(id, this.mybank);
    this.modalService.dismissAll();
  }
  DeleteBank(id: number): any {
    return this.bankservice.deleteBank(id).subscribe((data: any) => {
      console.log(data);
    });

  }
  closeModel() {
    this.modalService.dismissAll();
  }
}
