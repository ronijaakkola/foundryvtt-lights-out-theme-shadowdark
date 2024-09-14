import {
  getCharacter,
  getPartyCharacters,
  characterData,
} from "./character.js";
import * as actions from "./actions.js";

Hooks.on("renderApplication", async function () {
  if (!isGm()) {
    await renderCharacter();
  }

  await renderParty();

  if (isGm()) {
    $("#players").removeClass("hidden");
    $("#hotbar").removeClass("hidden");
  } else {
    $("#players").addClass("hidden");
    $("#hotbar").addClass("hidden");
  }
});

Hooks.on("updateActor", async function (actor) {
  if (!isGm() && actor.id === getCharacter()?.id) {
    await renderCharacter();
  }

  await renderParty();
});

Hooks.once("init", async () => {
  $("body.game").append('<div id="player-character"></div>');
  $("section#ui-left").append('<div id="party"></div>');

  await loadTemplates([
    "modules/lights-out-theme-shadowdark/templates/character.hbs",
    "modules/lights-out-theme-shadowdark/templates/party.hbs",
  ]);

  activatePlayerListeners();
  activatePartyListeners();
});

Hooks.once('ready', () => {
  game.settings.register("lights-out-theme-shadowdark", "party-only-active", {
    name: game.i18n.localize("LIGHTSOUTSD.config_party_only_active"),
    hint: game.i18n.localize("LIGHTSOUTSD.config_party_only_active_help"),
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });
});

function activatePlayerListeners() {
  $(document).on("click", "#player-character .sheet", actions.openSheet);
  setupHealthPointsTracker("#current-health");
}

function activatePartyListeners() {
  $(document).on("dblclick", "#party .character-picture", actions.openSheet);
  $(document).on("click", "#party .character-picture", actions.selectToken);
  setupHealthPointsTracker("#party .current-health");
}

function setupHealthPointsTracker(element) {
  $(document).on("focus", element, function () {
    this.value = "";
  });

  $(document).on("blur", element, function () {
    this.value = this.dataset.value;
  });

  $(document).on("keyup", element, function (e) {
    if (e.keyCode !== 13) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const actor = game.actors.get(this.dataset.id);
    if (!actor) {
      return;
    }

    const current = this.dataset.value;
    const text = this.value.trim();

    let hpChange;
    if (text.startsWith("+") || text.startsWith("-")) {
      hpChange = -Number(text);
    } else {
      const num = Number(text);
      hpChange = num > current ? -(num - current) : current - num;
    }

    if (!isNaN(hpChange)) {
      actor.update({ ["system.attributes.hp.value"]: current-hpChange});
    }
  });
}

function isGm() {
  return game.users.get(game.userId).isGM;
}

async function renderCharacter() {
  const elem = document.getElementById("player-character");
  if (!elem) return;

  const character = getCharacter();
  if (!character) return;

  const data = await characterData(character);
  if (!data) return;

  const tpl = await renderTemplate(
    "modules/lights-out-theme-shadowdark/templates/character.hbs",
    data
  );

  elem.innerHTML = tpl;
}

async function renderParty() {
  const elem = document.getElementById("party");
  if (!elem) return;

  const characters = await Promise.all(getPartyCharacters().map(characterData));

  const tpl = await renderTemplate("modules/lights-out-theme-shadowdark/templates/party.hbs", {
    characters,
  });

  elem.innerHTML = tpl;

  elem.style.top = `${window.innerHeight / 2 - elem.clientHeight / 2}px`;
}
