import { CoursesService } from "./courses.service";
import { async, TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { Course } from "../model/course";
import {
  COURSES,
  LESSONS,
  findLessonsForCourse
} from "../../../../server/db-data";
import { HttpErrorResponse } from "@angular/common/http";
import { request } from "express";

describe("CourseService", () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });

    coursesService = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  /**find lessons */
  it("Should find a list of lessons", () => {
    coursesService.findLessons(12).subscribe(lessons => {
      expect(lessons).toBeTruthy("no lessons returned");
      expect(lessons.length).toBe(3);
    });

    const request = httpTestingController.expectOne(
      req => req.url === "/api/lessons"
    );
    expect(request.request.method).toEqual("GET");

    expect(request.request.params.get("courseId")).toEqual("12");
    expect(request.request.params.get("filter")).toEqual("");
    expect(request.request.params.get("sortOrder")).toEqual("asc");
    expect(request.request.params.get("pageNumber")).toEqual("0");
    expect(request.request.params.get("pageSize")).toEqual("3");

    request.flush({
      payload: findLessonsForCourse(12).slice(0, 3)
    });
  });

  /** saving course test */
  it("should save course data", () => {
    const changes: Partial<Course> = {
      titles: { description: "Testing Course" }
    };
    coursesService.saveCourse(12, changes).subscribe(changedCourse => {
      expect(changedCourse.id).toBe(12);
    });

    const request = httpTestingController.expectOne("/api/courses/12");
    expect(request.request.method).toEqual("PUT");
    expect(request.request.body.titles.description).toEqual(
      changes.titles.description
    );

    request.flush({
      ...COURSES[12],
      ...changes
    });
  });

  it("Should give error if saved course failed", () => {
    const changes: Partial<Course> = {
      titles: { description: "Testing Course" }
    };

    coursesService.saveCourse(12, changes).subscribe(
      () => fail("Save course call should have failed"),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpTestingController.expectOne("/api/courses/12");
    expect(req.request.method).toEqual("PUT");

    req.flush("Save course failed", {
      status: 500,
      statusText: "Internal Save Error"
    });
  });

  it("should retrieve all courses", () => {
    coursesService.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy("No courses returned");
      expect(courses.length).toBe(12, "Incorrect number of courses");

      const course: Course = courses.find(f => f.id === 12);
      expect(course.titles.description === "Angular Testing Course");
    });

    const request = httpTestingController.expectOne("/api/courses");
    expect(request.request.method).toEqual("GET");

    request.flush({
      payload: Object.values(COURSES)
    });
  });

  it("should find a course by it's identifier", () => {
    coursesService.findCourseById(12).subscribe(singleCourse => {
      expect(singleCourse).toBeTruthy("No course returned");

      expect(singleCourse.titles.description === "Angular Testing Course");
    });

    const request = httpTestingController.expectOne("/api/courses/12");
    expect(request.request.method).toEqual("GET");

    request.flush(COURSES[12]);
  });

  afterEach(() => {
    /** checks that no other HTTP requests are made */
    httpTestingController.verify();
  });
});
