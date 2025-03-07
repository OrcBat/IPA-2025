describe("Songs Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.get("input").first().type("admin");
    cy.get("input").eq(1).type("password");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/homepage");
    cy.visit("http://localhost:3000/songs");
  });

  it("performs a song search", () => {
    cy.contains("Songs").should("be.visible");

    cy.get("input[name='title']").type("15 Step");
    cy.get("input[name='artist']").type("Radiohead");

    cy.get('[data-testid="search-button"]').click();

    cy.contains("15 Step").should("be.visible");
  });

  it("performs a recommended song search", () => {
    cy.contains("Get Recommendations").click();

    cy.get('[data-testid="select-genre"]').click();
    cy.get("ul[role='listbox']").contains("Rock").click();
    cy.get("body").click();

    cy.get('[data-testid="select-mood"]').click();
    cy.get("ul[role='listbox']").contains("Happy").click();
    cy.get("body").click();

    cy.get('[data-testid="select-energy"]').click();
    cy.get("ul[role='listbox']").contains("High").click();
    cy.get("body").click();

    cy.get('[data-testid="get-recommendations-button"]').click();

    cy.contains("15 Step").should("be.visible");
  });
});
