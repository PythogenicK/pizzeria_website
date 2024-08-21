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
      const response = await fetch('item-card.css');
      const css = await response.text();
      const style = document.createElement('style');
      style.textContent = css;
      this.shadowRoot.appendChild(style);
    }
  
    render() {
      const image = this.getAttribute('image') || 'default-image.jpg';
      const name = this.getAttribute('name') || 'Untitled';
      const price = this.getAttribute('price') || '0.00';
      const description = this.getAttribute('description') || '';
  
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${image}" alt="${name}">
        <h4>${name}</h4>
        <p>${price}</p>
        <p>${description}</p>
      `;
      this.shadowRoot.appendChild(card);
    }
  }
  
  customElements.define('item-card', ItemCard);