import { LitElement, html, css } from 'lit';
import './editor.js';
import { avatarSVG } from './svg-templates.js';

// ==========================================
//          LOGIQUE MÉTIER DE L'AVATAR
// ==========================================

function getWeatherState(hass, config) {
  const entityId = config.entity;
  if (!entityId || !hass.states[entityId]) return null;
  const stateObj = hass.states[entityId];

  let weatherState = stateObj.state;
  const targetDay = parseInt(config.forecast_day || "0", 10);

  if (targetDay > 0 && stateObj.attributes.forecast && stateObj.attributes.forecast.length >= targetDay) {
    weatherState = stateObj.attributes.forecast[targetDay - 1].condition;
  }
  return weatherState;
}

function getWeatherClass(weatherState) {
  if (!weatherState) return 'temperate';
  const mapping = {
    'sunny': 'sunny',
    'clear-night': 'sunny',
    'rainy': 'rainy',
    'pouring': 'rainy',
    'hail': 'rainy',
    'snowy': 'snowy',
    'snowy-rainy': 'snowy',
    'windy': 'windy',
    'windy-variant': 'windy',
    'cloudy': 'temperate',
    'partlycloudy': 'temperate',
    'fog': 'temperate'
  };
  return mapping[weatherState] || 'temperate';
}

// ==========================================
//          COMPOSANT CARTE PRINCIPAL
// ==========================================

class AvatarWeatherCard extends LitElement {
  
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object }
    };
  }

  static getConfigElement() {
    return document.createElement("avatar-weather-card-editor");
  }

  static getStubConfig() {
    return {
      entity: "",
      title: "", 
      forecast_day: "0"
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Veuillez sélectionner une entité météo.");
    }
    this._config = config;
  }

  render() {
    if (!this.hass || !this._config) return html``;

    const entityId = this._config.entity;
    const stateObj = this.hass.states[entityId];

    if (!stateObj) {
      return html`
        <ha-card>
          <div class="error" style="padding: 16px; color: var(--error-color);">
            Entité introuvable : ${entityId}
          </div>
        </ha-card>
      `;
    }

    const weatherState = getWeatherState(this.hass, this._config);
    const weatherClass = getWeatherClass(weatherState);
    const hasTitle = this._config.title && this._config.title.trim() !== "";

    // LA SOLUTION EST ICI : Utilisation de .innerHTML natif pour injecter le SVG
    // Plus besoin de unsafeHTML !
    return html`
      <ha-card .header=${hasTitle ? this._config.title : undefined}>
        <div class="card-content">
          <div class="avatar-container state-${weatherClass}" .innerHTML=${avatarSVG}>
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
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
        width: 100%;
        max-width: 250px;
        height: auto;
      }
      
      .meteo-soleil, .meteo-pluie, .meteo-vent, 
      .vetement-chaud, .vetement-tempere, .vetement-coupevent, 
      .vetement-froid, .accessoire-bonnet { 
        display: none; 
      }

      .state-sunny .meteo-soleil, .state-sunny .vetement-chaud { display: block; }
      .state-temperate .vetement-tempere { display: block; }
      .state-windy .vetement-coupevent, .state-windy .meteo-vent { display: block; }
      .state-rainy .meteo-pluie, .state-rainy .vetement-tempere { display: block; }
      .state-snowy .vetement-froid, .state-snowy .accessoire-bonnet { display: block; }
    `;
  }
}

if (!customElements.get("avatar-weather-card")) {
  customElements.define("avatar-weather-card", AvatarWeatherCard);
}

const registerCard = () => {
  window.customCards = window.customCards || [];
  if (!window.customCards.some(c => c.type === "avatar-weather-card")) {
    window.customCards.push({
      type: "avatar-weather-card",
      name: "Avatar Weather Card",
      description: "Un personnage qui s'habille selon la météo.",
      preview: true,
    });
  }
};

registerCard();
if (window.loadCardHelpers) {
  registerCard();
}