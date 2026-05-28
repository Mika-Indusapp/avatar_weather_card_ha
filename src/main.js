import './editor.js';
import { avatarSVG } from './svg-templates.js';

// Enregistrement Lovelace
window.customCards = window.customCards || [];
if (!window.customCards.some(c => c.type === "avatar-weather-card")) {
  window.customCards.push({
    type: "avatar-weather-card",
    name: "Avatar Weather Card",
    description: "Un personnage qui s'habille selon la météo.",
    preview: true,
  });
}

// Extraction robuste des données météo
function getWeatherData(hass, config) {
  const entityId = config.entity;
  if (!entityId || !hass.states[entityId]) return null;
  const stateObj = hass.states[entityId];

  let condition = stateObj.state;
  let temperature = 0;

  if (stateObj.attributes && stateObj.attributes.temperature !== undefined) {
    temperature = parseFloat(stateObj.attributes.temperature);
  } else if (!isNaN(parseFloat(stateObj.state))) {
    temperature = parseFloat(stateObj.state);
  }
  
  const targetDay = parseInt(config.forecast_day || "0", 10);

  if (targetDay > 0 && stateObj.attributes && stateObj.attributes.forecast && stateObj.attributes.forecast.length >= targetDay) {
    const forecast = stateObj.attributes.forecast[targetDay - 1];
    condition = forecast.condition;
    temperature = parseFloat(forecast.temperature);
  }

  if (isNaN(temperature)) temperature = 15;

  return { condition, temperature };
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
    return { entity: "", title: "", forecast_day: "0", debug: false };
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

    const targetDay = parseInt(this.config.forecast_day || "0", 10);

    // Initialisation des valeurs par défaut (J+0)
    let condition = stateObj.state;
    let temperature = stateObj.attributes.temperature !== undefined ? parseFloat(stateObj.attributes.temperature) : 0;

    // Si on cherche J+1 ou J+2 et qu'on a bien reçu les données de l'abonnement
    if (this._forecastData && this._forecastData.length > targetDay) {
      const forecast = this._forecastData[targetDay];
      condition = forecast.condition;
      temperature = forecast.temperature_max !== undefined ? parseFloat(forecast.temperature_max) : parseFloat(forecast.temperature);
    }

    if (isNaN(temperature)) temperature = 15;

    const activeClasses = generateAvatarClasses(condition, temperature);
    const title = this.config.title || '';
    const isDebugActive = this.config.debug === true;

    this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: flex;
          flex-direction: column;
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
          height: 100%;
          width: 100%;
          flex: 1 1 auto;
        }
        .card-title { 
          font-size: 16px; 
          padding: 16px 16px 0px 16px;
          font-weight: bold; 
          color: var(--primary-text-color);
        }
        .card-content {
          padding: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1 1 auto;
        }
        .avatar-container { 
          display: flex; 
          justify-content: center; 
          align-items: center;
          width: 100%;
          height: 100%; 
          box-sizing: border-box;
        }
        .avatar-container svg {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        /* ZONE DE DEBUG SOUHAITÉE */
        .debug-panel {
          background-color: rgba(0, 0, 0, 0.05);
          border-top: 1px dashed var(--divider-color, #e0e0e0);
          padding: 10px;
          font-family: monospace;
          font-size: 11px;
          color: var(--secondary-text-color);
        }
        .debug-title {
          font-weight: bold;
          color: var(--warning-color, #ff9800);
          margin-bottom: 4px;
          text-transform: uppercase;
        }
        
        /* LOGIQUE DES CALQUES SVG (Inkscape protect) */
        .meteo-soleil, .meteo-pluie, .meteo-vent, 
        .vetement-chaud, .vetement-tempere, .vetement-coupevent, 
        .vetement-froid, .accessoire-bonnet { 
          display: none !important; 
        }
        
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
        ${title.trim() !== "" ? `<div class="card-title">${title}</div>` : ''}
        <div class="card-content">
          <div class="avatar-container ${activeClasses}">
            ${avatarSVG}
          </div>
        </div>
        
        ${isDebugActive ? `
          <div class="debug-panel">
            <div class="debug-title">🔧 Données de Debug de l'Avatar</div>
            <div>• Entité cible : ${entityId}</div>
            <div>• Jour sélectionné : J+${targetDay}</div>
            <div>• Statut extrait : "${condition}"</div>
            <div>• Température calculée : ${temperature.toFixed(1)}°C</div>
            <div>• Classes CSS actives : [ ${activeClasses} ]</div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

if (!customElements.get("avatar-weather-card")) {
  customElements.define("avatar-weather-card", AvatarWeatherCard);
}