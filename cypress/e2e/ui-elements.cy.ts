import '@testing-library/cypress/add-commands';
import { UiElementsCoordinator } from '../../src/framework/pages/ui-elements/ui-elements-coordinator';
import { UiElementsPage } from '../../src/framework/pages/ui-elements/ui-elements-page';

describe('UI Elements', () => {
  let coordinator: UiElementsCoordinator;

  beforeEach(() => {
    coordinator = new UiElementsCoordinator(new UiElementsPage());
  });

  it('Should echo typed text in output box When typing into the text field', () => {
    coordinator.verifyTextFieldEchoesTypedText('Hello, Cypress!');
  });

  it('Should mask secret as bullets When entering a password', () => {
    coordinator.verifyPasswordFieldMasksSecret('s3cret!');
  });

  it('Should track both states in output When toggling the checkbox off then on', () => {
    coordinator.verifyCheckboxOutputTracksState();
  });

  it('Should show each selected option label in output When selecting radio options A through C in turn', () => {
    coordinator.verifyRadioGroupTracksEachSelection();
  });

  it('Should show the selected country in output When choosing each dropdown option in turn', () => {
    coordinator.verifyDropdownTracksEachSelection();
  });

  it('Should reset to "No option selected" When the dropdown is returned to its default', () => {
    coordinator.verifyDropdownResetsToDefault();
  });

  it('Should show the new value in output When the slider is moved to a mid-range position', () => {
    coordinator.verifySliderReflectsNewValue(75);
  });

  it('Should show each boundary value in output When the slider is set to its minimum then maximum', () => {
    coordinator.verifySliderTracksBoundaryValues();
  });

  it('Should track both states in output When toggling the switch on then off', () => {
    coordinator.verifySwitchOutputTracksState();
  });

  it('Should end "On" in output When the switch is rapidly toggled three times', () => {
    coordinator.verifySwitchEndsOnAfterRapidToggles();
  });

  it('Should show the chosen date in output When a date is picked from the date input', () => {
    coordinator.verifyDateInputShowsSelectedDate('2026-10-08');
  });

  it('Should reset to "No date selected" When the date input is cleared after picking a date', () => {
    coordinator.verifyDateInputClearsToDefault();
  });

  it('Should update each output independently When dropdown, slider and switch are changed together', () => {
    coordinator.verifySelectionControlsUpdateIndependently('India', 40, true);
  });
});
