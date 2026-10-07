import type { IPage } from './i-page';

export function createPage(page: IPage): IPage {
  return {
    ...page,
    getByRole(role: string, name: string) {
      return cy.findByRole(role, { name });
    },
    getByLabelText(label: string) {
      return cy.findByLabelText(label);
    },
    getByTestId(testId: string) {
      return cy.findByTestId(testId);
    },
  };
}
