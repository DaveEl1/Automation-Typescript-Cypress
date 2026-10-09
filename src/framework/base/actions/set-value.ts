import type { Element } from '../i-page';

export function setValue(element: Element, value: string | number): void {
  element.then(($el) => {
    const input = $el[0] as HTMLInputElement;
    const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    if (nativeSetter) {
      nativeSetter.call(input, String(value));
    } else {
      input.value = String(value);
    }
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
}
