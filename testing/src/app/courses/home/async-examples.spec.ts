import { fakeAsync, tick, flush, flushMicrotasks } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

/** default test timeout is 5 seconds */

describe("Async testing example", () => {
  /** NEEDS AN EXPLANATION  e!--[../] */
  it("Asynchronous example - observable", fakeAsync(() => {
    let test = false;
    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    /** flush doesn't work ?? find out why - delay isn't in the task or microtask queue*/
    //flush();
    tick(1000);

    expect(test).toBeTruthy();
  }));

  it("Asynchronous test - task and microtask - setTimeout and Promise", fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);
    /** flush promise - expecting 10 */
    flushMicrotasks();
    expect(counter).toBe(10);

    flush();
    expect(counter).toBe(11);
  }));

  it("Asynchronous test - Promise", fakeAsync(() => {
    let test = false;

    Promise.resolve()
      .then(() => {
        return Promise.resolve();
      })
      .then(() => {
        test = true;
      });

    flushMicrotasks();

    expect(test).toBeTruthy();
  }));

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
