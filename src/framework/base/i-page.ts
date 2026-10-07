export type Element = Cypress.Chainable<JQuery<HTMLElement>>;

export interface IPage {
  visit(url: string): Element;
  url(): Cypress.Chainable<string>;
  title(): Cypress.Chainable<string>;
  get(selector: string): Element;
  getByRole(role: string, name: string): Element;
  getByLabelText(label: string): Element;
  getByTestId(testId: string): Element;
}
