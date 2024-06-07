import { Component, Input } from '@angular/core';
import { CardSimpleDTO } from '../../models/card-simple.dto';

@Component({
  selector: 'app-card-simple',
  templateUrl: './card-simple.component.html',
})
export class CardSimpleComponent {
  @Input() dataCard!: CardSimpleDTO;
}
