import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  @Input() counter!: number;
  @Input() stock!: number;
  @Output() newCounterValue = new EventEmitter<number>();
  iconPlus = faPlus;
  iconLess = faMinus;

  removeQuantity(): void {
    this.counter > 0 ? (this.counter -= 1) : (this.counter = 0);
    this.emitCounter();
  }

  addQuantity(): void {
    this.counter < this.stock ? (this.counter += 1) : this.counter;
    this.emitCounter();
  }

  emitCounter(): void {
    this.newCounterValue.emit(this.counter);
  }
}
