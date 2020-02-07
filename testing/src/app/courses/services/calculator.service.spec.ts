import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";
import { async, TestBed } from "@angular/core/testing";

// xdescribe - ignore this suite
// fdescribe - just do this suite
// xit - bypass this test
// fit - just do that test - ignore the others

describe("CalculatorService", () => {
  let calculator: CalculatorService, loggerSpy: any;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    });
    calculator = TestBed.get(CalculatorService);
  });

  /**specification --->*/
  it("should add two numbers", () => {
    /**we are going to create a jasmine spy - we are going to count the number of times the logger is called*/
    // const logger = new LoggerService();
    // const logger = jasmine.createSpyObj("LoggerService", ["log"]);

    /**we should have mock instances of dependencies - we are testing the calculator service ('unit test') - not the logger*/
    // we created a spy object - so the spyOn is no longer needed
    // spyOn(logger, "log");

    // const calculator = new CalculatorService(logger);
    const result = calculator.add(2, 2);

    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, "unexpected subtraction result");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
