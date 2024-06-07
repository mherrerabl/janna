import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducers';
import * as OrdersAction from '../../../../orders/actions';
import { OrderClass, StateOrder } from '../../../../orders/models/order';
import { StateProductOrder } from '../../../../orders/models/product-order';
import { ListProductsDTO } from '../../../../shared/models/list-products.dto';
import { RowDetailDTO } from '../../../../shared/models/row-detail.dto';
import { RowDTO } from '../../../../shared/models/row.dto';
import { TableDTO } from '../../../../shared/models/table.dto';
import { isLoading } from '../../../../spinner/actions/spinner.actions';

@Component({
  selector: 'app-profile-user-orders-table',
  templateUrl: './profile-user-orders-table.component.html',
  styleUrl: './profile-user-orders-table.component.scss',
})
export class ProfileUserOrdersTableComponent implements OnInit {
  orders: OrderClass[];
  userId!: string;
  dataTable!: TableDTO;
  constructor(private store: Store<AppState>) {
    this.orders = new Array<OrderClass>();

    this.store.select('user').subscribe((store) => {
      if (store.user.id !== undefined && store.user.id !== '') {
        this.userId = store.user.id;
        this.loadOrders(this.userId);
      }
    });

    this.store.select('order').subscribe((store) => {
      this.orders = store.orders;

      if (this.orders.length > 0) {
        this.orders.sort((a, b) => {
          return Number(b.id) - Number(a.id);
        });
        this.dataTable = this.getTable();
      }
    });
  }
  ngOnInit(): void {}

  loadOrders(userId: string): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });
    this.store.dispatch(OrdersAction.getOrderByUserId({ userId: userId }));
  }

  getTable(): TableDTO {
    let rows: RowDTO[] = [];

    this.orders.forEach((order) => {
      let newRow: string[] = [];
      newRow.push(order.id);
      newRow.push(
        new Date(order.modification_date).toLocaleDateString('es-ES')
      );
      newRow.push(StateOrder[order.state]);

      let products: ListProductsDTO[] = [];

      if (order.products !== undefined) {
        for (const product of order.products) {
          products.push({
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            state: StateProductOrder[product.state],
          });
        }
      }

      let newDetail: RowDetailDTO[] = [
        {
          title: 'id',
          content: {
            info: {
              text: order.id,
            },
          },
        },
        {
          title: 'Productos',
          content: {
            products: products,
          },
        },
        {
          title: 'Precio total',
          content: {
            info: {
              price: order.total_price,
            },
          },
        },
        {
          title: 'Dirección',
          content: {
            info: {
              address: order.address,
            },
          },
        },
        {
          title: 'Estado',
          content: {
            info: {
              text: StateOrder[order.state],
            },
          },
        },
        {
          title: 'Fecha de pedido',
          content: {
            info: {
              date: order.creation_date,
            },
          },
        },
        {
          title: 'Fecha de modificación',
          content: {
            info: {
              date: order.modification_date,
            },
          },
        },
      ];

      let row: RowDTO = {
        id: order.id,
        rowInfo: newRow,
        detail: newDetail,
      };
      rows.push(row);
    });
    this.orders;
    return {
      titles: [
        {
          title: 'id',
          smallScreens: true,
        },
        {
          title: 'Fecha',
          smallScreens: true,
        },
        {
          title: 'Estado',
          smallScreens: true,
        },
      ],
      rows: rows,
      action: false,
      bd: 'order',
    };
  }
}
