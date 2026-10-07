import type { Element, IPage } from './i-page';
import { BaseLocators } from './base-locators';
import { click } from './actions/click';

export abstract class BasePage<TLocators extends BaseLocators> {
  protected readonly page: IPage;
  public readonly locators: TLocators;

  constructor(page: IPage, locators: TLocators) {
    this.page = page;
    this.locators = locators;
  }

  visit(path: string): Element {
    return this.page.visit(path);
  }

  protected abstract sectionNavButtonName(): string;

  goToSection(): void {
    this.visit('/');
    click(this.locators.sectionNavButton(this.sectionNavButtonName()));
  }
}
