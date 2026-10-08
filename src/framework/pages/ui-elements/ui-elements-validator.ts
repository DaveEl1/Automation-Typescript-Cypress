import type { Element } from '../../base/i-page';
import { BaseValidator } from '../../base/base-validator';
import { readText } from '../../base/actions/read-text';
import { ValidationResult } from '../../base/validation-result';
import { RADIO_LABELS, type RadioOption } from './ui-elements-actor';
import type { UiElementsLocators } from './ui-elements-locators';

export class UiElementsValidator extends BaseValidator<UiElementsLocators> {
  textFieldOutputMatches(expected: string): Cypress.Chainable<ValidationResult> {
    return this.outputShows(this.locators.textFieldOutput(), expected, 'text field');
  }

  numberInputOutputShows(value: number): Cypress.Chainable<ValidationResult> {
    return this.outputShows(this.locators.numberInputOutput(), String(value), 'number input');
  }

  passwordOutputIsMasked(): Cypress.Chainable<ValidationResult> {
    return readText(this.locators.passwordOutput()).then((text) => {
      const masked = text.length > 0 && /^•+$/.test(text);
      return masked
        ? ValidationResult.ok('Password output is fully masked')
        : ValidationResult.fail(`Expected a masked password, but the output shows "${text}"`);
    });
  }

  checkboxOutputShows(checked: boolean): Cypress.Chainable<ValidationResult> {
    const expected = checked ? 'Checked' : 'Unchecked';
    return this.outputShows(this.locators.checkboxOutput(), expected, 'checkbox');
  }

  radioOutputShows(option: RadioOption): Cypress.Chainable<ValidationResult> {
    return this.outputShows(this.locators.radioOutput(), RADIO_LABELS[option], 'radio group');
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
