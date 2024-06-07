import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BadgeDTO } from '../../models/badge.dto';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
})
export class BadgeComponent implements OnInit {
  @Input() dataBadge!: BadgeDTO;
  @Input() isSelected!: boolean;
  @Output() badgeSelected = new EventEmitter<BadgeDTO>();

  ngOnInit(): void {}

  clicked(): void {
    this.isSelected = !this.isSelected;
    this.sendData();
  }

  sendData(): void {
    if (this.isSelected === true) {
      this.badgeSelected.emit(this.dataBadge);
    }
  }

  badgeInfoColor(): string {
    if (this.dataBadge.name === 'Trend') {
      return 'bg-[#FF6F07]';
    } else if (this.dataBadge.name === 'Nuevo') {
      return 'bg-[#F80404]';
    } else if (this.dataBadge.name === '2a 50%') {
      return 'bg-[#0B8B00]';
    } else if (this.dataBadge.name === '3x2') {
      return 'bg-[#00AFFA]';
    }
    return '';
  }
}
