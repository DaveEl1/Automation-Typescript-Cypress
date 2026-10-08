import { BaseActor } from '../../base/base-actor';
import { click } from '../../base/actions/click';
import { setChecked } from '../../base/actions/toggle';
import { typeText } from '../../base/actions/type-text';
import type { UiElementsLocators } from './ui-elements-locators';

export const RADIO_OPTIONS = ['option-a', 'option-b'] as const;
export type RadioOption = (typeof RADIO_OPTIONS)[number];

export const RADIO_LABELS: Record<RadioOption, string> = {
  'option-a': 'Option A',
  'option-b': 'Option B',
};

export class UiElementsActor extends BaseActor<UiElementsLocators> {
  typeIntoTextField(text: string): void {
    typeText(this.locators.textFieldInput(), text);
  }

  setNumberInput(value: number): void {
    typeText(this.locators.numberInput(), String(value));
  }

  enterPassword(secret: string): void {
    typeText(this.locators.passwordField(), secret);
  }

  toggleCheckbox(checked = true): void {
    setChecked(this.locators.checkbox(), checked);
  }

  selectRadioOption(option: RadioOption): void {
    click(this.locators.radioOption(option));
  }
}
