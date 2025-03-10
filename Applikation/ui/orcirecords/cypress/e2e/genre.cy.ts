describe("Genres Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.get("input").first().type("admin");
    cy.get("input").eq(1).type("password");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/homepage");
    cy.visit("http://localhost:3000/genres");
  });

  it("displays the genres page", () => {
    cy.contains("Genres").should("be.visible");

    cy.get("div").should("not.contain", "CircularProgress");

    cy.get("button").contains("Add Genre").should("be.visible");
  });

  it("adds a genre", () => {
    cy.get("button").contains("Add Genre").click();

    cy.contains("Add Genre").should("be.visible");

    cy.get('input[name="name"]').type("New Genre");

    cy.get("button").contains("Save").click();

    cy.contains("New Genre").should("be.visible");
  });

  it("edits an existing genre", () => {
    cy.get('[data-testid="genre-accordion"]').first().click();
    cy.get('[data-testid="edit-genre"]').first().click();

    cy.contains("Edit Genre").should("be.visible");

    cy.get('input[name="name"]').type(" Updated");

    cy.get("button").contains("Save").click();

    cy.contains("Rock Updated").should("be.visible");
  });

  it("deletes a genre", () => {
    cy.get('[data-testid="genre-accordion"]').first().click();
    cy.get('[data-testid="delete-genre"]').first().click();

    cy.on("window:confirm", () => true);

    cy.contains("Updated").should("not.exist");
  });
});
