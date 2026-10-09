import { BaseLocators } from '../../base/base-locators';
import type { Element } from '../../base/i-page';

export class FormsLocators extends BaseLocators {
  private section(heading: string): Element {
    return this.page.getByRole('heading', heading).parent();
  }

  private resultWithin(heading: string): Element {
    return this.section(heading).find('[data-testid="ui-alert"]');
  }

  signInEmail() {
    return this.page.get('#login-email');
  }

  signInPassword() {
    return this.page.get('#login-password');
  }

  signInRememberMe() {
    return this.page.get('#login-remember');
  }

  signInSubmit() {
    return this.page.getByRole('button', 'Sign in');
  }

  signInResult() {
    return this.resultWithin('Sign in');
  }

  registrationName() {
    return this.page.getByTestId('reg-name');
  }

  registrationEmail() {
    return this.page.getByTestId('reg-email');
  }

  registrationPassword() {
    return this.page.getByTestId('reg-password');
  }

  registrationConfirmPassword() {
    return this.page.getByTestId('reg-confirm');
  }

  registrationSubmit() {
    return this.page.getByTestId('create-account-button');
  }

  registrationResult() {
    return this.page.getByTestId('registration-result');
  }

  contactName() {
    return this.page.get('#contact-name');
  }

  contactEmail() {
    return this.page.get('#contact-email');
  }

  contactSubject() {
    return this.page.get('#contact-subject');
  }

  contactMessage() {
    return this.page.get('#contact-message');
  }

  contactSubmit() {
    return this.page.getByRole('button', 'Send message');
  }

  contactResult() {
    return this.resultWithin('Contact us');
  }

  subscriptionEmail() {
    return this.page.getByTestId('subscription-email');
  }

  subscriptionSubmit() {
    return this.page.getByTestId('subscribe-button');
  }

  subscriptionResult() {
    return this.page.getByTestId('subscription-result');
  }

  paymentCardholder() {
    return this.page.get('#pay-cardholder');
  }

  paymentCardNumber() {
    return this.page.get('#pay-card-number');
  }

  paymentExpiry() {
    return this.page.get('#pay-expiry');
  }

  paymentCvc() {
    return this.page.get('#pay-cvc');
  }

  paymentSubmit() {
    return this.page.getByRole('button', 'Pay $49.00');
  }

  paymentResult() {
    return this.resultWithin('Card payment');
  }

  surveyRating(value: number) {
    return this.page.getByTestId(`survey-rating-${value}`);
  }

  surveyRecommendation(value: string) {
    return this.page.getByTestId(`survey-recommend-${value}`);
  }

  surveyComments() {
    return this.page.getByTestId('survey-comments');
  }

  surveySubmit() {
    return this.page.getByTestId('submit-survey-button');
  }

  surveyResult() {
    return this.page.getByTestId('survey-result');
  }

  settingsUsername() {
    return this.page.getByTestId('settings-username');
  }

  settingsTheme() {
    return this.page.getByTestId('settings-theme');
  }

  settingsNotification(channel: string) {
    return this.page.getByTestId(`settings-notif-${channel}`);
  }

  settingsSubmit() {
    return this.page.getByTestId('save-settings-button');
  }

  settingsResult() {
    return this.page.getByTestId('settings-result');
  }

  searchQuery() {
    return this.page.getByTestId('search-query');
  }

  searchCategory() {
    return this.page.getByTestId('search-category');
  }

  searchMinPrice() {
    return this.page.getByTestId('search-min-price');
  }

  searchMaxPrice() {
    return this.page.getByTestId('search-max-price');
  }

  searchInStock() {
    return this.page.getByTestId('search-in-stock');
  }

  searchSubmit() {
    return this.page.getByTestId('apply-filters-button');
  }

  searchResult() {
    return this.page.getByTestId('search-result');
  }
}
