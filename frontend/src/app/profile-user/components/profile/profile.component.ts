import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbDTO } from '../../../shared/models/breadcrumb.dto';
import { DropdownDTO } from '../../../shared/models/dropdown.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
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
export class ProfileComponent implements OnInit {
  dataDropdown: DropdownDTO;
  title: string;

  isProfileHome: boolean = false;

  iconBars = faBars;
  dropdownExpanded: boolean = false;

  innerWidth!: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.title = '';

    this.dataDropdown = this.getData();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  receiveBreadcrumb(breadcrumb: BreadcrumbDTO): void {
    setTimeout(() => {
      this.title = breadcrumb.name;

      this.dropdownExpanded = false;

      if (this.title == 'Perfil') {
        this.dropdownExpanded = true;
      }
    });
  }

  getData(): DropdownDTO {
    return {
      title: this.title,
      list: [
        {
          link: 'personal',
          name: 'Datos personales',
        },
        {
          link: 'direcciones',
          name: 'Direcciones',
        },
        {
          link: 'pedidos',
          name: 'Pedidos',
        },
        {
          link: 'citas',
          name: 'Citas',
        },
        {
          link: 'tratamientos',
          name: 'Tratamientos',
        },
      ],
    };
  }
}
