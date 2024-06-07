import { ImageClass } from '../../images/models/image';
import { PriceClass } from '../../shared/models/price';

export class TreatmentClass {
  id: string;
  name: string;
  description: string;
  sessions: number;
  duration: number;
  price_id: string;
  price?: PriceClass;
  images?: ImageClass[];

  constructor(
    id: string,
    name: string,
    description: string,
    sessions: number,
    duration: number,
    price_id: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.sessions = sessions;
    this.duration = duration;
    this.price_id = price_id;
  }
}
