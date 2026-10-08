import { BaseActor } from '../../base/base-actor';
import { click } from '../../base/actions/click';
import { setChecked } from '../../base/actions/toggle';
import { typeText } from '../../base/actions/type-text';
import type { UiElementsLocators } from './ui-elements-locators';

export const RADIO_OPTIONS = ['monthly', 'quarterly', 'annual'] as const;
export type RadioOption = (typeof RADIO_OPTIONS)[number];

export const RADIO_LABELS: Record<RadioOption, string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  annual: 'Annual',
};

export class UiElementsActor extends BaseActor<UiElementsLocators> {
  typeIntoTextField(text: string): void {
    typeText(this.locators.textFieldInput(), text);
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
