import { BaseActor } from '../../base/base-actor';
import { click } from '../../base/actions/click';
import { selectOption } from '../../base/actions/select';
import { setChecked } from '../../base/actions/toggle';
import { typeText } from '../../base/actions/type-text';
import type { FormsLocators } from './forms-locators';

export type SurveyRating = 1 | 2 | 3 | 4 | 5;
export type SurveyRecommendation = 'yes' | 'no';
export type SettingsTheme = 'Light' | 'Dark' | 'System default';
export type NotificationChannel = 'email' | 'sms' | 'push';
export type SearchCategory = 'All' | 'Electronics' | 'Accessories' | 'Apparel' | 'Home';

export class FormsActor extends BaseActor<FormsLocators> {
  fillSignInCredentials(email: string, password: string): void {
    typeText(this.locators.signInEmail(), email);
    typeText(this.locators.signInPassword(), password);
  }

  setRememberMe(enabled: boolean): void {
    setChecked(this.locators.signInRememberMe(), enabled);
  }

  submitSignIn(): void {
    click(this.locators.signInSubmit());
  }

  fillRegistrationDetails(name: string, email: string, password: string, confirm: string): void {
    typeText(this.locators.registrationName(), name);
    typeText(this.locators.registrationEmail(), email);
    typeText(this.locators.registrationPassword(), password);
    typeText(this.locators.registrationConfirmPassword(), confirm);
  }

  submitRegistration(): void {
    click(this.locators.registrationSubmit());
  }

  fillContactDetails(name: string, email: string, message: string): void {
    typeText(this.locators.contactName(), name);
    typeText(this.locators.contactEmail(), email);
    typeText(this.locators.contactMessage(), message);
  }

  submitContact(): void {
    click(this.locators.contactSubmit());
  }

  fillSubscriptionEmail(email: string): void {
    typeText(this.locators.subscriptionEmail(), email);
  }

  submitSubscription(): void {
    click(this.locators.subscriptionSubmit());
  }

  fillPaymentDetails(cardholder: string, cardNumber: string, expiry: string, cvc: string): void {
    typeText(this.locators.paymentCardholder(), cardholder);
    typeText(this.locators.paymentCardNumber(), cardNumber);
    typeText(this.locators.paymentExpiry(), expiry);
    typeText(this.locators.paymentCvc(), cvc);
  }

  submitPayment(): void {
    click(this.locators.paymentSubmit());
  }

  selectSurveyRating(rating: SurveyRating): void {
    click(this.locators.surveyRating(rating));
  }

  selectSurveyRecommendation(recommendation: SurveyRecommendation): void {
    click(this.locators.surveyRecommendation(recommendation));
  }

  fillSurveyComments(comments: string): void {
    typeText(this.locators.surveyComments(), comments);
  }

  submitSurvey(): void {
    click(this.locators.surveySubmit());
  }

  fillSettingsUsername(username: string): void {
    typeText(this.locators.settingsUsername(), username);
  }

  selectSettingsTheme(theme: SettingsTheme): void {
    selectOption(this.locators.settingsTheme(), theme);
  }

  setNotificationEnabled(channel: NotificationChannel, enabled: boolean): void {
    setChecked(this.locators.settingsNotification(channel), enabled);
  }

  saveSettings(): void {
    click(this.locators.settingsSubmit());
  }

  fillSearchQuery(query: string): void {
    typeText(this.locators.searchQuery(), query);
  }

  selectSearchCategory(category: SearchCategory): void {
    selectOption(this.locators.searchCategory(), category);
  }

  fillSearchMinPrice(minPrice: string): void {
    typeText(this.locators.searchMinPrice(), minPrice);
  }

  fillSearchMaxPrice(maxPrice: string): void {
    typeText(this.locators.searchMaxPrice(), maxPrice);
  }

  setInStockOnly(enabled: boolean): void {
    setChecked(this.locators.searchInStock(), enabled);
  }

  applySearchFilters(): void {
    click(this.locators.searchSubmit());
  }
}
