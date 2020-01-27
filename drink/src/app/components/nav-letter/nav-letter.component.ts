//angular
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
//project
import { SearchEmitter } from "../../models/searchEmitter";

@Component({
  selector: "nav-letter",
  templateUrl: "nav-letter.component.html"
})
export class NavLetterComponent implements OnInit {
  letterNavList: string[];
  //passing events up - could want to search by letter - could want to show search
  @Output() getDrinks = new EventEmitter<SearchEmitter>();
  @Output() showSearch = new EventEmitter<boolean>();

  getDrinksByLetter(letter: string) {
    this.showSearch.emit(false);
    this.getDrinks.emit({
      type: "name",
      value: letter,
      status: this.getStatusString(letter),
      currentPage: 0
    });
  }

  showSearchScreen() {
    this.showSearch.emit(true);
  }

  private getStatusString(letter) {
    if (letter === "99") return "a number";
    else return "the letter " + letter.toLowerCase();
  }

  constructor() {
    this.letterNavList = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ];
  }

  ngOnInit() {}
}
