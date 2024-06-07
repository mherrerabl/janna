interface ListDTO {
  link: string;
  name: string;
}

export interface DropdownDTO {
  title: string;
  list: ListDTO[];
}
