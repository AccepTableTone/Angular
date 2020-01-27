//angular
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
//project
import { Category } from "../../models/category";
import { SearchEmitter } from "../../models/searchEmitter";

@Component({
  selector: "nav-category",
  templateUrl: "nav-category.component.html"
})
export class NavCategoryComponent implements OnInit {
  categoryNavList: Category[];
  //we are passing the api request url up
  @Output() getDrinks = new EventEmitter<SearchEmitter>();

  getDrinksByCategory(category: Category) {
    this.getDrinks.emit({
      type: "category",
      value: category.val,
      status: category.nme.toLowerCase(),
      currentPage: 0
    });
  }

  constructor() {
    this.categoryNavList = [
      { nme: "Beer", val: "Beer" },
      { nme: "Cocktail", val: "Cocktail" },
      { nme: "Liqueur", val: "Homemade Liqueur" },
      { nme: "Shots", val: "Shot" },
      { nme: "Hot", val: "Hot Drinks" },
      { nme: "Mixed", val: "Mixed Drink" },
      { nme: "Party", val: "Party and Punches" },
      { nme: "Soda", val: "Soft Drinks" },
      { nme: "Other", val: "Other" }
    ];
  }

  ngOnInit() {}
}
