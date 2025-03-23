/**
 * @file settings.js
 * @description Settings management for Colorful Top Panel mod
 */

/**
 * Please, always use ModSettingsManager to save and read settings in your mod.
 * Right now if you try to use **multiple** keys in localStorage, it will break reading
 * from localStorage for **every mod**. This is a workaround to avoid this issue, while
 * keeping a namespace to give each mod its own settings.
 */
const ModSettingsManager = {
    save(key, data) {
        if (localStorage.length > 1) {
            localStorage.clear();
        }  
        const modSettings = JSON.parse(localStorage.getItem("modSettings") || '{}');
        modSettings[key] = data;
        localStorage.setItem("modSettings", JSON.stringify(modSettings));
    },
    read(key) {
        const modSettings = localStorage.getItem("modSettings");
        try {
            if (modSettings) {
                const data = JSON.parse(modSettings || '{}')[key];
                if (data) {
                    return data;
                }
            }
            return null;
        }
        catch (e) {
            console.error(`[ModSettingsManager][${key}] Error loading settings`, e);
        }
        return null;
    }
};

// Settings for Colorful Top Panel
export const colorfulTopPanelSettings = new class {
    _data = {
        PanelSize: 0 // 0 = Default, 1 = Compact
    };

    constructor() {
        const modSettings = ModSettingsManager.read("colorfulTopPanelSettings");
        if (modSettings) {
            this._data = modSettings;
        }
    }

    save() {
        ModSettingsManager.save("colorfulTopPanelSettings", this._data);
    }

    get PanelSize() {
        return this._data.PanelSize;
    }
    
    set PanelSize(value) {
        this._data.PanelSize = value;
        this.save();
    }
};
