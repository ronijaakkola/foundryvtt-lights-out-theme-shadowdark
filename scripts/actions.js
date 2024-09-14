export function openSheet() {
  let actor = game.actors.get(this.dataset.character);
  if (actor) {
    actor.sheet.render(true);
  }
}

export function selectToken() {
  const actor = game.actors.get(this.dataset.character);
  if (!actor) return;

  const tokens = actor.getActiveTokens();
  if (tokens.length > 0) {
    tokens[0].control();
  }
}
