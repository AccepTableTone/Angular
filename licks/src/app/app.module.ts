import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { PlayerComponent } from "./components/player/player.component";
import { TabComponent } from "./components/tab/tab.component";

@NgModule({
  declarations: [AppComponent, PlayerComponent, TabComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
