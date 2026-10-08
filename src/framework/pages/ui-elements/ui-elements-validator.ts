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

  passwordFieldMasksSecret(): Cypress.Chainable<ValidationResult> {
    return this.locators.passwordField()
      .invoke('attr', 'type')
      .then((type) =>
        type === 'password'
          ? ValidationResult.ok('Password field masks its value (input type="password")')
          : ValidationResult.fail(`Expected input type "password", but found "${type}"`),
      );
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
