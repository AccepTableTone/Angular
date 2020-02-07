import { fakeAsync, tick, flush } from "@angular/core/testing";

/** default test timeout is 5 seconds */

fdescribe("Async testing example", () => {
  /** 'zones' are chunks of code to be executed post async  */
  it("Asynchronous test example with angular fake async utility", fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      test = true;
    }, 1000);
    /** 'tick' can only be called in fakeAsync zone */
    //tick(1000);

    /** if we wanted all timers to be executed we call 'flush' */
    flush();
    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example with jasmine done()", (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });
});
