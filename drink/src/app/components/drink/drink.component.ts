//angualr
import { Component, OnInit } from "@angular/core";
//project
import { DrinkService } from "../../services/drink/drink.service";
import { Drink } from "../../models/drink";
import { SearchEmitter } from "../../models/searchEmitter";

@Component({
  selector: "app-drink",
  templateUrl: "drink.component.html"
})

//top component
export class DrinkComponent implements OnInit {
  statusString: string;
  backgroundImage: string;
  drinkList: Drink[];
  searchIsShowing: boolean;

  constructor(private drinkService: DrinkService) {
    this.statusString = "";
    this.drinkList = null;
    this.searchIsShowing = false;

    this.setBackgroundImage();
  }
  //set header status label
  private changeStatusString(newStatus: string) {
    this.statusString = newStatus;
  }

  //hide or show seach form
  setSearchVisibility(isVisible: boolean) {
    this.searchIsShowing = isVisible;
    if (isVisible) {
      this.drinkList = null;
      this.statusString = "search";
    }
  }
  //apply loader spinner status
  getLoaderStatus() {
    return this.drinkService.isLoading
      ? "drink-icon fa fa-glass fa-spin"
      : "drink-icon fa fa-glass";
  }
  //pick background image on initial load
  private setBackgroundImage() {
    this.backgroundImage =
      "/assets/backgrounds/drinkbg" +
      (Math.floor(Math.random() * 5) + 1) +
      ".jpg";
  }
  getDrinks(request: SearchEmitter) {
    this.drinkService.toggleIsLoading();
    this.drinkList = null;
    if (!!request) {
      this.statusString = request.status;
    }

    this.drinkService.getDrinks(request).subscribe(
      res => {
        this.drinkList = res.Content;
        this.drinkService.toggleIsLoading();
        this.setSearchVisibility(false);
      },
      err => {
        this.drinkList = null;
        this.drinkService.toggleIsLoading();
        this.statusString = "error :(";
      }
    );
  }

  ngOnInit() {}
}
