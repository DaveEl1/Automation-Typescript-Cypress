export function elementExists(selector: string): Cypress.Chainable<boolean> {
  return cy.get('body').then(($body) => $body.find(selector).length > 0);
}
