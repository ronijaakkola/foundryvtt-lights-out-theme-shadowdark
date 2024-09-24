import {
  getCharacter,
  getPartyCharacters,
  characterData,
  tokenData
} from "./character.js";
import * as actions from "./actions.js";
import { isGm } from "./utils.js";
import { registerSettings } from "./settings.js";

let init = false;

Hooks.on("renderApplication", async function () {
  if (isGm()) {
    $("#players").removeClass("hidden");
    $("#hotbar").removeClass("hidden");
  } else {
    $("#players").addClass("hidden");

    if (!game.settings.get("lights-out-theme-shadowdark", "show_player_hotbar")) {
      $("#hotbar").addClass("hidden");
    }
  }

  // NOTE: Shadowdark systems light tracking calls renderApplication
  // repeatedly. To avoid unnecessary rerenders of the UI, we will only
  // call these on the first time around. 
  if (!init) {
    await renderCharacter();
    await renderParty();
    init = true;
  }
});

Hooks.on("updateActor", async function (actor) {
  if (isGm() || actor.id === getCharacter()?.id) {
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

Hooks.on('updateUser', async function () {
  await renderCharacter();
  await renderParty();
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

    let actor;
    if (this.dataset.token === "true") {
      let scene = game.canvas.scene;
      actor = scene.tokens.find(item => item.delta.id === this.dataset.id).actor;
    }
    else {
      actor = game.actors.get(this.dataset.id);
    }

    if (!actor) {
      return;
    }

    const currentHP = this.dataset.value;
    const inputValue = this.value.trim();

    let damageAmount;
    let multiplier;

    if (inputValue.startsWith('+')) {
      damageAmount = parseInt(inputValue.slice(1), 10);
      multiplier = -1;
    } else if (inputValue.startsWith('-')) {
      damageAmount = parseInt(inputValue.slice(1), 10);
      multiplier = 1;
    } else {
      const newHP = parseInt(inputValue, 10);
      damageAmount = currentHP - newHP;
      multiplier = 1; 
    }

    if (!isNaN(damageAmount)) {
      actor.applyDamage(damageAmount, multiplier);
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

  let data;
  if (character.prototypeToken) {
    data = await characterData(character);
  }
  else {
    data = await tokenData(character);
  }

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
