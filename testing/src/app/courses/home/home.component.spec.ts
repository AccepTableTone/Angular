import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed
} from "@angular/core/testing";
import { CoursesModule } from "../courses.module";
import { DebugElement } from "@angular/core";

import { HomeComponent } from "./home.component";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { CoursesService } from "../services/courses.service";
import { HttpClient } from "@angular/common/http";
import { COURSES } from "../../../../server/db-data";
import { setupCourses } from "../common/setup-test-data";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { click } from "../common/test-utils";

describe("HomeComponent", () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;

  let coursesService: any;

  const allCourses = setupCourses();
  const beginnerCourses = allCourses.filter(f => f.category === "BEGINNER");
  const advancedCourses = allCourses.filter(f => f.category === "ADVANCED");

  const courseServiceSpy = jasmine.createSpyObj("CoursesService", [
    "findAllCourses"
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule, NoopAnimationsModule],
      providers: [{ provide: CoursesService, useValue: courseServiceSpy }]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.get(CoursesService);
      });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display only beginner courses", () => {
    /** 'of' creates an observable  */
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });

  it("should display only advanced courses", () => {
    /** 'of' creates an observable - everything is synchronous */
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });

  it("should display both tabs", () => {
    /** 'of' creates an observable - everything is synchronous */
    coursesService.findAllCourses.and.returnValue(of(allCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(2, "Unexpected number of tabs found");
  });

  it("should display advanced courses when tab clicked", fakeAsync(() => {
    coursesService.findAllCourses.and.returnValue(of(allCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    /**use the testing utility function */
    click(tabs[1]);

    /** there is a ui animation - so detecting changes here isn't useful */
    /** !! need to detect before flushing task queue */
    fixture.detectChanges();

    /** there must be some waiting code on the UI - requestAnimationFrame? - so we want to flush that task queue */
    /** you could try flushMicrotasks - here it does not work so its a settimeout or
     * requestAnimationFrame - but might in others - flush is the biggest catch */
    flush();

    const cardTitles = el.queryAll(By.css(".mat-card-title"));

    expect(cardTitles.length).toBeGreaterThan(0, "Could not find any titles");

    expect(cardTitles[0].nativeElement.textContent).toContain(
      "Angular Security Course"
    );
  }));
});
