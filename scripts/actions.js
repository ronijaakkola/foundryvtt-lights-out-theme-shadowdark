export function openSheet() {
  let actor;

  if (this.dataset.token === "true") {
    let scene = game.canvas.scene;
    actor = scene.tokens.find(item => item.delta.id === this.dataset.id).actor;
  }
  else {
    actor = game.actors.get(this.dataset.id);
  }

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
