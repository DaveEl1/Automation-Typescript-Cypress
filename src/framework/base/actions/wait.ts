import type { Element } from '../i-page';

export function waitForVisible(element: Element): Element {
  return element.should('be.visible');
}

export function waitForEnabled(element: Element): Element {
  return element.should('be.enabled');
}
