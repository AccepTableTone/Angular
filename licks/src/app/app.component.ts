import { Component, OnInit } from "@angular/core";
import { lickStore } from "./data/lickStore";
import { LickData } from "./data/lickStore";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "LICKS & STUFF";

  currentTabFile: string = "";
  currentAudioFile: string = "";

  currentDataIndex: number = 0;
  lickDataIsLoaded = false;

  maxLickNumber = 0;
  lickData: LickData[] = [];
  lickStore = null;

  ngOnInit() {
    /** get the list of lick - reverse it so new ones are at the end */
    this.lickData = lickStore.getLickData();
    this.lickData.reverse();
    this.maxLickNumber = this.lickData.length - 1;
    this.setFiles();
  }

  setFiles = () => {
    this.currentTabFile = this.lickData[this.currentDataIndex].tab;
    this.currentAudioFile = this.lickData[this.currentDataIndex].audio;
  };

  setNextLick = () => {
    /** if user has clicked to the end loop around to the first lick - and vica versa  */
    if (this.currentDataIndex === this.maxLickNumber) {
      this.currentDataIndex = 0;
    } else {
      this.currentDataIndex = this.currentDataIndex + 1;
    }
    this.setFiles();
  };

  setPreviousLick = () => {
    if (this.currentDataIndex === 0) {
      this.currentDataIndex = this.maxLickNumber;
    } else {
      this.currentDataIndex = this.currentDataIndex - 1;
    }
    this.setFiles();
  };
}
