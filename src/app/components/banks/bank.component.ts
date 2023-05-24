import { Bank } from './../../model/bank';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql, ApolloBase } from 'apollo-angular';
import { ADD_BANKS, DELETE_BANKS, GET_BANKS } from '../services/banks';
import { map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent implements OnInit {
  banks: Bank[] = [];
  bankForms: FormGroup;
  apollo: ApolloBase;
  showModal = false;
  selected: any;
  constructor(
    private apolloProvider: Apollo,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.apollo = this.apolloProvider.use('addwafariz');
  }
  openXl(longContent: any, ff: Bank | null): void {
    this.modalService.open(longContent, { size: 'xl' });
    console.log(ff);
    if (ff != null) {
      this.selected = ff;
      this.bankForms?.patchValue({
        id: ff.id,
        name: ff.name,
      });
    }
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_BANKS,
      })
      .valueChanges.subscribe(({ data }: any) => {
        this.banks = data.GetBanks;
      });
    this.bankForms = this.fb.group({
      id: [''],
      name: ['', Validators.required],
    });
  }

  public save(): any {
    console.log(this.bankForms);

    let Create_Visitor = `
        mutation{
            createBank(data:{
            id:0,
            name:"${this.bankForms.value.name}",
          }){
            id
            name 
            createdAt
          }
  }`;

    console.log(Create_Visitor);

    const ADD_BANKS = gql`
      ${Create_Visitor}
    `;
    this.apollo
      .mutate({ mutation: ADD_BANKS })
      .pipe(
        map((result: any) => result?.data),
        map((data) => data?.createBank)
      )
      .subscribe((dd) => {
        console.log(dd);
        let mybank = {
          id: dd.id,
          name: dd.name,
          createdAt: dd.createdAt,
        };
        let newP: Bank = dd;
        console.log(newP);

        this.banks = Object.assign([], this.banks);
        this.banks.push(newP);
        //this.ngOnInit()
        console.log(this.banks);
      });
  }
  public update(): any {
    console.log(this.bankForms);

    let Update_Bank = `
      mutation {
        updateBank(data:{
              id:${this.bankForms.value.id},
              name:"${this.bankForms.value.name}",
            }){
              id
              name
              createdAt
            }}`;

    console.log(Update_Bank);

    const UPDATE_BANKS = gql`
      ${Update_Bank}
    `;
    this.apollo
      .mutate({
        mutation: UPDATE_BANKS,
        variables: {
          id: 12,
        },
      })
      .subscribe(({ data }) => {
        console.log('got data', data);
      });
  }
  deleteTodo(id: any) {
    console.log(id);

    const ddd = `
      mutation {
          deleteBank(data: ${id}) {
          id
        }
      }`;
    console.log(ddd);

    const DELETE_BANKS = gql`
      ${ddd}
    `;
    // apollo graphql query to delete todo
    this.apollo
      .mutate({
        mutation: DELETE_BANKS,
        variables: {
          id: '${this.bankForms.value.id}',
        },
        refetchQueries: [
          {
            query: GET_BANKS,
          },
        ],
      })
      .subscribe(({ data }: any) => {
        this.banks = data.deleteBank;
      });
    console.log(id);
  }
  closeModel() {
    this.showModal = !this.showModal;
  }
}
