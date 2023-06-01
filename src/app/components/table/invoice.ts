import { gql } from 'apollo-angular';

const GET_INVOICE = gql`
  {
    GetInvoice(data: 1) {
      id
      Bank {
        id
        name
      }
      Site {
        id
        name
      }

      Statement {
        id
        workingdate
        Currency {
          id
          name
        }
        userId
        achieved
        loss
        unIraqiCalculated
        unIraqiCalculated_Details
        extra
        unacceptable
        auger
        buried
        cashier
        notes
        Faked_Logs {
          id
          currencyId
          value
        }
        Iraqicalculated_Logs {
          id
          currencyId
          value
        }
      }
    }
  }
`;

const GET_INVOICES = gql`
{
      GetInvoices {
        id
        Bank {
          id
          name
        }
        Site {
          id
          name
        }
        
        Statement {
          id
          workingdate
          Currency {
            id
            name
          }
          userId
          achieved
          loss
          unIraqiCalculated
          unIraqiCalculated_Details
          extra
          unacceptable
          auger
          buried
          cashier
          notes
          Faked_Logs {
            id
            currencyId
            value
          }
          Iraqicalculated_Logs {
            id
            currencyId
            value
          }
      
        }
        createdAt
        updatedAt
        isActive
      }
    }
`;

export { GET_INVOICE, GET_INVOICES };
