import type { Element } from '../../base/i-page';
import { BaseLocators } from '../../base/base-locators';

export class UiElementsLocators extends BaseLocators {
  textFieldInput(): Element {
    return this.page.getByTestId('text-field-input');
  }

  textFieldOutput(): Element {
    return this.page.getByTestId('text-field-output');
  }

  numberInput(): Element {
    return this.page.getByTestId('number-input');
  }

  numberInputOutput(): Element {
    return this.page.getByTestId('number-input-output');
  }

  passwordField(): Element {
    return this.page.getByTestId('password-field');
  }

  passwordOutput(): Element {
    return this.page.getByTestId('password-output');
  }

  checkbox(): Element {
    return this.page.getByTestId('checkbox');
  }

  checkboxOutput(): Element {
    return this.page.getByTestId('checkbox-output');
  }

  radioGroup(): Element {
    return this.page.getByTestId('radio-group');
  }

  radioOption(value: string): Element {
    return this.radioGroup().find(`input[type="radio"][value="${value}"]`);
  }

  radioOutput(): Element {
    return this.page.getByTestId('radio-output');
  }
}
