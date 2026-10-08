export type Element = Cypress.Chainable<JQuery<HTMLElement>>;
export type AutWindow = Cypress.Chainable<Cypress.AUTWindow>;

export interface IPage {
  visit(url: string): AutWindow;
  get(selector: string): Element;
  getByRole(role: string, name: string): Element;
  getByLabelText(label: string): Element;
  getByTestId(testId: string): Element;
}
