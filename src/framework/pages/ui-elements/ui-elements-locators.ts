import { BaseLocators } from '../../base/base-locators';

export type RadioValue = 'monthly' | 'quarterly' | 'annual';

const RADIO_TEST_IDS: Record<RadioValue, string> = {
  monthly: 'ui-radio-monthly',
  quarterly: 'ui-radio-quarterly',
  annual: 'ui-radio-annual',
};

export class UiElementsLocators extends BaseLocators {
  textFieldInput() {
    return this.page.getByTestId('ui-text-field');
  }

  textFieldOutput() {
    return this.page.getByTestId('ui-output-text-field');
  }

  passwordField() {
    return this.page.getByTestId('ui-password-input');
  }

  passwordToggleVisibility() {
    return this.page.getByTestId('ui-password-toggle-visibility');
  }

  checkbox() {
    return this.page.getByTestId('ui-single-checkbox');
  }

  checkboxOutput() {
    return this.page.getByTestId('ui-output-single-checkbox');
  }

  radioOption(value: RadioValue) {
    return this.page.getByTestId(RADIO_TEST_IDS[value]);
  }

  radioOutput() {
    return this.page.getByTestId('ui-radio-group-output');
  }
}
