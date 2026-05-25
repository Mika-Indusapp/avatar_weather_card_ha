import { LitElement, html, css } from 'lit';

export class AvatarWeatherCardEditor extends LitElement {
  
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object }
    };
  }

  constructor() {
    super();
    this._config = {};
  }

  setConfig(config) {
    this._config = config || {};
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    // Le schéma automatique : Home Assistant va dessiner lui-même les composants parfaits
    const schema = [
      { 
        name: "entity", 
        selector: { entity: { domain: "weather" } } 
      },
      { 
        name: "title", 
        selector: { text: {} } 
      },
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

    return html`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${schema}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }

  // Permet de donner un joli nom en français aux champs du formulaire
  _computeLabel(schema) {
    const labels = {
      entity: "Entité Météo",
      title: "Titre de la carte",
      forecast_day: "Temporalité de l'avatar"
    };
    return labels[schema.name] || schema.name;
  }

  // Reçoit les modifications de ha-form et les renvoie proprement à Lovelace
  _valueChanged(ev) {
    ev.stopPropagation();
    const newConfig = ev.detail.value;

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true
      })
    );
  }

  static get styles() {
    return css`
      .card-config {
        padding: 16px 0;
      }
    `;
  }
}

if (!customElements.get("avatar-weather-card-editor")) {
  customElements.define("avatar-weather-card-editor", AvatarWeatherCardEditor);
}