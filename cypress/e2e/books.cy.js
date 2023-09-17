it.skip("Should successfully login", () => {
  cy.visit("/");
  cy.login("test@test.com", "test");
  cy.contains("Добро пожаловать test@test.com").should("be.visible");
});

it.skip("Should not login with empty login", () => {
  cy.visit("/");
  cy.contains("Log in").click();
  cy.get("#mail").type(" ");
  cy.get("#pass").type("test");
  cy.contains("Submit").click();
  cy.get("#mail")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
});

it.skip("Should not login with empty password", () => {
  cy.visit("/");
  cy.contains("Log in").click();
  cy.get("#mail").type("test@test.com");
  cy.contains("Submit").click();
  cy.get("#pass")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
});

beforeEach(() => {
  // cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
  cy.visit("/");
  cy.login("test@test.com", "test");
  cy.contains("Добро пожаловать").should("be.visible");
});
describe("When user add the books", () => {
  it("Should adding a book by button", () => {
    // cy.visit("/");
    // cy.login("test@test.com", "test");
    cy.get(".p-0 > .btn").click();
    cy.get("#title").type("Дубровский");
    cy.get("#description").type("Роман");
    cy.get("#authors").type("Александр Сергеевич Пушкин");
    cy.contains("Submit").click();
    cy.contains("Дубровский").should("be.visible");
  });
  it("Should adding a book to favorites", () => {
    // cy.visit("/");
    // cy.login("test@test.com", "test");
    cy.contains("Дубровский").contains("Add to favorite").click();
    cy.contains("Favorites").click();
    cy.contains("Дубровский").should("be.visible");
  });

  it("Should deleting a book favorites", () => {
    // cy.viewport(360, 640);
    // cy.visit("/");
    // cy.login("test@test.com", "test");
    cy.contains("Books list").click();
    cy.contains("Favorites").click();
    cy.contains("Дубровский").contains("Delete from favorite").click();
    cy.contains("Дубровский").should("not.exist");
  });
});
