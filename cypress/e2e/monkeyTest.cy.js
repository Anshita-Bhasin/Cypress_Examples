import {
  createHorde,
  gremlins,
  species,
  strategies,
  mogwais,
  randomizer,
} from "gremlins.js";

const seed = "formFiller";

describe("Form filler", () => {
  let horde;
  beforeEach(() => {
    return cy.visit("https://classic.freecrm.com/register/").then(() =>
      cy.window().then((pageWindow) => {
        horde = createHorde({
          window: pageWindow,
          species: [
            species.clicker(),
            species.toucher(),
            species.formFiller(),
            species.scroller(),
            species.typer(),
          ],
          mogwais: [mogwais.alert(), mogwais.fps(), mogwais.gizmo()],
          strategies: [
            strategies.distribution(),
            strategies.allTogether({ nb: 10000 }),
            strategies.bySpecies({ nb: 10 }),
          ],

          randomizer: new Chance(seed),
        });
      })
    );
  });
  it("should fill text input with seeded value", () => {
    return cy.wrap(horde.unleash());
  });
});
