import type { Element } from '../i-page';

export function readText(element: Element): Cypress.Chainable<string> {
  return element.invoke('text').then((text: string) => text.trim());
}
