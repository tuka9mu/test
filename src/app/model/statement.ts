import { frod, IraqiCalculated, IraqiUnCalculated } from '../components/table/table.component';
import { Currency } from './currency';
export interface Statement {
      id: Number;
      invoiceId: Number;
      Currency:Currency,
      currencyId: Number;
      userId: Number;
      achieved: Number;
      loss: Number;
      forged: frod[];
      IraqiCalculated: IraqiCalculated[];
      IraqiUnCalculated: IraqiUnCalculated[];
      UnIraqiCalculated: number;
      UnIraqiUnCalculated: number;
      unIraqiCalculated_Details: string;
      unIraqiUnCalculated_Details: string;
      extra: Number;
      unacceptable: Number;
      auger: Number;
      buried: Number;
      cashier: string;
      notes: string;
    }
