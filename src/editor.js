export class AvatarWeatherCardEditor extends HTMLElement {
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
