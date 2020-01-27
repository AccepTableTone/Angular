import { TestBed, inject } from '@angular/core/testing';

import { NavCategoryComponent } from './nav-category.component';

describe('a nav-category component', () => {
	let component: NavCategoryComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				NavCategoryComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([NavCategoryComponent], (NavCategoryComponent) => {
		component = NavCategoryComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});