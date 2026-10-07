import type { Element } from '../i-page';

export function selectOption(
  element: Element,
  option: string | number | Array<string | number>,
): void {
  element.select(option);
}
