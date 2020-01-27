//angular
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
//project
import { SearchEmitter } from "../../models/searchEmitter";

@Component({
  selector: "search",
  templateUrl: "search.component.html"
})
export class SearchComponent implements OnInit {
  //sending search keywords up
  @Output() getDrinks = new EventEmitter<SearchEmitter>();

  searchDrinks(keywords) {
    this.getDrinks.emit({
      type: "search",
      value: keywords,
      status: "search",
      currentPage: 0
    });
  }

  ngOnInit() {}
}
