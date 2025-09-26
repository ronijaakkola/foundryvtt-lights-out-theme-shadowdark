export function registerSettings() {

    game.settings.register("lights-out-theme-shadowdark", 'party_panel_visibility', {
        name: game.i18n.localize("LIGHTSOUTSD.config_party_panel_visibility"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_party_panel_visibility_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Number,
        choices: {
            0: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_0"),
            1: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_1"),
            2: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_2")
        },
        default: 2
    });

    game.settings.register("lights-out-theme-shadowdark", 'hotbar_visibility', {
        name: game.i18n.localize("LIGHTSOUTSD.config_hotbar_visibility"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_hotbar_visibility_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Number,
        choices: {
            0: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_0"),
            1: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_1"),
            2: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_2")
        },
        default: 2
      });

    game.settings.register("lights-out-theme-shadowdark", 'navbar_visibility', {
        name: game.i18n.localize("LIGHTSOUTSD.config_navbar_visibility"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_navbar_visibility_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Number, 
        choices: {
            0: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_0"),
            1: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_1"),
            2: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_2")
        },
        default: 0
    });

    
    game.settings.register("lights-out-theme-shadowdark", 'players_list_visibility', {
        name: game.i18n.localize("LIGHTSOUTSD.config_player_list_visibility"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_player_list_visibility_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Number,
        choices: {
            0: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_0"),
            1: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_1"),
            2: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_2")
        },
        default: 2
    });

    game.settings.register("lights-out-theme-shadowdark", "party-only-active", {
        name: game.i18n.localize("LIGHTSOUTSD.config_party_only_active"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_party_only_active_help"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false
    });

    game.settings.register("lights-out-theme-shadowdark", "hide_party_health", {
        name: game.i18n.localize("LIGHTSOUTSD.config_hide_party_health"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_hide_party_health_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    });

    /*
    game.settings.register("lights-out-theme-shadowdark", "hide-pc-title", {
        name: game.i18n.localize("LIGHTSOUTSD.config_hide_pc_title"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_hide_pc_title_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false  
    });
    */

    game.settings.register("lights-out-theme-shadowdark", "disable-gm-selected-token", {
        name: game.i18n.localize("LIGHTSOUTSD.config_disable_gm_selected_token"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_disable_gm_selected_token_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    });

    game.settings.register("lights-out-theme-shadowdark", "use-foundry-interface-fading", {
        name: game.i18n.localize("LIGHTSOUTSD.config_use_foundry_interface_fading"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_use_foundry_interface_fading_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    });

    game.settings.register("lights-out-theme-shadowdark", "icon-high-contrast-mode", {
        name: game.i18n.localize("LIGHTSOUTSD.config_icon_high_contrast_mode"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_icon_high_contrast_mode_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    });
}
