import { BaseLocators } from './base-locators';

export abstract class BaseValidator<TLocators extends BaseLocators> {
  protected readonly locators: TLocators;

  constructor(locators: TLocators) {
    this.locators = locators;
  }
}
