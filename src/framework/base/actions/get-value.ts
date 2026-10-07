import type { Element } from '../i-page';

export function getValue(element: Element): Cypress.Chainable<string> {
  return element
    .invoke('val')
    .then((value: unknown) => (value === null || value === undefined ? '' : String(value)));
}
