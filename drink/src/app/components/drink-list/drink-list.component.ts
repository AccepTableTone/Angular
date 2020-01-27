//angular
import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
//project
import { Drink } from "../../models/drink";
import { DrinkService } from "../../services/drink/drink.service";
import { SearchEmitter } from "../../models/searchEmitter";

@Component({
  selector: "drink-list",
  templateUrl: "drink-list.component.html"
})
export class DrinkListComponent implements OnInit {
  //drinks are passed in
  @Input() drinkList: Drink[];

  fullDrinkList: Drink[];

  constructor(private drinkService: DrinkService) {
    this.fullDrinkList = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    let arTemp = [];
    if (Array.isArray(changes.drinkList.currentValue)) {
      arTemp = changes.drinkList.currentValue.slice(
        0,
        this.drinkService.drinkCount
      );
    }

    if (this.drinkService.currentSearchPage === 0) {
      this.fullDrinkList = [];
    }

    this.fullDrinkList = [...this.fullDrinkList, ...arTemp];
  }

  areMoreDrinks = () => {
    return (
      !this.drinkService.isLoading &&
      this.drinkList &&
      this.drinkList.length > this.drinkService.drinkCount
    );
  };

  isLoadingDrinks = () => {
    return this.fullDrinkList.length > 0 && this.drinkService.isLoading;
  };

  @Output() getDrinks = new EventEmitter<SearchEmitter>();
  getMoreDrinks = () => {
    this.getDrinks.emit(null);
  };

  ngOnInit() {}
}
