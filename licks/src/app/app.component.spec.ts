import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { TabComponent } from "./components/tab/tab.component";
import { PlayerComponent } from "./components/player/player.component";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, TabComponent, PlayerComponent]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'LICKS & STUFF'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("LICKS & STUFF");
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".title-container").textContent).toContain(
      "LICKS & STUFF"
    );
  });
});
