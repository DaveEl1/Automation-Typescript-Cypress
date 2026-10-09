import type { Element } from '../../base/i-page';
import { BaseValidator } from '../../base/base-validator';
import { elementExists } from '../../base/actions/element-exists';
import { getAttribute } from '../../base/actions/get-attribute';
import { readText } from '../../base/actions/read-text';
import { ValidationResult } from '../../base/validation-result';
import { RADIO_LABELS, type CountryOption, type RadioOption } from './ui-elements-actor';
import type { UiElementsLocators } from './ui-elements-locators';

const OUTPUT_PREFIX = 'Output: ';
const RADIO_OUTPUT_PREFIX = 'Selected: ';
const FILE_CLEAR_BUTTON_LABEL = 'Clear files';

export class UiElementsValidator extends BaseValidator<UiElementsLocators> {
  textFieldOutputMatches(expected: string): Cypress.Chainable<ValidationResult> {
    return this.outputShows(
      this.locators.textFieldOutput(),
      `${OUTPUT_PREFIX}${expected}`,
      'text field',
    );
  }

  passwordFieldMasksSecret(): Cypress.Chainable<ValidationResult> {
    return getAttribute(this.locators.passwordField(), 'type').then((type) =>
      type === 'password'
        ? ValidationResult.ok('Password field masks its value (input type="password")')
        : ValidationResult.fail(`Expected input type "password", but found "${type}"`),
    );
  }

  checkboxOutputShows(checked: boolean): Cypress.Chainable<ValidationResult> {
    const expected = checked ? 'Checked' : 'Unchecked';
    return this.outputShows(
      this.locators.checkboxOutput(),
      `${OUTPUT_PREFIX}${expected}`,
      'checkbox',
    );
  }

  radioOutputShows(option: RadioOption): Cypress.Chainable<ValidationResult> {
    return this.outputShows(
      this.locators.radioOutput(),
      `${RADIO_OUTPUT_PREFIX}${RADIO_LABELS[option]}`,
      'radio group',
    );
  }

  dropdownOutputShows(option: CountryOption): Cypress.Chainable<ValidationResult> {
    return this.outputShows(
      this.locators.dropdownOutput(),
      `${OUTPUT_PREFIX}${option}`,
      'dropdown',
    );
  }

  dropdownOutputShowsDefault(): Cypress.Chainable<ValidationResult> {
    return this.outputShows(
      this.locators.dropdownOutput(),
      `${OUTPUT_PREFIX}No option selected`,
      'dropdown',
    );
  }

  sliderOutputShows(value: number): Cypress.Chainable<ValidationResult> {
    return this.outputShows(this.locators.sliderOutput(), `Value: ${value}`, 'slider');
  }

  switchOutputShows(on: boolean): Cypress.Chainable<ValidationResult> {
    const expected = on ? 'On' : 'Off';
    return this.outputShows(
      this.locators.toggleSwitchOutput(),
      `${OUTPUT_PREFIX}${expected}`,
      'toggle switch',
    );
  }

  dateOutputShows(isoDate: string): Cypress.Chainable<ValidationResult> {
    return this.outputShows(this.locators.dateOutput(), `Selected date: ${isoDate}`, 'date input');
  }

  dateOutputShowsNone(): Cypress.Chainable<ValidationResult> {
    return this.outputShows(this.locators.dateOutput(), 'No date selected', 'date input');
  }

  textAreaOutputShowsCharacterCount(count: number): Cypress.Chainable<ValidationResult> {
    return this.outputShows(this.locators.textAreaOutput(), `${count} characters`, 'text area');
  }

  fileListShows(fileName: string): Cypress.Chainable<ValidationResult> {
    return readText(this.locators.fileUploadItem(0)).then((text) =>
      text.includes(fileName)
        ? ValidationResult.ok(`file list shows "${fileName}"`)
        : ValidationResult.fail(`file list shows "${text}", expected it to include "${fileName}"`),
    );
  }

  fileListCleared(): Cypress.Chainable<ValidationResult> {
    return elementExists(this.locators.fileUploadListSelector()).then((exists) =>
      exists
        ? ValidationResult.fail('file upload list is still shown after clearing')
        : ValidationResult.ok('file upload list is gone after clearing'),
    );
  }

  clearButtonShowsLabel(): Cypress.Chainable<ValidationResult> {
    return readText(this.locators.fileUploadClearButton()).then((text) =>
      text === FILE_CLEAR_BUTTON_LABEL
        ? ValidationResult.ok(`clear button label is "${FILE_CLEAR_BUTTON_LABEL}"`)
        : ValidationResult.fail(
            `clear button label is "${text}", expected "${FILE_CLEAR_BUTTON_LABEL}"`,
          ),
    );
  }

  private outputShows(
    element: Element,
    expected: string,
    label: string,
  ): Cypress.Chainable<ValidationResult> {
    return readText(element).then((text) =>
      text === expected
        ? ValidationResult.ok(`${label} output shows "${expected}"`)
        : ValidationResult.fail(`${label} output shows "${text}", expected "${expected}"`),
    );
  }
}
