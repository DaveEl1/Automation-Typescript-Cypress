import type { Element } from '../i-page';

export function attachFile(element: Element, filePath: string): void {
  element.selectFile(filePath);
}
