import { BaseCoordinator } from '../../base/base-coordinator';
import type { ValidationResult } from '../../base/validation-result';
import {
  FormsActor,
  type NotificationChannel,
  type SearchCategory,
  type SettingsTheme,
  type SurveyRating,
  type SurveyRecommendation,
} from './forms-actor';
import type { FormsPage } from './forms-page';
import { FormsValidator } from './forms-validator';

const NOTIFICATION_CHANNEL_ORDER: readonly NotificationChannel[] = ['email', 'sms', 'push'];

const NOTIFICATION_CHANNEL_LABELS: Record<NotificationChannel, string> = {
  email: 'email',
  sms: 'SMS',
  push: 'push',
};

function digitsOnly(value: string): string {
  return value.replace(/[\s-]/g, '');
}

export class FormsCoordinator extends BaseCoordinator<FormsPage> {
  private readonly actor: FormsActor;
  private readonly validator: FormsValidator;

  constructor(page: FormsPage) {
    super(page);
    this.actor = new FormsActor(page.locators);
    this.validator = new FormsValidator(page.locators);
  }

  open(): void {
    this.page.goToSection();
  }

  verifySignInRejectsEmptySubmit(): void {
    this.open();
    this.actor.submitSignIn();
    this.expectValid(this.validator.signInResultShows('Email is required.'));
  }

  verifySignInRejectsMalformedEmail(email = 'not-an-email', password = 'password1'): void {
    this.open();
    this.actor.fillSignInCredentials(email, password);
    this.actor.submitSignIn();
    this.expectValid(this.validator.signInResultShows('Enter a valid email address.'));
  }

  verifySignInRejectsShortPassword(email = 'ada@example.com', password = 'short'): void {
    this.open();
    this.actor.fillSignInCredentials(email, password);
    this.actor.submitSignIn();
    this.expectValid(this.validator.signInResultShows('Password must be at least 8 characters.'));
  }

  verifySignInRejectsMissingPassword(email = 'ada@example.com'): void {
    this.open();
    this.actor.fillSignInEmail(email);
    this.actor.submitSignIn();
    this.expectValid(this.validator.signInResultShows('Password must be at least 8 characters.'));
  }

  verifySignInSucceedsWithValidCredentials(
    email: string,
    password: string,
    rememberMe = false,
  ): void {
    this.open();
    this.actor.fillSignInCredentials(email, password);
    this.actor.setRememberMe(rememberMe);
    this.actor.submitSignIn();
    const suffix = rememberMe ? ' (session will persist)' : '';
    this.expectValid(this.validator.signInResultShows(`Signed in as ${email}${suffix}.`));
  }

  verifyRegistrationRejectsEmptySubmit(): void {
    this.open();
    this.actor.submitRegistration();
    this.expectValid(this.validator.registrationResultShows('Full name is required.'));
  }

  verifyRegistrationRejectsMalformedEmail(name = 'Jane Doe', email = 'not-an-email'): void {
    this.open();
    this.actor.fillRegistrationDetails(name, email, 'password1', 'password1');
    this.actor.submitRegistration();
    this.expectValid(this.validator.registrationResultShows('Enter a valid email address.'));
  }

  verifyRegistrationRejectsShortPassword(
    name = 'Jane Doe',
    email = 'jane@example.com',
    password = 'short',
  ): void {
    this.open();
    this.actor.fillRegistrationDetails(name, email, password, password);
    this.actor.submitRegistration();
    this.expectValid(
      this.validator.registrationResultShows('Password must be at least 8 characters.'),
    );
  }

  verifyRegistrationRejectsMismatchedPasswords(
    name = 'Jane Doe',
    email = 'jane@example.com',
    password = 'password1',
    confirm = 'password2',
  ): void {
    this.open();
    this.actor.fillRegistrationDetails(name, email, password, confirm);
    this.actor.submitRegistration();
    this.expectValid(this.validator.registrationResultShows('Passwords do not match.'));
  }

  verifyRegistrationCreatesAccountFor(name: string, email: string, password: string): void {
    this.open();
    this.actor.fillRegistrationDetails(name, email, password, password);
    this.actor.submitRegistration();
    this.expectValid(this.validator.registrationResultShows(`Account created for ${name}.`));
  }

