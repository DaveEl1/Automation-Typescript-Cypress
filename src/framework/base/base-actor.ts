import { BaseLocators } from './base-locators';

export abstract class BaseActor<TLocators extends BaseLocators> {
  protected readonly locators: TLocators;

  constructor(locators: TLocators) {
    this.locators = locators;
  }
}
