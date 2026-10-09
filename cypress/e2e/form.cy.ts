import '@testing-library/cypress/add-commands';
import { FormsCoordinator } from '../../src/framework/pages/forms/forms-coordinator';
import { FormsPage } from '../../src/framework/pages/forms/forms-page';

describe('Forms', () => {
  let coordinator: FormsCoordinator;

  beforeEach(() => {
    coordinator = new FormsCoordinator(new FormsPage());
  });

  it('Should sign in with valid credentials and reject short or empty passwords When submitting the sign-in form', () => {
    coordinator.verifySignInSucceedsWithValidCredentials('ada@example.com', 'password1');
    coordinator.verifySignInRejectsShortPassword();
    coordinator.verifySignInRejectsMissingPassword();
  });

  it('Should reject empty, short and mismatched input and create the account When submitting registration details', () => {
    coordinator.verifyRegistrationRejectsEmptySubmit();
    coordinator.verifyRegistrationRejectsShortPassword();
    coordinator.verifyRegistrationRejectsMismatchedPasswords();
    coordinator.verifyRegistrationCreatesAccountFor('Jane Doe', 'jane@example.com', 'password1');
  });

  it('Should enforce required fields and default the subject to General When using the contact form', () => {
    coordinator.verifyContactRejectsEmptySubmit();
    coordinator.verifyContactRejectsShortMessage();
    coordinator.verifyContactSubjectDefaultsToGeneral();
  });

  it('Should reflect the default pro monthly plan When subscribing with a valid email', () => {
    coordinator.verifySubscriptionReflectsDefaultProMonthlyPlan('sam@example.com');
  });

  it('Should reject an invalid card number and authorize 4242 4242 4242 4242 When submitting payment details', () => {
    coordinator.verifyPaymentRejectsMalformedCardNumber();
    coordinator.verifyPaymentAcceptsTestCard('Ada Lovelace', '4242 4242 4242 4242', '12/29', '123');
  });

  it('Should require a rating and recommendation but allow skipping comments When submitting the survey', () => {
    coordinator.verifySurveyRejectsEmptySubmit();
    coordinator.verifySurveyRejectsMissingRecommendation();
    coordinator.verifySurveySubmitsWithoutComments();
  });

  it('Should echo the saved username, theme and notification channels When saving account settings', () => {
    coordinator.verifySettingsSaveReflectsStateFor('ada', 'Dark', ['email', 'sms']);
  });

  it('Should report the applied filters and fall back to all products When submitting search criteria', () => {
    coordinator.verifySearchShowsAllProductsWhenNoFiltersSet();
    coordinator.verifySearchFiltersProducts('keyboard', 'Electronics');
  });
});
