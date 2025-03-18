/**
 * Copyright 2025 dylanabke
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';

/**
 * `rpg-character`
 * 
 * @demo index.html
 * @element rpg-character
 */
export class RpgCharacter extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-character";
  }

  constructor() {
    super();
    this.title = "";
    this.items = [];
    this.organization = "haxtheweb";
    this.repository = "webcomponents";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/rpg-character.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      items: { type: Array },
      organization: { type: String },
      repository: { type: String },
      limit: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--rpg-character-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  getData() {
    const url = `https://api.github.com/repos/${this.organization}/${this.repository}/contributors`;
    try{
      fetch(url).then(d => d.ok ? d.json(): {}).then(data => {
        if (data) {
  
          this.items = [data];
          console.log(this.items);
        }  
      }
    }
  }

  // Lit render the HTML
  render() {
    return html`
    <h2>${this.title}</h2>
    <details open>
      <summary>Search inputs</summary>
      <div>

      </div>
    </details>
    <div class="results">
      ${this.items.map((item, index) => html`
      <rpg-character
        seed="${item.login}"
      ></rpg-character>
      `)}
    </div>
    `;
  }

  
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    super.updated(changedProperties);
    // see if value changes from user input and is not empty
    //if (changedProperties.has('organization')) {
     // this.updateResults();
    //}
    this.updateResults();
    
  }

  updateResults() {
    fetch(`https://api.github.com/repos/${this.organization}/${this.repository}/contributors`).then(d => d.ok ? d.json(): {}).then(data => {
      if (data) {
        this.items = [];
        this.items = data;
        console.log(this.items);
      
      }  
    });
  }
  
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(RpgCharacter.tag, RpgCharacter);