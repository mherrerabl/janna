import { ImageClass } from '../../images/models/image';

export enum Department {
  'init' = 'null',
  'tienda' = 'tienda',
  'tratamientos' = 'tratamientos',
}

export class CategoryClass {
  id: string;
  name: string;
  department: Department;
  url: string;
  category_id?: string;
  isParent?: boolean;
  image?: ImageClass;

  constructor(
    id: string,
    name: string,
    department: Department,
    url: string,
    category_id?: string
  ) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.url = url;
    this.category_id = category_id;
  }
}
