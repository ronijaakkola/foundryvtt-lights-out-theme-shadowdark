export function registerSettings() {
    game.settings.register("lights-out-theme-shadowdark", "party-only-active", {
        name: game.i18n.localize("LIGHTSOUTSD.config_party_only_active"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_party_only_active_help"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false
    });

    game.settings.register("lights-out-theme-shadowdark", "hide-pc-title", {
        name: game.i18n.localize("LIGHTSOUTSD.config_hide_pc_title"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_hide_pc_title_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    });

    game.settings.register("lights-out-theme-shadowdark", "show_player_hotbar", {
        name: game.i18n.localize("LIGHTSOUTSD.config_show_player_hotbar"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_show_player_hotbar_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    });

    game.settings.register("lights-out-theme-shadowdark", "disable-gm-selected-token", {
        name: game.i18n.localize("LIGHTSOUTSD.config_disable_gm_selected_token"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_disable_gm_selected_token_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    });
}
