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

  dropdown() {
    return this.page.getByTestId('ui-single-dropdown');
  }

  dropdownOutput() {
    return this.page.getByTestId('ui-output-single-dropdown');
  }

  slider() {
    return this.page.getByTestId('ui-slider');
  }

  sliderOutput() {
    return this.page.getByTestId('ui-slider-output');
  }

  toggleSwitch() {
    return this.page.getByTestId('ui-toggle-switch');
  }

  toggleSwitchOutput() {
    return this.page.getByTestId('ui-output-toggle-switch');
  }

  dateInput() {
    return this.page.getByTestId('ui-date-input');
  }

  dateOutput() {
    return this.page.getByTestId('ui-date-output');
  }

  textArea() {
    return this.page.getByTestId('ui-text-area');
  }

  textAreaOutput() {
    return this.page.getByTestId('ui-text-area-output');
  }

  fileUploadInput() {
    return this.page.getByTestId('ui-file-upload');
  }

  fileUploadItem(index: number) {
    return this.page.getByTestId(`ui-file-upload-item-${index}`);
  }

  fileUploadClearButton() {
    return this.page.getByTestId('ui-file-upload-clear-button');
  }

  fileUploadListSelector() {
    return '[data-testid="ui-file-upload-list"]';
  }
}
