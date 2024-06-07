import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { ImageClass } from '../../../images/models/image';
import { CardSimpleDTO } from '../../../shared/models/card-simple.dto';
import { isLoading } from '../../../spinner/actions/spinner.actions';
import * as CategoriesAction from '../../actions';
import { CategoryClass } from '../../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories: CategoryClass[];
  prevCategories: CategoryClass[];
  dataCards: CardSimpleDTO[];
  private urlDeparmtent!: string;
  private urlCategory!: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.categories = [];
    this.prevCategories = [];
    this.dataCards = [];

    this.store.select('categories').subscribe((store) => {
      this.categories = store.categories;

      if (
        this.categories.length > 0 &&
        this.categories !== this.prevCategories
      ) {
        setTimeout(() => {
          this.store.dispatch(isLoading({ status: false }));
        });
        for (const category of this.categories) {
          this.createDataCard(category);
        }
        this.prevCategories = this.categories;
      }
    });
  }

  ngOnInit(): void {
    this.categories = [];
    this.dataCards = [];

    this.urlDeparmtent = this.router.url.slice(1).split('/').slice(0, 1).join();
    this.urlCategory = this.route.snapshot.paramMap.get('category');

    if (this.urlCategory !== null && this.urlCategory !== undefined) {
      this.loadSubcategories(this.urlCategory);
    } else {
      this.loadCategories(this.urlDeparmtent);
    }
  }

  private loadCategories(department: string): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });
    this.store.dispatch(
      CategoriesAction.getCategoriesByDepartment({ department: department })
    );
  }

  private loadSubcategories(paramUrl: string): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });
    this.store.dispatch(
      CategoriesAction.getCategoriesByUrl({ paramUrl: paramUrl })
    );
  }

  private createDataCard(category: CategoryClass): void {
    let newImage: ImageClass;
    let newCard: CardSimpleDTO;

    if (category.image !== undefined) {
      newImage = {
        id: '',
        title: category.image.title,
        picture_jpg: category.image.picture_jpg,
        picture_webp: category.image.picture_webp,
      };
      newCard = {
        title: category.name,
        url:
          category.isParent === true
            ? category.url
            : (this.urlDeparmtent == 'tratamientos' ? 'info/' : 'productos/') +
              category.url,
        image: newImage,
      };

      this.dataCards.push(newCard);
    }
  }
}
