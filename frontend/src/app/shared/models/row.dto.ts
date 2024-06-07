import { RowDetailDTO } from './row-detail.dto';

export interface RowDTO {
  rowInfo: string[];
  detail: RowDetailDTO[];
  id: string;
}
