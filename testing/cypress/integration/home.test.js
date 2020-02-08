/** NOTE npm run cypress:open */

describe("Home Page", () => {
  beforeEach(() => {
    /**routing event */
    cy.fixture("courses.json").as("coursesJSON");
    /** start mock backend server */
    cy.server();

    /** substitute fixture json as the response from api url - then name it */
    cy.route("/api/courses", "@coursesJSON").as("courses");

    /** go to the home page and look for 'all courses' */
    cy.visit("/");
  });

  it("should display list of courses", () => {
    cy.contains("All Courses");

    /** wait for the course data from @coursesJSON */
    cy.wait("@courses");

    /** confirm */
    cy.get("mat-card").should("have.length", 9);
  });

  it("should display advanced course", () => {
    /** find the 2 tabs */
    cy.get(".mat-tab-label").should("have.length", 2);
    /** click the advanced link - cypress handles the asynchronous part caused by the animation */
    cy.get(".mat-tab-label")
      .last()
      .click();
    /** check that we have more than one card title */
    cy.get(".mat-tab-body-active .mat-card-title")
      .its("length")
      .should("be.gt", 1);
    /** check the title of the first card */
    cy.get(".mat-tab-body-active .mat-card-title")
      .first()
      .should("contain", "Angular Security Course");
  });
});
