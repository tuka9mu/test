import { gql } from 'apollo-angular';

const GET_INVOICE = gql`
  {
    GetInvoice(data: 12) {
      id
      Bank {
        id
        name
      }
      Site {
        id
        name
      }
      workingdate
      Statement {
        id
        Currency {
          id
          name
        }
        userId
        achieved
        loss
        unIraqiCalculated
        unIraqiUnCalculated
        unIraqiCalculated_Details
        unIraqiUnCalculated_Details
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
        Iraqiuncalculated_Logs {
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
        Site{
          id
          name
        }
        siteId
        workingdate
        Statement {
          id
          invoiceId
          currencyId
          userId
          achieved
          loss
          unIraqiCalculated
          unIraqiUnCalculated
          unIraqiCalculated_Details
          unIraqiUnCalculated_Details
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
          Iraqiuncalculated_Logs {
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


export { GET_INVOICE ,GET_INVOICES
};
