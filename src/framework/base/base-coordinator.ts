import type { BasePage } from './base-page';
import type { BaseLocators } from './base-locators';

export abstract class BaseCoordinator<TPage extends BasePage<BaseLocators>> {
  protected readonly page: TPage;

  constructor(page: TPage) {
    this.page = page;
  }
}
