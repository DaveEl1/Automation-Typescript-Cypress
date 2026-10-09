import type { Element } from '../../base/i-page';
import { BaseValidator } from '../../base/base-validator';
import { getValue } from '../../base/actions/get-value';
import { readText } from '../../base/actions/read-text';
import { ValidationResult } from '../../base/validation-result';
import type { FormsLocators } from './forms-locators';

export class FormsValidator extends BaseValidator<FormsLocators> {
  signInResultShows(message: string): Cypress.Chainable<ValidationResult> {
    return this.resultShows(this.locators.signInResult(), message, 'Sign in');
  }

  registrationResultShows(message: string): Cypress.Chainable<ValidationResult> {
    return this.resultShows(this.locators.registrationResult(), message, 'Create account');
  }

  contactResultShows(message: string): Cypress.Chainable<ValidationResult> {
    return this.resultShows(this.locators.contactResult(), message, 'Contact us');
  }

  subscriptionResultShows(message: string): Cypress.Chainable<ValidationResult> {
    return this.resultShows(this.locators.subscriptionResult(), message, 'Choose a plan');
  }

  paymentResultShows(message: string): Cypress.Chainable<ValidationResult> {
    return this.resultShows(this.locators.paymentResult(), message, 'Card payment');
  }

  surveyResultShows(message: string): Cypress.Chainable<ValidationResult> {
    return this.resultShows(this.locators.surveyResult(), message, 'Quick feedback');
  }

  settingsResultShows(message: string): Cypress.Chainable<ValidationResult> {
    return this.resultShows(this.locators.settingsResult(), message, 'Account settings');
  }

  searchResultShows(message: string): Cypress.Chainable<ValidationResult> {
    return this.resultShows(this.locators.searchResult(), message, 'Search & filter');
  }

  contactSubjectSelects(subject: string): Cypress.Chainable<ValidationResult> {
    return getValue(this.locators.contactSubject()).then((value) =>
      value === subject
        ? ValidationResult.ok(`contact subject select shows "${subject}"`)
        : ValidationResult.fail(`contact subject select shows "${value}", expected "${subject}"`),
    );
  }

  private resultShows(
    element: Element,
    expected: string,
    label: string,
  ): Cypress.Chainable<ValidationResult> {
    return readText(element).then((text) =>
      text === expected
        ? ValidationResult.ok(`${label} result shows "${expected}"`)
        : ValidationResult.fail(`${label} result shows "${text}", expected "${expected}"`),
    );
  }
}
