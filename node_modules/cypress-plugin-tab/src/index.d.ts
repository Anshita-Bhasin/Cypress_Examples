/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		tab(options?: Partial<{shift: Boolean}>): Chainable
	}
}
