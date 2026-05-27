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

  // 1. Valeurs par défaut (J+0)
  let condition = stateObj.state;
  
  // Sécurisation de la température J+0 : on cherche partout où elle peut se cacher
  let temperature = 0;
  if (stateObj.attributes && stateObj.attributes.temperature !== undefined) {
    temperature = parseFloat(stateObj.attributes.temperature);
  } else if (!isNaN(parseFloat(stateObj.state))) {
    temperature = parseFloat(stateObj.state);
  }

  const targetDay = parseInt(config.forecast_day || "0", 10);

  // 2. Si prévision J+1 ou J+2, on extrait depuis le tableau forecast
  if (targetDay > 0 && stateObj.attributes && stateObj.attributes.forecast && stateObj.attributes.forecast.length >= targetDay) {
    const forecast = stateObj.attributes.forecast[targetDay - 1];
    condition = forecast.condition;
    // Sur les prévisions, c'est toujours la température maximale de la journée
    temperature = parseFloat(forecast.temperature);
  }

  // Si le calcul a échoué et donne NaN, on force à 15 par sécurité pour éviter les plantages
  if (isNaN(temperature)) temperature = 15;

  return { condition, temperature };
}

// Génération des classes CSS propres
function generateAvatarClasses(condition, temp) {
  let classes = [];

  // Choix du vêtement de base selon la température
  if (temp < 10) {
    classes.push('state-froid');
  } else if (temp >= 10 && temp <= 20) {
    if (condition === 'windy' || condition === 'windy-variant') {
      classes.push('state-coupevent');
    } else {
      classes.push('state-tempere');
    }
  } else if (temp > 20) {
    classes.push('state-chaud');
  }

  // Accessoire Bonnet
  if (temp < 5) {
    classes.push('state-bonnet');
  }

  // Décors météo
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
  }

  static getConfigElement() {
    return document.createElement("avatar-weather-card-editor");
  }

  static getStubConfig() {
    return { entity: "", title: "", forecast_day: "0" };
  }
  
  setConfig(config) {
    if (!config.entity) {
      throw new Error("Veuillez sélectionner une entité météo.");
    }
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    const entityId = this.config.entity;
    const stateObj = hass.states[entityId];

    if (!stateObj) {
      this.shadowRoot.innerHTML = `<div style="color: red; padding: 16px;">Entité introuvable : ${entityId}</div>`;
      return;
    }

    const weatherData = getWeatherData(hass, this.config);
    const activeClasses = weatherData ? generateAvatarClasses(weatherData.condition, weatherData.temperature) : "";
    const title = this.config.title || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: block; 
        }
        .card-container { 
          background: var(--ha-card-background, var(--card-background-color, white)); 
          border-radius: var(--ha-card-border-radius, 12px); 
          box-shadow: var(--ha-card-box-shadow, none);
          border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
          box-sizing: border-box;
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
        }
        .avatar-container { 
          display: flex; 
          justify-content: center; 
          align-items: center;
          width: 100%;
          height: var(--ha-card-height, auto); 
          box-sizing: border-box;
        }
        .avatar-container svg {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        /* 1. TOUT MASQUER PAR DÉFAUT (Le !important écrase le display:inline d'Inkscape) */
        .meteo-soleil, .meteo-pluie, .meteo-vent, 
        .vetement-chaud, .vetement-tempere, .vetement-coupevent, 
        .vetement-froid, .accessoire-bonnet { 
          display: none !important; 
        }
        
        /* 2. RÉAFFICHAGE CONDITIONNEL */
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
      </div>
    `;
  }
}

if (!customElements.get("avatar-weather-card")) {
  customElements.define("avatar-weather-card", AvatarWeatherCard);
}