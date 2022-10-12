/// <reference types="cypress" />
/// <reference types="cypress" />
import 'zone.js';
import 'zone.js/testing';
import { Type } from '@angular/core';
import { ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
/**
 * Additional module configurations needed while mounting the component, like
 * providers, declarations, imports and even component @Inputs()
 *
 *
 * @interface MountConfig
 * @see https://angular.io/api/core/testing/TestModuleMetadata
 */
export interface MountConfig<T> extends TestModuleMetadata {
    /**
     * @memberof MountConfig
     * @description flag to automatically create a cy.spy() for every component @Output() property
     * @example
     * export class ButtonComponent {
     *  @Output clicked = new EventEmitter()
     * }
     *
     * cy.mount(ButtonComponent, { autoSpyOutputs: true })
     * cy.get('@clickedSpy).should('have.been.called')
     */
    autoSpyOutputs?: boolean;
    /**
     * @memberof MountConfig
     * @description flag defaulted to true to automatically detect changes in your components
     */
    autoDetectChanges?: boolean;
    /**
     * @memberof MountConfig
     * @example
     * import { ButtonComponent } from 'button/button.component'
     * it('renders a button with Save text', () => {
     *  cy.mount(ButtonComponent, { componentProperties: { text: 'Save' }})
     *  cy.get('button').contains('Save')
     * })
     *
     * it('renders a button with a cy.spy() replacing EventEmitter', () => {
     *  cy.mount(ButtonComponent, {
     *    componentProperties: {
     *      clicked: cy.spy().as('mySpy)
     *    }
     *  })
     *  cy.get('button').click()
     *  cy.get('@mySpy').should('have.been.called')
     * })
     */
    componentProperties?: Partial<{
        [P in keyof T]: T[P];
    }>;
}
/**
 * Type that the `mount` function returns
 * @type MountResponse<T>
 */
export declare type MountResponse<T> = {
    /**
     * Fixture for debugging and testing a component.
     *
     * @memberof MountResponse
     * @see https://angular.io/api/core/testing/ComponentFixture
     */
    fixture: ComponentFixture<T>;
    /**
     * The instance of the root component class
     *
     * @memberof MountResponse
     * @see https://angular.io/api/core/testing/ComponentFixture#componentInstance
     */
    component: T;
};
/**
 * Mounts an Angular component inside Cypress browser
 *
 * @param {Type<T> | string} component Angular component being mounted or its template
 * @param {MountConfig<T>} config configuration used to configure the TestBed
 * @example
 * import { HelloWorldComponent } from 'hello-world/hello-world.component'
 * import { MyService } from 'services/my.service'
 * import { SharedModule } from 'shared/shared.module';
 * import { mount } from '@cypress/angular'
 * it('can mount', () => {
 *  mount(HelloWorldComponent, {
 *    providers: [MyService],
 *    imports: [SharedModule]
 *  })
 *  cy.get('h1').contains('Hello World')
 * })
 *
 * or
 *
 * it('can mount with template', () => {
 *  mount('<app-hello-world></app-hello-world>', {
 *    declarations: [HelloWorldComponent],
 *    providers: [MyService],
 *    imports: [SharedModule]
 *  })
 * })
 * @returns Cypress.Chainable<MountResponse<T>>
 */
export declare function mount<T>(component: Type<T> | string, config?: MountConfig<T>): Cypress.Chainable<MountResponse<T>>;
/**
 * Creates a new Event Emitter and then spies on it's `emit` method
 *
 * @param {string} alias name you want to use for your cy.spy() alias
 * @returns EventEmitter<T>
 */
export declare const createOutputSpy: <T>(alias: string) => any;
