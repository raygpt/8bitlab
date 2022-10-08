describe('Search for an organization, click a repository and browse commits', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('.organization-search-title', 'Search for repositories');
  });

  it('Does not display the searchbar on the top right', () => {
    cy.get('.global-searchbar').should('not.exist');
  });

  it('Searches for an organization', () => {
    cy.get('input[name = "search"]').type('Netflix');
    cy.get('mat-option').contains('Netflix');
  });

  it('Selects an organization', () => {
    cy.get('mat-option').contains('Netflix').click();
    cy.url().should('include', '/organization');
    cy.get('img[alt="Organization avatar"]').should('be.visible');
  });

  it('Displays the searchbar on the top right after navigating away from the homepage', () => {
    cy.get('.global-searchbar').should('be.visible');
  });

  it('Allows to select a repository', () => {
    cy.get('.repository-card-title').first().click();
    cy.url().should('include', '/repository');
  });

  it('Displays a breadcrumb with the organization name as a link and the repository name', () => {
    cy.get('p').contains('Hystrix');
    cy.get('a').contains('Netflix').click();
    cy.url().should('include', '/organization');
  });

  it('Displays a list of commits for the selected repository as an infinite scroll', () => {
    cy.get('mat-card').first().click();
    cy.get('.commit-details').should('have.length', 60);
    cy.get('.commit-details').last().scrollIntoView();
    cy.get('.commit-details').should('have.length', 90);
  });

  it('Displays a commit message, author name and date', () => {
    cy.get('.commit-message').first().should('be.visible');
    cy.get('.commit-author').first().should('be.visible');
    cy.get('.commit-date').first().should('be.visible');
  });

  it('Displays a button to copy commit sha', () => {
    cy.get('.clipboard-toggle').first().should('be.visible');
  });

  it('Displays a button to open commit details', () => {
    cy.get('.diff-toggle').first().should('be.visible');
  });

  it('Opens the diff in a new tab when clicking the diff toggle', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('open');
    });
    cy.get('.diff-toggle').first().click();
    cy.get('@open').should('have.been.calledOnce');
  });

  it('Allows the user to navigate home by clicking the app title in the navbar', () => {
    cy.get('.navbar-title').click();
    cy.url().should('include', '/');
  });
});
