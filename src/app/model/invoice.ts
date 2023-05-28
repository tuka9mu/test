import { IraqiuncalculatedLogs } from './iraqiuncalculated-logs';
import { IraqicalculatedLogs } from './iraqicalculated-logs';
import { FakedLogs } from './faked-logs';
import { Statement } from './statement';
import { Bank } from '../components/banks/bank';
import { Site } from './site';

export interface Invoice {
      id:Number,
      Bank:Bank,
      Site:Site,
      bankId:Number,
      siteId:Number,
      Statement:Statement[],
      FakedLogs:FakedLogs[],
      Iraqicalculated_Logs:IraqicalculatedLogs[],
      Iraqiuncalculated_Logs:IraqiuncalculatedLogs[],
      workingdate:Date,
      createdAt:Date,
      updatedAt:Date,
      isActive:boolean
}
