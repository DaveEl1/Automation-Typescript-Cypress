import type { IPage } from '../../base/i-page';
import { BasePage } from '../../base/base-page';
import { createPage } from '../../base/page-factory';
import { FormsLocators } from './forms-locators';

export class FormsPage extends BasePage<FormsLocators> {
  constructor(page: IPage = createPage(cy)) {
    super(page, new FormsLocators(page));
  }

  protected sectionNavButtonName(): string {
    return 'Forms';
  }
}
