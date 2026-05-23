class AvatarWeatherCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    this._config = config;
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  render() {
    if (!this._hass || !this._config) return;

    const schema = [
      { name: "entity", selector: { entity: { domain: "weather" } }, required: true },
      { name: "title", selector: { text: {} } },
      {
        name: "forecast_day",
        selector: {
          select: {
            options: [
              { value: "0", label: "Actuelle / Aujourd'hui" },
              { value: "1", label: "Demain (Prévision J+1)" },
              { value: "2", label: "Après-demain (Prévision J+2)" }
            ]
          }
        }
      }
    ];

    this.shadowRoot.innerHTML = `
      <div class="card-config">
        <ha-form
          .hass="${this._hass}"
          .data="${this._config}"
          .schema="${schema}"
          .computeLabel="${(s) => this._computeLabel(s)}"
        ></ha-form>
      </div>
    `;

    this.shadowRoot.querySelector("ha-form").addEventListener("value-changed", (ev) => {
      const config = ev.detail.value;
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
    });
  }

  _computeLabel(schema) {
    const labels = { entity: "Entité Météo", title: "Titre de la carte", forecast_day: "Temporalité" };
    return labels[schema.name] || schema.name;
  }
}

// Enregistrement pour la recherche Lovelace
window.customCards = window.customCards || [];
window.customCards.push({
  type: "avatar-weather-card",
  name: "Avatar Weather Card",
  description: "Un personnage qui s'habille selon la météo.",
  preview: true,
});

class AvatarWeatherCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static getConfigElement() {
    return document.createElement("avatar-weather-card-editor");
  }

  static getStubConfig() {
    return { entity: "", title: "Mon Avatar Météo", forecast_day: "0" };
  }
  
  setConfig(config) {
    this.config = {
      title: "Mon Avatar Météo",
      forecast_day: "0",
      ...config
    };
  }

  set hass(hass) {
    this._hass = hass;
    const entityId = this.config.entity;
    const stateObj = hass.states[entityId];

    if (!stateObj) {
      this.shadowRoot.innerHTML = `<div style="color: red; padding: 16px;">Entité introuvable</div>`;
      return;
    }

    stateObj.state;
    const targetDay = parseInt(this.config.forecast_day || "0", 10);

    if (targetDay > 0 && stateObj.attributes.forecast) {
      const forecast = stateObj.attributes.forecast;
      if (forecast && forecast.length >= targetDay) {
        forecast[targetDay - 1].condition;
      }
    }
    this.config.title || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .card-container { background: var(--ha-card-background, white); border-radius: 12px; padding: 16px; box-shadow: var(--ha-card-box-shadow); }
        .card-title { font-size: 16px; margin-bottom: 12px; font-weight: bold; }
        .avatar-container { display: flex; justify-content: center; height: 320px; }
        
        .meteo-soleil, .meteo-pluie, .meteo-vent, .vetement-chaud, .vetement-tempere, .vetement-coupevent, .vetement-froid, .accessoire-bonnet { display: none; }
        .state-sunny .meteo-soleil, .state-sunny .vetement-chaud { display: block; }
        .state-temperate .vetement-tempere { display: block; }
        .state-windy .vetement-coupevent, .state-windy .meteo-vent { display: block; }
        .state-rainy .meteo-pluie, .state-rainy .vetement-tempere { display: block; }
        .state-snowy .vetement-froid, .state-snowy .accessoire-bonnet { display: block; }
      </style>

      <div class="card-container">
        \${title ? \`<div class="card-title">\${title}</div>\` : ''}
        <div class="avatar-container state-\${weatherClass}">
          \${avatarSVG} </div>
      </div>
    `;
  }
}

// Enregistrement des deux éléments
customElements.define("avatar-weather-card-editor", AvatarWeatherCardEditor);
customElements.define("avatar-weather-card", AvatarWeatherCard);
