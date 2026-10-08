import type { IPage } from '../../base/i-page';
import { BasePage } from '../../base/base-page';
import { createPage } from '../../base/page-factory';
import { UiElementsLocators } from './ui-elements-locators';

export class UiElementsPage extends BasePage<UiElementsLocators> {
  constructor(page: IPage = createPage(cy)) {
    super(page, new UiElementsLocators(page));
  }

  protected sectionNavButtonName(): string {
    return 'UI Elements';
  }
}
