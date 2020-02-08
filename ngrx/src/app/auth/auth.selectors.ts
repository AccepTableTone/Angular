import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

/** feature selectors are a type safe selectors*/
export const selectAuthState = createFeatureSelector<AuthState>("auth");

/** mapping function that has memory - memoized function */
export const isLoggedIn = createSelector(
  selectAuthState /**mapping function */,
  authState => !!authState.user
);

export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);
