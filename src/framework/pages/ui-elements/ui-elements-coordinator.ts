import { BaseCoordinator } from '../../base/base-coordinator';
import type { ValidationResult } from '../../base/validation-result';
import {
  COUNTRY_OPTIONS,
  RADIO_OPTIONS,
  UPLOAD_FIXTURE_PATH,
  UiElementsActor,
  type CountryOption,
  type RadioOption,
} from './ui-elements-actor';
import type { UiElementsPage } from './ui-elements-page';
import { UiElementsValidator } from './ui-elements-validator';

function fileNameOf(filePath: string): string {
  return filePath.split(/[\\/]/).pop() ?? filePath;
}

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

  verifyDropdownTracksEachSelection(options: readonly CountryOption[] = COUNTRY_OPTIONS): void {
    this.open();
    for (const option of options) {
      this.actor.selectCountry(option);
      this.expectValid(this.validator.dropdownOutputShows(option));
    }
  }

  verifyDropdownResetsToDefault(): void {
    this.open();
    this.actor.selectCountry('US');
    this.expectValid(this.validator.dropdownOutputShows('US'));
    this.actor.resetDropdown();
    this.expectValid(this.validator.dropdownOutputShowsDefault());
  }

  verifySliderReflectsNewValue(value: number): void {
    this.open();
    this.actor.setSlider(value);
    this.expectValid(this.validator.sliderOutputShows(value));
  }

  verifySliderTracksBoundaryValues(min = 0, max = 100): void {
    this.open();
    for (const value of [min, max]) {
      this.actor.setSlider(value);
      this.expectValid(this.validator.sliderOutputShows(value));
    }
  }

  verifySwitchOutputTracksState(): void {
    this.open();
    this.actor.toggleSwitch(true);
    this.expectValid(this.validator.switchOutputShows(true));
    this.actor.toggleSwitch(false);
    this.expectValid(this.validator.switchOutputShows(false));
  }

  verifySwitchEndsOnAfterRapidToggles(): void {
    this.open();
    for (const state of [true, false, true]) {
      this.actor.toggleSwitch(state);
      this.expectValid(this.validator.switchOutputShows(state));
    }
  }

  verifyDateInputShowsSelectedDate(isoDate: string): void {
    this.open();
    this.actor.selectDate(isoDate);
    this.expectValid(this.validator.dateOutputShows(isoDate));
  }

  verifyDateInputClearsToDefault(isoDate = '2026-10-08'): void {
    this.open();
    this.actor.selectDate(isoDate);
    this.expectValid(this.validator.dateOutputShows(isoDate));
    this.actor.clearDate();
    this.expectValid(this.validator.dateOutputShowsNone());
  }

  verifySelectionControlsUpdateIndependently(
    country: CountryOption,
    sliderValue: number,
    switchOn: boolean,
  ): void {
    this.open();
    this.actor.selectCountry(country);
    this.actor.setSlider(sliderValue);
    this.actor.toggleSwitch(switchOn);
    this.expectValid(this.validator.dropdownOutputShows(country));
    this.expectValid(this.validator.sliderOutputShows(sliderValue));
    this.expectValid(this.validator.switchOutputShows(switchOn));
  }

  verifyTextAreaCountsTypedCharacters(text: string): void {
    this.open();
    this.actor.typeIntoTextArea(text);
    this.expectValid(this.validator.textAreaOutputShowsCharacterCount(text.length));
  }

  verifyTextAreaResetsCountWhenCleared(text = 'Sample message'): void {
    this.open();
    this.actor.typeIntoTextArea(text);
    this.expectValid(this.validator.textAreaOutputShowsCharacterCount(text.length));
    this.actor.clearTextArea();
    this.expectValid(this.validator.textAreaOutputShowsCharacterCount(0));
  }

  verifyUploadedFileAppearsInList(filePath = UPLOAD_FIXTURE_PATH): void {
    this.open();
    this.actor.attachFileToUpload(filePath);
    this.expectValid(this.validator.fileListShows(fileNameOf(filePath)));
    this.expectValid(this.validator.clearButtonShowsLabel());
  }

  verifyUploadedFileListClears(filePath = UPLOAD_FIXTURE_PATH): void {
    this.open();
    this.actor.attachFileToUpload(filePath);
    this.expectValid(this.validator.fileListShows(fileNameOf(filePath)));
    this.actor.clearUploadedFiles();
    this.expectValid(this.validator.fileListCleared());
  }

  private expectValid(result: Cypress.Chainable<ValidationResult>): void {
    result.should((value) => {
      expect(value.passed, value.message).to.equal(true);
    });
  }
}
