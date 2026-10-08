import { BaseCoordinator } from '../../base/base-coordinator';
import type { ValidationResult } from '../../base/validation-result';
import { RADIO_OPTIONS, UiElementsActor, type RadioOption } from './ui-elements-actor';
import type { UiElementsPage } from './ui-elements-page';
import { UiElementsValidator } from './ui-elements-validator';

export class UiElementsCoordinator extends BaseCoordinator<UiElementsPage> {
  private readonly actor: UiElementsActor;
  private readonly validator: UiElementsValidator;

  constructor(page: UiElementsPage) {
    super(page);
    this.actor = new UiElementsActor(page.locators);
    this.validator = new UiElementsValidator(page.locators);
  }

  open(): void {
    this.page.goToSection();
  }

  verifyTextFieldEchoesTypedText(text: string): void {
    this.open();
    this.actor.typeIntoTextField(text);
    this.expectValid(this.validator.textFieldOutputMatches(text));
  }

  verifyPasswordFieldMasksSecret(secret: string): void {
    this.open();
    this.actor.enterPassword(secret);
    this.expectValid(this.validator.passwordFieldMasksSecret());
  }

  verifyCheckboxOutputTracksState(): void {
    this.open();
    this.actor.toggleCheckbox(false);
    this.expectValid(this.validator.checkboxOutputShows(false));
    this.actor.toggleCheckbox(true);
    this.expectValid(this.validator.checkboxOutputShows(true));
  }

  verifyRadioGroupTracksEachSelection(options: readonly RadioOption[] = RADIO_OPTIONS): void {
    this.open();
    for (const option of options) {
      this.actor.selectRadioOption(option);
      this.expectValid(this.validator.radioOutputShows(option));
    }
  }

  private expectValid(result: Cypress.Chainable<ValidationResult>): void {
    result.should((value) => {
      expect(value.passed, value.message).to.equal(true);
    });
  }
}
