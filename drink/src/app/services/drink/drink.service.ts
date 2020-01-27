import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ApiResponse } from "../../models/apiResponse";
import { Observable } from "rxjs/Observable";
import { SearchEmitter } from "../../models/searchEmitter";

@Injectable()
export class DrinkService {
  drinkCount: number = 10;
  private searchApiBase: string =
    "http://drinksapi.acceptabletone.com/api/drink";

  currentSearchPage = 0;
  isLoading = false;
  lastSearch = null;

  getDrinks(searchRequest: SearchEmitter): Observable<ApiResponse> {
    if (!searchRequest && !this.lastSearch) {
      return null;
    }
    /**if no searchRequest was passed in then we want more of the current search
     * set the page we want and request again
     */
    let theSearchRequest = searchRequest;
    if (!searchRequest) {
      theSearchRequest = this.lastSearch;
      theSearchRequest.currentPage = theSearchRequest.currentPage + 1;
    }
    this.currentSearchPage = theSearchRequest.currentPage;

    return theSearchRequest.type === "search"
      ? this.getDrinksByKeyword(theSearchRequest)
      : this.getByNameOrCategoryDrinks(theSearchRequest);
  }

  toggleIsLoading = () => {
    this.isLoading = !this.isLoading;
  };

  //observables can keep listening - not needed in this scenario - its how angular rolls o-[../]-o
  private getByNameOrCategoryDrinks(
    searchRequest: SearchEmitter
  ): Observable<ApiResponse> {
    this.lastSearch = searchRequest;
    return this.http.get<ApiResponse>(
      `${this.searchApiBase}/${searchRequest.type}/${searchRequest.value}/${searchRequest.currentPage}/${this.drinkCount}`
    );
  }

  private getDrinksByKeyword(searchRequest: SearchEmitter) {
    this.lastSearch = searchRequest;
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    const apiUrl = `${this.searchApiBase}/${searchRequest.type}`;
    const searchObj = {
      Keywords: searchRequest.value,
      Page: searchRequest.currentPage,
      DrinkCount: this.drinkCount
    };
    return this.http.post<ApiResponse>(apiUrl, searchObj, httpOptions);
  }

  constructor(private http: HttpClient) {}
}
