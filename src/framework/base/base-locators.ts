import type { Element, IPage } from './i-page';

export abstract class BaseLocators {
  protected readonly page: IPage;

  constructor(page: IPage) {
    this.page = page;
  }

  sectionNavButton(name: string): Element {
    return this.page.getByRole('button', name);
  }
}
