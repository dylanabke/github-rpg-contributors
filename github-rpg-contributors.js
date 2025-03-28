/**
 * Copyright 2025 dylanabke
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';

/**
 * `github-rpg-contributors`
 *
 * @demo index.html
 * @element github-rpg-contributors
 */
export class GithubRpgContributors extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "github-rpg-contributors";
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
        new URL("./locales/github-rpg-contributors.ar.json", import.meta.url).href +
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
        display: flex;
        flex-direction: column;


      }
      h3 span {
        font-size: var(--github-rpg-contributors-label-font-size, var(--ddd-font-size-s));
      }
      .rpg-wrapper {
        display: inline-flex;

      }
      input {
        padding: var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-s);
      }
      button {
        padding: var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-s);
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
      <h3>GitHub Repo: <a href="https://github.com/${this.organization}/${this.repository}">${this.organization}/${this.repository}</a></h3>
      <input type="text" value="${this.organization}" @input="${(e) => this.organization = e.target.value}" />
      <input type="text" value="${this.repository}" @input="${(e) => this.repository = e.target.value}" />
      <button @click="${this.getData}">Get Contributors</button>

      <slot></slot>
      ${this.items.filter((item, index) => index < 12).map((item) =>
          html`
          <div class="rpg-wrapper" @click=${() => window.open(`https://github.com/${item.login}`, '_blank')}>
          <rpg-character  seed="${item.login}"></rpg-character>
          <div class="contdetails">
          ${item.login}
          Contributions: ${item.contributions}
          </div>
          </div>
          `)}
    </div>`;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    // see if value changes from user input and is not empty
    if (changedProperties.has('organization') || changedProperties.has('repository')) {
      this.getData();
    }

  }

  getData() {
    console.log("HI");
    const url = `https://api.github.com/repos/${this.organization}/${this.repository}/contributors`;
    try {
      fetch(url).then(d => d.ok ? d.json(): {}).then(data => {
        if (data) {
          this.items = [];
          this.items = data;
          console.log(this.items);
        }});
    } catch (error) {
      console.error("HI");
    }}

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(GithubRpgContributors.tag, GithubRpgContributors);
