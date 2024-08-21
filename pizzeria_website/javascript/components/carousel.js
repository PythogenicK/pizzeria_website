class Carousel {
    constructor(carouselId, items) {
        this.carousel = document.getElementById(carouselId);
        this.indicators = document.getElementById('carouselIndicators');
        this.items = items;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.renderItems();
        this.renderIndicators();
        this.addEventListeners();
        this.showItem(this.currentIndex);
    }

    renderItems() {
        this.items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'carousel-item';
            div.innerHTML = `<img src="${item.image}" alt="${item.alt}">`;
            this.carousel.appendChild(div);
        });
    }

    renderIndicators() {
        this.items.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => this.showItem(index));
            this.indicators.appendChild(indicator);
        });
    }

    addEventListeners() {
        document.querySelector('.prev').addEventListener('click', () => this.prevItem());
        document.querySelector('.next').addEventListener('click', () => this.nextItem());
    }

    showItem(index) {
        const items = this.carousel.querySelectorAll('.carousel-item');
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        this.currentIndex = index;
        this.carousel.style.transform = `translateX(-${index * 100}%)`;
        this.updateIndicators();
    }

    prevItem() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.showItem(this.currentIndex);
    }

    nextItem() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.showItem(this.currentIndex);
    }

    updateIndicators() {
        const indicators = this.indicators.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
}