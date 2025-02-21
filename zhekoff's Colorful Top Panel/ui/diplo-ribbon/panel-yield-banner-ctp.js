import { PanelYieldBanner } from '/base-standard/ui/diplo-ribbon/panel-yield-banner.js';

const style = document.createElement('style');
style.textContent = `
/* General background settings */
.panel-yield__top-bar-content .text-yield-gold,
.panel-yield__top-bar-content .text-yield-diplomacy, 
.panel-yield__top-bar-content .text-yield-science, 
.panel-yield__top-bar-content .text-yield-culture, 
.panel-yield__top-bar-content .text-yield-happiness, 
.panel-yield__top-bar-content .yield-panel-settlements {
    color: #FFFFFF !important;
    border-radius: 8px;
    padding-right: 10px;
    margin: 3px;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    overflow: hidden;
    transition: background-color 0.3s ease;
}

/* Yield backgrounds */
.panel-yield__top-bar-content .text-yield-gold {
    background-color: rgba(255, 235, 75, 0.3);
}

.panel-yield__top-bar-content .text-yield-gold:hover {
    background-color: rgba(255, 235, 75, 0.5);
}

.panel-yield__top-bar-content .text-yield-diplomacy {
    background-color: rgba(88, 192, 231, 0.3);
}

.panel-yield__top-bar-content .text-yield-diplomacy:hover {
    background-color: rgba(88, 192, 231, 0.5);
}

.panel-yield__top-bar-content .text-yield-science {
    background-color: rgba(50, 151, 255, 0.3);
}

.panel-yield__top-bar-content .text-yield-science:hover {
    background-color: rgba(50, 151, 255, 0.5);
}

.panel-yield__top-bar-content .text-yield-culture {
    background-color: rgba(197, 75, 255, 0.3);
}

.panel-yield__top-bar-content .text-yield-culture:hover {
    background-color: rgba(197, 75, 255, 0.5);
}

.panel-yield__top-bar-content .text-yield-happiness {
    background-color: rgba(253, 175, 50, 0.3);
}

.panel-yield__top-bar-content .text-yield-happiness:hover {
    background-color: rgba(253, 175, 50, 0.5);
}

.panel-yield__top-bar-content .yield-panel-settlements {
    background-color: rgba(228, 228, 228, 0.3);
}

.panel-yield__top-bar-content .yield-panel-settlements:hover {
    background-color: rgba(228, 228, 228, 0.5);
}

/* System bar components have to re-centered */
.system-bar-container {
	margin-top: 3px;
}
`;
document.head.appendChild(style);

const originalRender = PanelYieldBanner.prototype.render;
PanelYieldBanner.prototype.render = function() {
  originalRender.apply(this, arguments);
  this.settlementCapElement.classList.add('yield-panel-settlements');
};