  verifyContactRejectsEmptySubmit(): void {
    this.open();
    this.actor.submitContact();
    this.expectValid(this.validator.contactResultShows('Name is required.'));
  }

  verifyContactRejectsMalformedEmail(name = 'Ada Lovelace', email = 'not-an-email'): void {
    this.open();
    this.actor.fillContactDetails(name, email, 'Happy to hear from you.');
    this.actor.submitContact();
    this.expectValid(this.validator.contactResultShows('Enter a valid email address.'));
  }

  verifyContactRejectsShortMessage(
    name = 'Ada Lovelace',
    email = 'ada@example.com',
    message = 'short',
  ): void {
    this.open();
    this.actor.fillContactDetails(name, email, message);
    this.actor.submitContact();
    this.expectValid(this.validator.contactResultShows('Message must be at least 10 characters.'));
  }

  verifyContactSubjectDefaultsToGeneral(): void {
    this.open();
    this.expectValid(this.validator.contactSubjectSelects('General'));
  }

  verifyContactSendsMessageTo(name: string, email: string, message: string): void {
    this.open();
    this.actor.fillContactDetails(name, email, message);
    this.actor.submitContact();
    this.expectValid(this.validator.contactResultShows('Message sent to general team.'));
  }

  verifySubscriptionRejectsInvalidEmail(email = 'not-an-email'): void {
    this.open();
    this.actor.fillSubscriptionEmail(email);
    this.actor.submitSubscription();
    this.expectValid(this.validator.subscriptionResultShows('Enter a valid email address.'));
  }

  verifySubscriptionReflectsDefaultProMonthlyPlan(email: string): void {
    this.open();
    this.actor.fillSubscriptionEmail(email);
    this.actor.submitSubscription();
    this.expectValid(
      this.validator.subscriptionResultShows('Subscribed to Pro (monthly) at $29.00/month.'),
    );
  }

  verifyPaymentRejectsEmptySubmit(): void {
    this.open();
    this.actor.submitPayment();
    this.expectValid(this.validator.paymentResultShows('Cardholder name is required.'));
  }

  verifyPaymentRejectsMalformedCardNumber(cardholder = 'Ada Lovelace', cardNumber = '1234'): void {
    this.open();
    this.actor.fillPaymentDetails(cardholder, cardNumber, '12/29', '123');
    this.actor.submitPayment();
    this.expectValid(this.validator.paymentResultShows('Card number must be 16 digits.'));
  }

  verifyPaymentRejectsMalformedExpiry(
    cardholder = 'Ada Lovelace',
    cardNumber = '4242 4242 4242 4242',
    expiry = '13/29',
  ): void {
    this.open();
    this.actor.fillPaymentDetails(cardholder, cardNumber, expiry, '123');
    this.actor.submitPayment();
    this.expectValid(this.validator.paymentResultShows('Expiry must be in MM/YY format.'));
  }

  verifyPaymentRejectsMalformedCvc(
    cardholder = 'Ada Lovelace',
    cardNumber = '4242 4242 4242 4242',
    expiry = '12/29',
    cvc = '12',
  ): void {
    this.open();
    this.actor.fillPaymentDetails(cardholder, cardNumber, expiry, cvc);
    this.actor.submitPayment();
    this.expectValid(this.validator.paymentResultShows('CVC must be 3 or 4 digits.'));
  }

  verifyPaymentAcceptsTestCard(
    cardholder: string,
    cardNumber: string,
    expiry: string,
    cvc: string,
  ): void {
    this.open();
    this.actor.fillPaymentDetails(cardholder, cardNumber, expiry, cvc);
    this.actor.submitPayment();
    const last4 = digitsOnly(cardNumber).slice(-4);
    this.expectValid(
      this.validator.paymentResultShows(`Payment authorized for card ending ${last4}.`),
    );
  }

  verifySurveyRejectsEmptySubmit(): void {
    this.open();
    this.actor.submitSurvey();
    this.expectValid(this.validator.surveyResultShows('Please select a rating.'));
  }

  verifySurveyRejectsMissingRecommendation(rating: SurveyRating = 4): void {
    this.open();
    this.actor.selectSurveyRating(rating);
    this.actor.submitSurvey();
    this.expectValid(
      this.validator.surveyResultShows('Please answer the recommendation question.'),
    );
  }

