import { createSelector } from "@ngrx/store";

/** mapping function that has memory - memoized function */
export const isLoggedIn = createSelector(
  state => state["auth"] /**mapping function */,
  authState => !!authState.user
);

export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);
