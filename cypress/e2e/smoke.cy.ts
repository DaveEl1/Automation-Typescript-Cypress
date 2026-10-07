describe('Reach Catalog — smoke', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should show the home heading When the site loads', () => {
    cy.get('h1.hero-title').should('be.visible').and('have.text', 'Reach Catalog');
  });
});
