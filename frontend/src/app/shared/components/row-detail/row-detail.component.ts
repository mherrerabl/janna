import { Component, Input } from '@angular/core';
import { AddressClass } from '../../../addresses/models/address';
import { RowDetailDTO } from '../../models/row-detail.dto';

@Component({
  selector: 'app-row-detail',
  templateUrl: './row-detail.component.html',
})
export class RowDetailComponent {
  @Input() dataDetails!: RowDetailDTO[];

  addressShop: AddressClass;

  constructor() {
    this.addressShop = {
      id: '',
      name: 'Janna',
      address: 'C/Sant Llorenç de Brindisi',
      number: 22,
      additionalInfo: '',
      zip: '08241',
      city: 'Manresa',
      user_id: '',
      predetermined: true,
    };
  }

  getDays(date: Date): string {
    let days: number;
    let currentDay = new Date();

    days = Math.ceil(
      Math.abs(date.getTime() - currentDay.getTime()) / (1000 * 3600 * 24)
    );

    return days > 1 ? `${days} días` : `${days} día`;
  }
}
