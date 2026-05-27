import { LitElement, html, css } from 'lit';
import './editor.js';
import { avatarSVG } from './svg-templates.js';

// ==========================================
//          LOGIQUE MÉTIER DE L'AVATAR
// ==========================================

function getWeatherData(hass, config) {
  const entityId = config.entity;
  if (!entityId || !hass.states[entityId]) return null;
  const stateObj = hass.states[entityId];

  let condition = stateObj.state;
  let temperature = parseFloat(stateObj.state === 'unknown' ? 0 : stateObj.properties?.temperature || stateObj.attributes.temperature || 0);
  
  const targetDay = parseInt(config.forecast_day || "0", 10);

  // Si on cherche J+1 ou J+2, on va fouiller dans les prévisions
  if (targetDay > 0 && stateObj.attributes.forecast && stateObj.attributes.forecast.length >= targetDay) {
    const forecast = stateObj.attributes.forecast[targetDay - 1];
    condition = forecast.condition;
    // On prend la température maximale prévue pour la journée cible
    temperature = parseFloat(forecast.temperature);
  }

  return { condition, temperature };
}

function generateAvatarClasses(condition, temp) {
  let classes = [];

  // 1. Logique des vêtements de base selon la température
  if (temp < 10) {
    classes.push('vetement-froid');
  } else if (temp >= 10 && temp <= 20) {
    // Règle spéciale : si du vent est prévu entre 10 et 20°C, on met le coupe-vent
    if (condition === 'windy' || condition === 'windy-variant') {
      classes.push('vetement-coupevent');
    } else {
      classes.push('vetement-tempere');
    }
  } else if (temp > 20) {
    classes.push('vetement-chaud');
  }

  // 2. Ajout de l'accessoire bonnet si en dessous de 5°C
  if (temp < 5) {
    classes.push('accessoire-bonnet');
  }

  // 3. Ajout des décors météo selon le statut de l'entité
  if (condition === 'sunny' || condition === 'clear-night') {
    classes.push('meteo-soleil');
  }
  if (condition === 'rainy' || condition === 'pouring' || condition === 'hail') {
    classes.push('meteo-pluie');
  }
  if (condition === 'windy' || condition === 'windy-variant') {
    classes.push('meteo-vent');
  }

  // Retourne la liste des classes séparées par un espace (ex: "vetement-froid accessoire-bonnet meteo-soleil")
  return classes.join(' ');
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

    // Récupération des données météo calculées (température + statut)
    const weatherData = getWeatherData(this.hass, this._config);
    
    let activeClasses = "";
    if (weatherData) {
      activeClasses = generateAvatarClasses(weatherData.condition, weatherData.temperature);
    }

    const hasTitle = this._config.title && this._config.title.trim() !== "";

    return html`
      <ha-card .header=${hasTitle ? this._config.title : undefined}>
        <div class="card-content">
          <div class="avatar-container ${activeClasses}" .innerHTML=${avatarSVG}>
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
      
      /* ==========================================
         LOGIQUE VISUELLE DE SÉLECTION DES COUCHES
         ========================================== */
         
      /* 1. Tout masquer par défaut */
      .meteo-soleil, .meteo-pluie, .meteo-vent, 
      .vetement-chaud, .vetement-tempere, .vetement-coupevent, 
      .vetement-froid, .accessoire-bonnet { 
        display: none; 
      }

      /* 2. Affichage direct si la classe est présente sur le conteneur parent */
      .vetement-froid .vetement-froid { display: block; }
      .vetement-tempere .vetement-tempere { display: block; }
      .vetement-coupevent .vetement-coupevent { display: block; }
      .vetement-chaud .vetement-chaud { display: block; }
      
      .accessoire-bonnet .accessoire-bonnet { display: block; }
      
      .meteo-soleil .meteo-soleil { display: block; }
      .meteo-pluie .meteo-pluie { display: block; }
      .meteo-vent .meteo-vent { display: block; }
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