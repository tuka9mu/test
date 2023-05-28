import { Injectable } from '@angular/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { Bank } from 'src/app/components/banks/bank';

@Injectable({
  providedIn: 'root',
})
export class BankServiceService {
  banks: Bank[] = [];
  apollo: ApolloBase;
  constructor(
    private apolloProvider: Apollo,
  ) {
    this.apollo = this.apolloProvider.use('addwafariz');
  }
  public getBank(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            GetBanks {
              id
              name
            }
          }
        `,
      })
      .valueChanges.pipe(
        map((result: any) => result?.data),
        map((data) => data?.GetBanks)
      );
  }
  public addBank(bank: Bank): any {
    console.log(bank);
    this.banks?.push(bank);
    let Create_Bank = `
    mutation{
      createBank(data:{
      id:0,
      name:"${bank.name}",
    }){
      id
      name
    }
}`;
    console.log(Create_Bank);
    const ADD_BANKS = gql`
      ${Create_Bank}
    `;
    return this.apollo
      .mutate({
        mutation: ADD_BANKS,
      })
      .pipe(
        map((result: any) => result?.data),
        map((data) => data?.createBank)
      );
  }
  public updateBank(id: number, bank: Bank): any {
    let Update_Bank = `
      mutation {
        updateBank(data:{
              id:${id},
              name:"${bank.name}",
            }){
              id
              name
            }}`;

    console.log(Update_Bank);

    const UPDATE_BANKS = gql`
      ${Update_Bank}
    `;
    this.apollo
      .mutate({
        mutation: UPDATE_BANKS,
        refetchQueries: [
          {
            query: gql`
          {
            GetBanks {
              id
              name
            }
          }`
          }

        ]
      })
      .subscribe(({ data }) => {
        console.log('got data', data);
      });
  }
  public deleteBank(id: number): any {
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
    this.apollo
      .mutate({
        mutation: DELETE_BANKS,
        variables: {
          id: '${this.bankForms.value.id}',
        },
      })
      .subscribe(({ data }: any) => {
        this.banks = data.deleteBank;
      });
    console.log(id);
  }
}
