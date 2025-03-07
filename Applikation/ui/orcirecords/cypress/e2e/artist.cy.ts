describe("Artists Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.get("input").first().type("admin");
    cy.get("input").eq(1).type("password");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/homepage");
    cy.visit("http://localhost:3000/artists");
  });

  it("displays the artists page", () => {
    cy.contains("Artists").should("be.visible");

    cy.get("div").should("not.contain", "CircularProgress");

    cy.get("button").contains("Add Artist").should("be.visible");
  });

  it("adds an artist", () => {
    cy.get("button").contains("Add Artist").click();

    cy.contains("Add Artist").should("be.visible");

    cy.get('input[name="name"]').type("New Artist");
    cy.get('[data-testid="select-artist-genre"]').click();
    cy.get("ul[role='listbox']").contains("Rock").click();

    cy.get("button").contains("Save").click();

    cy.contains("New Artist").should("be.visible");
  });

  it("edits an existing artist", () => {
    cy.get('[data-testid="artist-accordion"]').first().click();
    cy.get('[data-testid="edit-artist"]').first().click();

    cy.contains("Edit Artist").should("be.visible");

    cy.get('input[name="name"]').type(" Updated");
    cy.get('[data-testid="select-artist-genre"]').click();
    cy.get("ul[role='listbox']").contains("Blues").click();

    cy.get("button").contains("Save").click();

    cy.contains("Radiohead Updated").should("be.visible");
  });

  it("deletes an artist", () => {
    cy.get('[data-testid="artist-accordion"]').first().click();
    cy.get('[data-testid="delete-artist"]').first().click();

    cy.on("window:confirm", () => true);

    cy.contains("Updated").should("not.exist");
  });
});
