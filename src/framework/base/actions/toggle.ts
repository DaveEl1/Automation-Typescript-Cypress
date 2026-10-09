import type { Element } from '../i-page';

export interface SetCheckedOptions {
  force?: boolean;
}

export function setChecked(
  element: Element,
  checked = true,
  options: SetCheckedOptions = {},
): void {
  if (checked) {
    element.check(options);
  } else {
    element.uncheck(options);
  }
}
