import { TestBed, inject } from '@angular/core/testing';

import { DrinkListComponent } from './drink-list.component';

describe('a drink-list component', () => {
	let component: DrinkListComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DrinkListComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([DrinkListComponent], (DrinkListComponent) => {
		component = DrinkListComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});