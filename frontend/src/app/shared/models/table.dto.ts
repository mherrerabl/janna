import { RowDTO } from './row.dto';

interface titlesDTO {
  title: string;
  smallScreens: boolean;
}

export interface TableDTO {
  titles: titlesDTO[];
  rows: RowDTO[];
  action: boolean;
  bd: string;
}
