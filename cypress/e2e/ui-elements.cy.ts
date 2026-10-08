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

  it('Should track both states in output When toggling the checkbox off then on', () => {
    coordinator.verifyCheckboxOutputTracksState();
  });

  it('Should show each selected option label in output When selecting radio options A through C in turn', () => {
    coordinator.verifyRadioGroupTracksEachSelection();
  });
});
