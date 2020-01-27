import { Component, Input, SimpleChanges, OnChanges } from "@angular/core";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"]
})
export class TabComponent implements OnChanges {
  @Input() fileUrl: string;

  tabImage = "";
  ngOnChanges() {
    this.tabImage = this.fileUrl;
  }
}
