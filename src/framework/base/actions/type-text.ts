import type { Element } from '../i-page';

export function typeText(element: Element, text: string): void {
  element.clear().type(text);
}
