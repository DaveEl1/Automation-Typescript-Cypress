import type { Element } from '../i-page';

export function getAttribute(element: Element, name: string): Cypress.Chainable<string | null> {
  return element.invoke('attr', name).then((value) => value as string | null);
}
