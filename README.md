# Lights Out - Shadowdark theme for FoundryVTT
This module adds a darker and more fitting user interface theme for the Shadowdark system in the FoundryVTT platform. This module has been modified and adapted for the Shadowdark system from [erizocosmico's Fancy UI 5e module](https://github.com/erizocosmico/foundryvtt-fancy-ui-5e).

## How to install
While the theme is in beta, it is only possible to install it by adding the manifest URL to FoundryVTT manually. To do this:
1. Go to the FoundryVTT admin view
2. Go to the "Add-on Modules" tab
3. Select "Install Module"
4. Paste the URL `https://github.com/ronijaakkola/foundryvtt-lights-out-theme-shadowdark/releases/download/v0.1/module.json` to the "Manifest URL".
5. Press "Install" button.

## Features
- A player character panel, featuring
  - Showing general character info (HP, AC, luck, name, title and class)
  - Quick access to the character sheet
  - Quickly changing hit points
- A party panel, features
  - Showing all party members and their hit points
  - Quickly changing hit points of a certain party member
- Hiding unnecessary UI elements from players (navigation, player list, hotbar)
- Improved dark mode UI for Shadowdark's chat messages

## Supported modules
Since this module heavily alters Foundry's look and elements, some other modules may not work properly with it. If you are using a module that does not work, consider opening a pull request or opening an issue to add support for it.

Currently, _officially_ supported modules are:
- [ConversationHUD](https://foundryvtt.com/packages/conversation-hud)
- [Dice Tray](https://foundryvtt.com/packages/dice-calculator)
