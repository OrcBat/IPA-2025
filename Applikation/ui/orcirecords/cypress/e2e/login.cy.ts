describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("logs in successfully as user and redirects to homepage", () => {
    cy.get("input").first().type("user");
    cy.get("input").eq(1).type("password");

    cy.get("button").contains("Login").click();

    cy.url().should("include", "/homepage");
  });

  it("logs in successfully as admin and redirects to homepage", () => {
    cy.get("input").first().type("admin");
    cy.get("input").eq(1).type("password");

    cy.get("button").contains("Login").click();

    cy.url().should("include", "/homepage");
  });

  it("shows error message on failed login", () => {
    cy.intercept("POST", "/api/login", { statusCode: 401 }).as("failedLogin");

    cy.get("input").first().type("wronguser");
    cy.get("input").eq(1).type("wrongpass");

    cy.get("button").contains("Login").click();

    cy.contains("Login failed. Please try again.").should("be.visible");
  });
});
