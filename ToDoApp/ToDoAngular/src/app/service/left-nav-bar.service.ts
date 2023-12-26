import { Injectable, EventEmitter} from '@angular/core';
import { LeftNavBarItemLi } from '../model/left-nav-bar-item.model';
import { LeftNavBarCategory } from '../model/category.model';


@Injectable({
  providedIn: 'root'
})
export class LeftNavBarService {
    
    private _selectedItem: LeftNavBarItemLi | null = null;
    itemSelected = new EventEmitter<LeftNavBarItemLi | null>();

    get selectedItem(): LeftNavBarItemLi | null {
        return this._selectedItem;
    }

    set selectedItem(item: LeftNavBarItemLi | null) {
        this._selectedItem = item;
        this.itemSelected.emit(item);
    }

    private _selectedCategory: LeftNavBarCategory | null = null;
    CategorySelected = new EventEmitter<LeftNavBarCategory | null>();

    get selectedCategory(): LeftNavBarCategory | null {
        return this._selectedCategory;
    }

    set selectedCategory(item: LeftNavBarCategory | null) {
        this._selectedCategory = item;
        this.CategorySelected.emit(item);
    }

    items: LeftNavBarItemLi[] = [
        { id: 1, label: 'My Day' , idLi: "myDayli",imgsrc: "assets/icons/snowflake.png"},
        { id: 2, label: 'Favorite', idLi: "myfavoriteli",imgsrc: "assets/icons/star_favorite_icon.png"},
        { id: 3, label: 'Planned', idLi: "myplanli",imgsrc: "assets/icons/calendar_icon.png" },
        { id: 4, label: 'Assigned to me', idLi: "forMeli",imgsrc: "assets/icons/for_me_icon.png" },
        { id: 5, label: 'Task', idLi: "taskli",imgsrc: "assets/icons/house_icon.png" },
    ];
}