export class ImageClass {
  id: string;
  title: string;
  picture_jpg: Blob;
  picture_webp: Blob;
  product_id?: string;
  treatment_id?: string;
  category_id?: string;

  constructor(
    id: string,
    title: string,
    picture_jpg: Blob,
    picture_webp: Blob,
    product_id?: string,
    treatment_id?: string,
    category_id?: string
  ) {
    this.id = id;
    this.title = title;
    this.picture_jpg = picture_jpg;
    this.picture_webp = picture_webp;
    this.product_id = product_id;
    this.treatment_id = treatment_id;
    this.category_id = category_id;
  }
}
