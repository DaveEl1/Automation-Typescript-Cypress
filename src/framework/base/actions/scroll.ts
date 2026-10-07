import type { Element } from '../i-page';

export function scrollToElement(element: Element): Element {
  return element.scrollIntoView();
}

export function scrollToPosition(position: string = 'top'): void {
  cy.scrollTo(position);
}
