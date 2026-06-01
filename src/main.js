import './editor.js';
import { avatarSVG } from './svg-templates.js';

// Enregistrement Lovelace
window.customCards = window.customCards || [];
if (!window.customCards.some(c => c.type === "avatar-weather-card")) {
  window.customCards.push({
    type: "avatar-weather-card",
    name: "Avatar Weather Card",
    description: "Un ou plusieurs personnages qui s'habillent selon la météo.",
    preview: true,
  });
}

// Génération des classes d'état
function generateAvatarClasses(condition, temp) {
  let classes = [];

  if (temp < 10) {
    classes.push('state-froid');
  } else if (temp >= 10 && temp <= 20) {
    if (condition === 'windy' || condition === 'windy-variant') {
      classes.push('state-coupevent');
    } else {
      classes.push('state-tempere');
    }
  } else if (temp > 20) {
    if (condition === 'rainy' || condition === 'pouring' || condition === 'hail') {
      classes.push('state-tempere');
    } else {
      classes.push('state-chaud');
    }
  }

  if (temp < 5) {
    classes.push('state-bonnet');
  }

  if (condition === 'sunny' || condition === 'clear-night') {
    classes.push('state-soleil');
  }
  if (condition === 'rainy' || condition === 'pouring' || condition === 'hail') {
    classes.push('state-pluie');
  }
  if (condition === 'windy' || condition === 'windy-variant') {
    classes.push('state-vent');
  }

  return classes.join(' ');
}

class AvatarWeatherCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._forecastData = null;
    this._subscribed = false;
  }

  static getConfigElement() {
    return document.createElement("avatar-weather-card-editor");
  }

  static getStubConfig() {
    return { 
      entity: "", 
      title: "", 
      show_today: true,
      show_tomorrow: false, 
      show_dany: false, 
      debug: false 
    };
  }
  
  setConfig(config) {
    if (!config.entity) {
      throw new Error("Veuillez sélectionner une entité météo.");
    }
    this.config = config;
    this._subscribed = false;
  }

  getCardSize() {
    return 4; // Équivaut à environ 200px
  }

  async _subscribeForecast(hass) {
    if (this._subscribed || !hass || !this.config.entity) return;
    this._subscribed = true;

    try {
      hass.connection.subscribeMessage(
        (response) => {
          this._forecastData = response.forecast;
          this.updateCardContent(hass);
        },
        {
          type: "weather/subscribe_forecast",
          entity_id: this.config.entity,
          forecast_type: "daily",
        }
      );
    } catch (err) {
      console.error("Erreur lors de la récupération des prévisions via get_forecasts:", err);
    }
  }

  set hass(hass) {
    this._subscribeForecast(hass);
    this.updateCardContent(hass);
  }

  updateCardContent(hass) {
    const entityId = this.config.entity;
    const stateObj = hass.states[entityId];

    if (!stateObj) {
      this.shadowRoot.innerHTML = `<div style="color: red; padding: 16px;">Entité introuvable : ${entityId}</div>`;
      return;
    }

    // Sécurité d'attente asynchrone pour les jours futurs
    if (!this._forecastData) {
      this.shadowRoot.innerHTML = `
        <ha-card style="padding: 16px; text-align: center; color: var(--secondary-text-color);">
          Chargement des prévisions journalières...
        </ha-card>
      `;
      return;
    }

    const title = this.config.title || '';
    const isDebugActive = this.config.debug === true;

    // 1. Déterminer quelles journées doivent être affichées (Défaut sur Aujourd'hui si rien n'est coché)
    const daysToRender = [];
    if (this.config.show_today !== false) daysToRender.push({ index: 0, label: "Aujourd'hui" });
    if (this.config.show_tomorrow === true) daysToRender.push({ index: 1, label: "Demain" });
    if (this.config.show_dany === true) daysToRender.push({ index: 2, label: "Après-demain" });
    
    if (daysToRender.length === 0) {
      daysToRender.push({ index: 0, label: "Aujourd'hui" });
    }

    // 2. Générer le HTML pour chaque avatar demandé
    let avatarsHTML = "";
    let debugHTML = "";

    daysToRender.forEach(day => {
      let condition = stateObj.state;
      let temperature = stateObj.attributes.temperature !== undefined ? parseFloat(stateObj.attributes.temperature) : 0;

      // Extraction depuis le tableau de prévisions de Home Assistant
      if (this._forecastData && this._forecastData.length > day.index) {
        const forecast = this._forecastData[day.index];
        condition = forecast.condition;
        temperature = forecast.temperature_max !== undefined ? parseFloat(forecast.temperature_max) : parseFloat(forecast.temperature);
      }
      if (isNaN(temperature)) temperature = 15;

      const activeClasses = generateAvatarClasses(condition, temperature);

      // Structure d'une colonne d'avatar (Conteneur + Légende jour + SVG)
      avatarsHTML += `
        <div class="avatar-column">
          <div class="avatar-day-label">${day.label}</div>
          <div class="avatar-container ${activeClasses}">
            ${avatarSVG}
          </div>
        </div>
      `;

      // Accumulation des textes de debug pour le panneau inférieur
      if (isDebugActive) {
        debugHTML += `
          <div style="margin-bottom: 6px; border-bottom: 1px dotted rgba(0,0,0,0.1); padding-bottom: 4px;">
            <strong>• ${day.label} (Index ${day.index}) :</strong><br>
            Statut : "${condition}" | Temp Max : ${temperature.toFixed(1)}°C<br>
            Classes : [ ${activeClasses} ]
          </div>
        `;
      }
    });

    this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: block;
          height: 100%;
        }
        
        .card-container { 
          background: var(--ha-card-background, var(--card-background-color, white)); 
          border-radius: var(--ha-card-border-radius, 12px); 
          box-shadow: var(--ha-card-box-shadow, none);
          border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          
          height: var(--ha-card-height, auto);
          max-height: 100%;
          overflow: hidden;
        }
        
        .card-title { 
          font-size: 16px; 
          padding: 12px 16px 0px 16px; /* Légère réduction du padding du titre principal */
          font-weight: bold; 
          color: var(--primary-text-color);
          flex-shrink: 0;
        }
        
        .card-content { 
          padding: 4px; /* ASTUCE 1 : On passe de 16px à 4px pour libérer de la place tout autour */
          display: flex; 
          justify-content: space-around; 
          align-items: stretch; 
          
          flex: 1 1 var(--ha-card-height, auto); 
          min-height: 0;
          height: var(--ha-card-height, auto);
          max-height: 100%;
        }
        
        .avatar-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1 1 0; 
          min-width: 0;
          height: 100%;
          max-height: 100%;
          padding: 0; /* ASTUCE 2 : On supprime les marges horizontales des colonnes */
        }
        
        .avatar-day-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--secondary-text-color);
          margin-bottom: 2px; /* ASTUCE 3 : On rapproche l'étiquette pour faire grandir le SVG */
          flex-shrink: 0;
          text-align: center;
        }
        
        .avatar-container { 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          width: 100%; 
          height: 100%;
          max-height: 100%;
          box-sizing: border-box;
          min-height: 0;
        }
        
        .avatar-container svg { 
          display: block;
          width: 100%; 
          height: 100%; 
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .debug-panel { 
          background-color: rgba(0, 0, 0, 0.05); 
          border-top: 1px dashed var(--divider-color, #e0e0e0); 
          padding: 10px; 
          font-family: monospace; 
          font-size: 11px; 
          color: var(--secondary-text-color);
          flex-shrink: 0;
          max-height: 150px;
          overflow-y: auto;
        }
        
        .debug-title { font-weight: bold; color: var(--warning-color, #ff9800); margin-bottom: 6px; text-transform: uppercase; }
        
        /* Masquage Inkscape safe */
        .meteo-soleil, .meteo-pluie, .meteo-vent, 
        .vetement-chaud, .vetement-tempere, .vetement-coupevent, 
        .vetement-froid, .accessoire-bonnet { display: none !important; }
        
        .state-froid .vetement-froid { display: block !important; }
        .state-tempere .vetement-tempere { display: block !important; }
        .state-coupevent .vetement-coupevent { display: block !important; }
        .state-chaud .vetement-chaud { display: block !important; }
        .state-bonnet .accessoire-bonnet { display: block !important; }
        .state-soleil .meteo-soleil { display: block !important; }
        .state-pluie .meteo-pluie { display: block !important; }
        .state-vent .meteo-vent { display: block !important; }
      </style>

      <div class="card-container">
        ${title.trim() !== "" ? `<div class="card-title">${title}</div>` : ''}\n        <div class="card-content">
          ${avatarsHTML}
        </div>
        
        ${isDebugActive ? `
          <div class="debug-panel">
            <div class="debug-title">🔧 Debug Multi-Avatars (get_forecasts)</div>
            <div style="margin-bottom: 6px;">• Entité : ${entityId}</div>
            ${debugHTML}
          </div>
        ` : ''}
      </div>
    `;
  }
}

if (!customElements.get("avatar-weather-card")) {
  customElements.define("avatar-weather-card", AvatarWeatherCard);
}