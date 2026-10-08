import '@testing-library/cypress/add-commands';
import { UiElementsCoordinator } from '../../src/framework/pages/ui-elements/ui-elements-coordinator';
import { UiElementsPage } from '../../src/framework/pages/ui-elements/ui-elements-page';

describe('UI Elements — basic elements', () => {
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

  it('Should update output to Checked and Unchecked When toggling the checkbox', () => {
    coordinator.verifyCheckboxOutputTracksState();
  });

  it('Should show selected option label in output box When selecting a radio option', () => {
    coordinator.verifyRadioGroupUpdatesOutput('quarterly');
  });
});
