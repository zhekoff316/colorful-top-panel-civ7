/**
 * @file settings-init.js
 * @description Initialize settings for Colorful Top Panel mod
 */

import { Options, OptionType } from '/core/ui/options/model-options.js';
import { CategoryData, CategoryType } from '/core/ui/options/options-helpers.js';
import { colorfulTopPanelSettings } from 'fs://game/colorful-top-panel/ui/settings/settings.js';

// We add a dependency on the Options module to ensure default options are loaded before we add our own
import '/core/ui/options/options.js';

// Ensure the Mods category exists
CategoryType["Mods"] = "mods";
CategoryData[CategoryType.Mods] = {
    title: "LOC_UI_CONTENT_MGR_SUBTITLE",
    description: "LOC_UI_CONTENT_MGR_SUBTITLE_DESCRIPTION",
};

// Register options with the game's options system
Options.addInitCallback(() => {
    // Panel Size dropdown initialization
    const onPanelSizeInit = (optionInfo) => {
        optionInfo.selectedItemIndex = colorfulTopPanelSettings.PanelSize;
    };

    // Panel Size dropdown update handler
    const onPanelSizeUpdate = (optionInfo, value) => {
        colorfulTopPanelSettings.PanelSize = value;
        
        // Dispatch an event to notify that settings have changed
        window.dispatchEvent(new CustomEvent('colorful-top-panel-settings-changed'));
    };

    // Available panel size options
    const panelSizeOptions = [
        { setting: 0, label: "LOC_MOD_ZHEKOFF_TOP_PANEL_SIZE_DEFAULT" },
        { setting: 1, label: "LOC_MOD_ZHEKOFF_TOP_PANEL_SIZE_COMPACT" }
    ];

    Options.addOption({ 
        category: CategoryType.Mods,
        group: 'ZHEKOFF_COLORFUL_TOP_PANEL',
        type: OptionType.Dropdown,
        id: "zhekoff-top-panel-size",
        initListener: onPanelSizeInit,
        updateListener: onPanelSizeUpdate,
        label: "LOC_MOD_ZHEKOFF_TOP_PANEL_SIZE_NAME",
        description: "LOC_MOD_ZHEKOFF_TOP_PANEL_SIZE_DESCRIPTION",
        dropdownItems: panelSizeOptions
    });
});
