import { AddressClass } from '../../addresses/models/address';
import { ImageClass } from '../../images/models/image';
import { StateUserTreatment } from '../../user-treatments/models/user-treatments';
import { BadgeDTO } from './badge.dto';
import { ListProductsDTO } from './list-products.dto';

export interface SessionDTO {
  date: Date;
  state: string;
  appointment_id: string;
}

export interface RowDetailDTO {
  title: string;
  content: {
    info?: {
      text?: string;
      price?: number;
      days?: Date;
      date?: Date;
      time?: Date;
      address?: AddressClass;
    };
    list?: string[];
    products?: ListProductsDTO[];
    images?: ImageClass[];
    badges?: BadgeDTO[];
    appointments?: {
      sessions: SessionDTO[];
      state: StateUserTreatment;
    };
  };
}
