import { Component, OnInit } from '@angular/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { Invoice } from 'src/app/model/invoice';
import { GET_INVOICE, GET_INVOICES } from '../services/invoice';
@Component({
  selector: 'app-statments',
  templateUrl: './statments.component.html',
  styleUrls: ['./statments.component.css'],
})
export class StatmentsComponent implements OnInit {
  apollo: ApolloBase;
  all2: Invoice[] = [];

  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('addwafariz');
  }
  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_INVOICES,
      })
      .valueChanges.subscribe(({ data }: any) => {
        this.all2 = data.GetInvoices;
        console.log(this.all2);
      });
  }
}
