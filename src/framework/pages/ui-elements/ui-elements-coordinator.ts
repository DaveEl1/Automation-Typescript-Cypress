import { BaseCoordinator } from '../../base/base-coordinator';
import type { ValidationResult } from '../../base/validation-result';
import { UiElementsActor, type RadioOption } from './ui-elements-actor';
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

  verifyNumberInputShowsEnteredValue(value: number): void {
    this.open();
    this.actor.setNumberInput(value);
    this.expectValid(this.validator.numberInputOutputShows(value));
  }

  verifyPasswordFieldMasksSecret(secret: string): void {
    this.open();
    this.actor.enterPassword(secret);
    this.expectValid(this.validator.passwordOutputIsMasked());
  }

  verifyCheckboxOutputTracksState(): void {
    this.open();
    this.actor.toggleCheckbox(true);
    this.expectValid(this.validator.checkboxOutputShows(true));
    this.actor.toggleCheckbox(false);
    this.expectValid(this.validator.checkboxOutputShows(false));
  }

  verifyRadioGroupUpdatesOutput(option: RadioOption): void {
    this.open();
    this.actor.selectRadioOption(option);
    this.expectValid(this.validator.radioOutputShows(option));
  }

  private expectValid(result: Cypress.Chainable<ValidationResult>): void {
    result.should((value) => {
      expect(value.passed, value.message).to.equal(true);
    });
  }
}
