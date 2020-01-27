import { TestBed, inject } from '@angular/core/testing';

import { NavLetterComponent } from './nav-letter.component';

describe('a nav-letter component', () => {
	let component: NavLetterComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				NavLetterComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([NavLetterComponent], (NavLetterComponent) => {
		component = NavLetterComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});