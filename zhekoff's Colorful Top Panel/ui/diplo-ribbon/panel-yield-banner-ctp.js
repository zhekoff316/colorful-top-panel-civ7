/**
 * @file panel-yield-banner-ctp.js
 * @description Colorful Top Panel mod with scaling options
 */

import { PanelYieldBanner } from '/base-standard/ui/diplo-ribbon/panel-yield-banner.js';
import { colorfulTopPanelSettings } from 'fs://game/colorful-top-panel/ui/settings/settings.js';
import { MAIN_STYLES } from './css-constants.js';

// Scale factors for different UI elements
const SCALE_FACTORS = {
    DEFAULT: 1.0,
    COMPACT: 0.9
};

// Create and apply CSS styles based on current settings
function applyStyles() {
    // Remove any existing styles first
    const existingStyle = document.getElementById('colorful-top-panel-style');
    if (existingStyle) {
        existingStyle.remove();
    }

    const style = document.createElement('style');
    style.id = 'colorful-top-panel-style';
    
    // Get current panel size setting
    const isCompact = colorfulTopPanelSettings.PanelSize === 1;
    const scaleFactor = isCompact ? SCALE_FACTORS.COMPACT : SCALE_FACTORS.DEFAULT;
    
    // Start with base style
    let styleContent = MAIN_STYLES;
    
    // Add scaling transform if compact mode is enabled
    if (isCompact) {
        styleContent += `
        /* Apply scale to the entire container - much simpler approach */
        .panel-yield__top-bar-content {
            transform: scale(${scaleFactor});
            transform-origin: left center;
        }
        `;
    }
    
    // Apply the styles
    style.textContent = styleContent;
    document.head.appendChild(style);
}

// Patch the original render method to add our custom class
const originalRender = PanelYieldBanner.prototype.render;
PanelYieldBanner.prototype.render = function() {
    originalRender.apply(this, arguments);
    this.settlementCapElement.classList.add('yield-panel-settlements');
};

// Initialize the mod
engine.whenReady.then(() => {
    try {
        // Import settings initialization module
        import('fs://game/colorful-top-panel/ui/settings/settings-init.js');
        
        // Apply initial styles
        applyStyles();
        
        // Listen for settings changes
        window.addEventListener('colorful-top-panel-settings-changed', applyStyles);
    } catch (error) {
        console.error("Colorful Top Panel initialization error:", error);
    }
});

// Apply styles immediately if engine is already ready
if (engine.isReady) {
    applyStyles();
}
