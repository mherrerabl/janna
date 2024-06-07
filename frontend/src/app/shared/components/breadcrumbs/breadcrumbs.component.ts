import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BreadcrumbDTO } from '../../models/breadcrumb.dto';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnInit {
  @Output() emitTitle = new EventEmitter<BreadcrumbDTO>();
  dataBreadcrumbs!: BreadcrumbDTO[];

  constructor(private routeService: RouteService, private router: Router) {
    this.dataBreadcrumbs = this.routeService.generateBreadcrumbs();
  }
  ngOnInit(): void {
    this.sendBreadcrumb(this.dataBreadcrumbs[this.dataBreadcrumbs.length - 1]);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.dataBreadcrumbs = this.routeService.generateBreadcrumbs();
        this.sendBreadcrumb(
          this.dataBreadcrumbs[this.dataBreadcrumbs.length - 1]
        );
      }
    });
  }

  sendBreadcrumb(value: BreadcrumbDTO): void {
    this.emitTitle.emit(value);
  }
}
