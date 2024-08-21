class ItemCard extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
      await this.loadCSS();
      this.render();
  }

  async loadCSS() {
      try {
          const response = await fetch('/css/components/item-card.css');
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const css = await response.text();
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(css);
          this.shadowRoot.adoptedStyleSheets = [sheet];
      } catch (e) {
          console.error('Error loading CSS:', e);
      }
  }

  render() {
      const card = document.createElement('div');
      card.className = 'card';

      let cardContent = '';

      // Image section
      const image = this.getAttribute('image');
      const imageSize = this.getAttribute('image-size') || 'small';
      if (image && image.trim() !== '') {
          cardContent += `
              <div class="card-image">
                  <img src="${image}" alt="Item image" class="${imageSize}">
              </div>
          `;
      }

      // Name section
      const name = this.getAttribute('name');
      if (name && name.trim() !== '') {
          cardContent += `<h2 class="card-name">${name}</h2>`;
      }

      // Price section
      const price = this.getAttribute('price');
      if (price && price.trim() !== '') {
          cardContent += `<p class="card-price">${price}</p>`;
      }

      // Description section
      const description = this.getAttribute('description');
      if (description && description.trim() !== '') {
          const descriptionHtml = description
              .split('\n')
              .map(line => line.trim())
              .filter(Boolean)
              .map(line => `<p>${line}</p>`)
              .join('');
          if (descriptionHtml) {
              cardContent += `<div class="card-description">${descriptionHtml}</div>`;
          }
      }

      // Button section
      const buttonSlot = '<slot name="button"></slot>';
      cardContent += buttonSlot;

      if (cardContent === '') {
          cardContent = '<p>No item data available</p>';
      }

      card.innerHTML = cardContent;
      this.shadowRoot.appendChild(card);
  }
}

customElements.define('item-card', ItemCard);