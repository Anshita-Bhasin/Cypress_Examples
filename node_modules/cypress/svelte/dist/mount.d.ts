/// <reference types="cypress" />
/// <reference types="cypress" />
import { StyleOptions } from '@cypress/mount-utils';
import type { ComponentConstructorOptions, ComponentProps, SvelteComponent } from 'svelte';
declare type SvelteConstructor<T> = new (...args: any[]) => T;
declare type SvelteComponentOptions<T extends SvelteComponent> = Omit<ComponentConstructorOptions<ComponentProps<T>>, 'hydrate' | 'target' | '$$inline'>;
export interface MountOptions<T extends SvelteComponent> extends SvelteComponentOptions<T>, Partial<StyleOptions> {
    log?: boolean;
}
export interface MountReturn<T extends SvelteComponent> {
    component: T;
}
/**
 * Mounts a Svelte component inside the Cypress browser
 *
 * @param {SvelteConstructor<T>} Component Svelte component being mounted
 * @param {MountReturn<T extends SvelteComponent>} options options to customize the component being mounted
 * @returns Cypress.Chainable<MountReturn>
 *
 * @example
 * import Counter from './Counter.svelte'
 * import { mount } from 'cypress/svelte'
 *
 * it('should render', () => {
 *   mount(Counter, { props: { count: 42 } })
 *   cy.get('button').contains(42)
 * })
 */
export declare function mount<T extends SvelteComponent>(Component: SvelteConstructor<T>, options?: MountOptions<T>): Cypress.Chainable<MountReturn<T>>;
export {};
