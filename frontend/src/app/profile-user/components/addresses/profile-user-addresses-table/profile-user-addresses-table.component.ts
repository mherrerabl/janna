import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AddressesAction from '../../../../addresses/actions';
import { AddressClass } from '../../../../addresses/models/address';
import { AppState } from '../../../../app.reducers';
import { RowDetailDTO } from '../../../../shared/models/row-detail.dto';
import { RowDTO } from '../../../../shared/models/row.dto';
import { TableDTO } from '../../../../shared/models/table.dto';
import { isLoading } from '../../../../spinner/actions/spinner.actions';
@Component({
  selector: 'app-profile-user-addresses-table',
  templateUrl: './profile-user-addresses-table.component.html',
  styleUrl: './profile-user-addresses-table.component.scss',
})
export class ProfileUserAddressesTableComponent implements OnInit {
  addresses: AddressClass[];
  userId!: string;
  dataTable!: TableDTO;
  constructor(private store: Store<AppState>) {
    this.addresses = new Array<AddressClass>();

    this.store.select('user').subscribe((store) => {
      if (store.user.id !== undefined && store.user.id !== '') {
        this.userId = store.user.id;
      }
    });

    this.store.select('address').subscribe((store) => {
      this.addresses = store.addresses;
      if (this.addresses.length > 0) {
        this.dataTable = this.getTable();
      }
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });

    if (this.userId !== undefined || this.userId !== '') {
      this.loadAddresses(this.userId);
    }
  }

  loadAddresses(userId: string): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });
    this.store.dispatch(AddressesAction.getAddressByUserId({ userId: userId }));
  }

  getTable(): TableDTO {
    let rows: RowDTO[] = [];

    for (const address of this.addresses) {
      let newRow: string[] = [];
      newRow.push(address.name);

      let newDetail: RowDetailDTO = {
        title: address.name,
        content: {
          info: {
            address: address,
          },
        },
      };

      let row: RowDTO = {
        id: address.id,
        rowInfo: newRow,
        detail: [newDetail],
      };
      rows.push(row);
    }

    return {
      titles: [
        {
          title: 'Nombre',
          smallScreens: true,
        },
      ],
      rows: rows,
      action: true,
      bd: 'address',
    };
  }
}
