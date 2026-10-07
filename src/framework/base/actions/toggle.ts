import type { Element } from '../i-page';

export function setChecked(element: Element, checked = true): void {
  if (checked) {
    element.check();
  } else {
    element.uncheck();
  }
}
