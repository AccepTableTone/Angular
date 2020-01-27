import { TestBed, inject } from '@angular/core/testing';

import { DrinkComponent } from './drink.component';

describe('a drink component', () => {
	let component: DrinkComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DrinkComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([DrinkComponent], (DrinkComponent) => {
		component = DrinkComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});