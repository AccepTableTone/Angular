//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
//project
import { AppComponent } from './app.component';
import {NavLetterComponent} from './components/nav-letter/nav-letter.component';
import {NavCategoryComponent} from './components/nav-category/nav-category.component';
import {DrinkComponent} from './components/drink/drink.component';
import {DrinkListComponent} from './components/drink-list/drink-list.component';
import {SearchComponent} from './components/search/search.component';

import {DrinkService} from "./services/drink/drink.service";

@NgModule({
  declarations: [
    AppComponent,
    NavLetterComponent,
    DrinkComponent,
    NavCategoryComponent,
    DrinkListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DrinkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
