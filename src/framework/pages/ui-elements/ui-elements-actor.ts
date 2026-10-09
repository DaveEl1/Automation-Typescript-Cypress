import { BaseActor } from '../../base/base-actor';
import { attachFile } from '../../base/actions/attach-file';
import { clearField } from '../../base/actions/clear-field';
import { click } from '../../base/actions/click';
import { selectOption } from '../../base/actions/select';
import { setValue } from '../../base/actions/set-value';
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

export const COUNTRY_OPTIONS = ['US', 'Canada', 'UK', 'India', 'Australia'] as const;
export type CountryOption = (typeof COUNTRY_OPTIONS)[number];

export const UPLOAD_FIXTURE_PATH = 'cypress/fixtures/upload-note.txt';

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

  selectCountry(option: CountryOption): void {
    selectOption(this.locators.dropdown(), option);
  }

  resetDropdown(): void {
    selectOption(this.locators.dropdown(), '');
  }

  setSlider(value: number): void {
    setValue(this.locators.slider(), value);
  }

  toggleSwitch(on: boolean): void {
    setChecked(this.locators.toggleSwitch(), on, { force: true });
  }

  selectDate(isoDate: string): void {
    setValue(this.locators.dateInput(), isoDate);
  }

  clearDate(): void {
    setValue(this.locators.dateInput(), '');
  }

  typeIntoTextArea(text: string): void {
    typeText(this.locators.textArea(), text);
  }

  clearTextArea(): void {
    clearField(this.locators.textArea());
  }

  attachFileToUpload(filePath: string): void {
    attachFile(this.locators.fileUploadInput(), filePath);
  }

  clearUploadedFiles(): void {
    click(this.locators.fileUploadClearButton());
  }
}
