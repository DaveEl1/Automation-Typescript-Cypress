import type { IPage } from './i-page';

export type PageCore = Omit<IPage, 'getByRole' | 'getByLabelText' | 'getByTestId'>;

export function createPage(page: PageCore): IPage {
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
