import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { faCalendar, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronDown,
  faChevronUp,
  faEye,
  faEyeSlash,
  faMagnifyingGlass,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { InputDTO, OptionDTO } from '../../models/input.dto';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class InputComponent {
  @Input() dataInput!: InputDTO;
  @Input() checkForm!: boolean;

  hidePassword: boolean = true;
  expandSelect: boolean = false;
  optionSelected!: OptionDTO;
  iconEmail = faEnvelope;
  iconPhone = faPhone;
  iconCalendar = faCalendar;
  iconEye = faEye;
  iconEyeSlash = faEyeSlash;
  iconArrowUp = faChevronUp;
  iconArrowDown = faChevronDown;
  iconSearch = faMagnifyingGlass;

  currentDay: Date = new Date();

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  constructor(date: DateAdapter<Date>) {
    date.getFirstDayOfWeek = () => 1;
  }

  toogleIconPassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  toogleSelect(): void {
    this.expandSelect = !this.expandSelect;
  }

  optionMenu(value: string): void {
    if (this.dataInput.options !== undefined) {
      this.optionSelected = this.dataInput.options.filter(
        ({ id }) => id === value
      )[0];
    }

    this.toogleSelect();
  }
}
