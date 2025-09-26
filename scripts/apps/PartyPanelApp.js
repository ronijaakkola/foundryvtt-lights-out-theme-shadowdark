import { openSheet, selectToken } from "../actions.js";
import { setupHealthPointsTracker } from "../helpers.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export class PartyPanelApp extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        id: "party",
        tag: "div",
        position: {
            width: "auto",
            height: "auto",
        },
        window: {
            frame: false,
            positioned: false,
        },
    }

    static PARTS = {
        main: {
            template: "modules/lights-out-theme-shadowdark/templates/party.hbs"
        }
    }

    constructor(data = {}, options = {}) {
        super(options);
        this.partyData = data;
    }

    updateData(data) {
        this.partyData = data;
        this.render();
    }

    _prepareContext(options) {
        const hidePartyHealth = game.settings.get("lights-out-theme-shadowdark", "hide_party_health");
        const isGM = game.user.isGM;
        const userCharacterUuid = game.user.character?.uuid;

        return {
            hidePartyHealth: isGM ? false : hidePartyHealth, // GMs always sees health
            userCharacterUuid: userCharacterUuid,
            characters: this.partyData,
        };
    }

    _insertElement(element) {
        const existing = document.getElementById(element.id);

        const anchorElementId = "#scene-controls";
        const anchor = document.querySelector(`${anchorElementId}`);
        if (!anchor) {
            // TODO: Handle this more gracefully, e.g. if the user
            // has hidden the scene controls using a module.
            console.warn(`Anchor element ${anchorElementId} not found. Party panel cannot be rendered.`);
            return;
        }
        
        if (existing) {
            if (existing.parentElement !== anchor) {
                existing.remove();
                anchor.insertAdjacentElement("afterend", element);
            } else {
                existing.replaceWith(element);
            }
        } else {
            anchor.insertAdjacentElement("afterend", element);
        }

        const fade = game.settings.get("lights-out-theme-shadowdark", "use-foundry-interface-fading");
        if (fade) {
            element.classList.add("faded-ui");
        }
    }

    _onRender(context, options) {
        // Event listener for opening the character sheet
        const character = document.querySelectorAll("#party .character-picture");
        if (character.length > 0) {
            character.forEach(el => {
                el.addEventListener("click", selectToken);
                el.addEventListener("dblclick", openSheet);
            });
        }

        // Register HP input handlers
        const healthInputs = this.element.querySelectorAll('.current-health');
        for (const input of healthInputs) {
            setupHealthPointsTracker(input);
        }
    }
}