document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = [
        { image: '/assets/300968591_172397395313289_3812963108144183130_n', alt: 'Image 1' },
        { image: '/assets/300968591_172397395313289_3812963108144183130_n', alt: 'Image 2' },
        { image: '/assets/300968591_172397395313289_3812963108144183130_n', alt: 'Image 3' },
        // Add more items as needed
    ];

    new Carousel('myCarousel', carouselItems);
});