  verifySurveySubmitsWithoutComments(
    rating: SurveyRating = 4,
    recommendation: SurveyRecommendation = 'yes',
  ): void {
    this.open();
    this.actor.selectSurveyRating(rating);
    this.actor.selectSurveyRecommendation(recommendation);
    this.actor.submitSurvey();
    this.expectValid(
      this.validator.surveyResultShows(
        `Thanks! Your survey was submitted (rated ${rating}/5, would recommend: ${recommendation}).`,
      ),
    );
  }

  verifySurveySubmitsWithComments(
    rating: SurveyRating = 4,
    recommendation: SurveyRecommendation = 'yes',
    comments = 'Nice work, thanks!',
  ): void {
    this.open();
    this.actor.selectSurveyRating(rating);
    this.actor.selectSurveyRecommendation(recommendation);
    this.actor.fillSurveyComments(comments);
    this.actor.submitSurvey();
    this.expectValid(
      this.validator.surveyResultShows(
        `Thanks! Your survey was submitted (rated ${rating}/5, would recommend: ${recommendation}, with comments).`,
      ),
    );
  }

  verifySettingsRejectsEmptySubmit(): void {
    this.open();
    this.actor.saveSettings();
    this.expectValid(this.validator.settingsResultShows('Username is required.'));
  }

  verifySettingsSaveReflectsStateFor(
    username: string,
    theme: SettingsTheme = 'Light',
    channels: readonly NotificationChannel[] = ['email', 'push'],
  ): void {
    this.open();
    this.actor.fillSettingsUsername(username);
    this.actor.selectSettingsTheme(theme);
    for (const channel of NOTIFICATION_CHANNEL_ORDER) {
      this.actor.setNotificationEnabled(channel, channels.includes(channel));
    }
    this.actor.saveSettings();
    const labels = NOTIFICATION_CHANNEL_ORDER.filter((channel) => channels.includes(channel)).map(
      (channel) => NOTIFICATION_CHANNEL_LABELS[channel],
    );
    const channelsText = labels.length > 0 ? labels.join(', ') : 'none';
    this.expectValid(
      this.validator.settingsResultShows(
        `Settings saved for ${username.trim()} — theme: ${theme}, notifications via ${channelsText}.`,
      ),
    );
  }

  verifySearchShowsAllProductsWhenNoFiltersSet(): void {
    this.open();
    this.actor.applySearchFilters();
    this.expectValid(this.validator.searchResultShows('Showing all products.'));
  }

  verifySearchRejectsInvertedPriceRange(minPrice = '100', maxPrice = '50'): void {
    this.open();
    if (minPrice) {
      this.actor.fillSearchMinPrice(minPrice);
    }
    if (maxPrice) {
      this.actor.fillSearchMaxPrice(maxPrice);
    }
    this.actor.applySearchFilters();
    this.expectValid(
      this.validator.searchResultShows('Minimum price cannot be greater than maximum price.'),
    );
  }

  verifySearchFiltersProducts(
    query: string,
    category: SearchCategory,
    minPrice = '',
    maxPrice = '',
    inStockOnly = false,
  ): void {
    this.open();
    if (query) {
      this.actor.fillSearchQuery(query);
    }
    this.actor.selectSearchCategory(category);
    if (minPrice) {
      this.actor.fillSearchMinPrice(minPrice);
    }
    if (maxPrice) {
      this.actor.fillSearchMaxPrice(maxPrice);
    }
    this.actor.setInStockOnly(inStockOnly);
    this.actor.applySearchFilters();
    const parts: string[] = [];
    if (query.trim()) {
      parts.push(`matching "${query.trim()}"`);
    }
    if (category !== 'All') {
      parts.push(`in ${category}`);
    }
    if (minPrice) {
      parts.push(`from $${minPrice}`);
    }
    if (maxPrice) {
      parts.push(`up to $${maxPrice}`);
    }
    if (inStockOnly) {
      parts.push('in stock only');
    }
    const expected =
      parts.length > 0 ? `Showing products ${parts.join(', ')}.` : 'Showing all products.';
    this.expectValid(this.validator.searchResultShows(expected));
  }

  private expectValid(result: Cypress.Chainable<ValidationResult>): void {
    result.should((value) => {
      expect(value.passed, value.message).to.equal(true);
    });
  }
}
