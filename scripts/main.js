import {
  getCharacter,
  getPartyCharacters,
  characterData,
} from "./character.js";
import * as actions from "./actions.js";
import { isGm } from "./utils.js";
import { registerSettings } from "./settings.js";

Hooks.on("renderApplication", async function () {
  await renderCharacter();
  await renderParty();

  if (isGm()) {
    $("#players").removeClass("hidden");
    $("#hotbar").removeClass("hidden");
  } else {
    $("#players").addClass("hidden");

    if (!game.settings.get("lights-out-theme-shadowdark", "show_player_hotbar")) {
      $("#hotbar").addClass("hidden");
    }
  }
});

Hooks.on("updateActor", async function (actor) {
  if (actor.id === getCharacter()?.id) {
    await renderCharacter();
  }

  await renderParty();
});

Hooks.on('controlToken', async function () {
  if (!isGm() || game.settings.get("lights-out-theme-shadowdark", "disable-gm-selected-token")) return;
  await renderCharacter(true);
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
  registerSettings();
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

async function renderCharacter(s = false) {
  const elem = document.getElementById("player-character");
  if (!elem) return;

  const character = getCharacter();
  if (!character) {
    elem.parentNode.removeChild(elem);
    $("body.game").append('<div id="player-character"></div>');
    return;
  }

  const data = await characterData(character);
  if (!data) return;

  const settings = {
    hide_title: game.settings.get("lights-out-theme-shadowdark", "hide-pc-title"),
  }
  data.settings = settings;

  // Mark if the render was triggered by a selection
  data.selected = s;

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
    characters
  });

  elem.innerHTML = tpl;

  elem.style.top = `${window.innerHeight / 2 - elem.clientHeight / 2}px`;
}
