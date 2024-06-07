import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
  faMinus,
  faPlus,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as AddressesAction from '../../../addresses/actions';
import { AppState } from '../../../app.reducers';
import { isLoading } from '../../../spinner/actions/spinner.actions';
import { InputDTO } from '../../models/input.dto';
import { RowDTO } from '../../models/row.dto';
import { TableDTO } from '../../models/table.dto';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
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
export class TableComponent implements OnInit {
  @Input() dataTable!: TableDTO;
  rows!: RowDTO[];
  expandedElement!: RowDTO | null;
  currentPage: number = 1;

  searcher: string;
  searcherControl: FormControl;
  form!: FormGroup;

  input: InputDTO;

  iconPlus = faPlus;
  iconLess = faMinus;
  iconDelete = faTrashCan;
  iconEdit = faEdit;
  iconArrowUp = faChevronUp;
  iconArrowDown = faChevronDown;
  iconSort = faSort;
  iconSearch = faMagnifyingGlass;

  orderAsc: boolean = false;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.searcher = '';
    this.searcherControl = new FormControl(this.searcher);

    this.form = this.formBuilder.group({
      searcher: this.searcherControl,
    });

    this.input = {
      id: 'searcherProfile',
      label: 'Buscar',
      placeholder: '',
      type: 'searcher',
      formControl: this.searcherControl,
      iconLeft: 'searcher',
      required: false,
    };
  }

  ngOnInit(): void {
    const table = this.dataTable;
    this.rows = table.rows;
  }

  sort(id: number) {
    if (this.orderAsc) {
      this.dataTable.rows.sort((a, b) =>
        a.rowInfo[id] > b.rowInfo[id]
          ? 1
          : a.rowInfo[id] < b.rowInfo[id]
          ? -1
          : 0
      );
    } else {
      this.dataTable.rows.sort((a, b) =>
        a.rowInfo[id] < b.rowInfo[id]
          ? 1
          : a.rowInfo[id] > b.rowInfo[id]
          ? -1
          : 0
      );
    }
    this.orderAsc = !this.orderAsc;
  }

  filter(): void {
    let rowsFiltered: RowDTO[] = [];
    console.log(this.rows);

    rowsFiltered = this.rows.filter((row) =>
      row.rowInfo.find((val) =>
        val
          .toString()
          .toLowerCase()
          .includes(this.searcherControl.value.toLowerCase())
      )
    );

    this.dataTable.rows = rowsFiltered;
  }

  delete(id: string): void {
    if (this.dataTable.bd === 'address') {
      this.deleteAddress(id);
    }
  }

  deleteAddress(id: string) {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });
    this.store.dispatch(AddressesAction.deleteAddress({ addressId: id }));
  }
}
