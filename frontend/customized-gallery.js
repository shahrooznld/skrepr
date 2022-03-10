class CustomizedGallery extends HTMLElement {
    PHOTO_NUMBERS = 5;

    constructor() {
        super();
        this.getPhotos().then((photos) =>{
            this.photosObject = photos.slice(0,this.PHOTO_NUMBERS);
            this.generatePhotosHtml(photos);
        });
        this.selectedIndex = 0;
        this.innerHTML = `<div class="flex-container thumbnail-gallery-container">
            </div>
            <div class="flex-container selected-photo">
            </div>
            <div class="flex-container">
            <button id="previous-image" class="button">Previous</button>
            <button id="next-image" class="button">Next</button>
            </div>
`;
    }

    /**
     * get photo from api
     */
     getPhotos() {
     return fetch('https://jsonplaceholder.typicode.com/photos').then((response) => {
            return response.json();
        });
    }

    /**
     * generate photos html
     * @param photos
     */
    generatePhotosHtml(photos) {
        this.thumbnailGallery = document.querySelector('.thumbnail-gallery-container');
        this.selectedPhoto = document.querySelector('.selected-photo');

        for (let i = 0; i < this.PHOTO_NUMBERS; i++) {
            this.thumbnailGallery.innerHTML = this.thumbnailGallery.innerHTML + `<img id="thumbnail-gallery" src="${photos[i].thumbnailUrl}" alt="${photos[i].title}" />`;
        }
        this.selectedPhoto.innerHTML = this.selectedPhoto.innerHTML + `<img class="gallery" src="${photos[this.selectedIndex].url}" alt="${photos[this.selectedIndex].title}" />
        `;
        this.eventSubscribers();

    }

    eventSubscribers() {
        // event listener for each thumbnail photo
        document.querySelectorAll("#thumbnail-gallery").forEach((image, index) => {
            image.addEventListener('click', (event) => {
                this.changePhoto(index);

            })
        });

        // event listener for button
        this.nextButton = document.querySelector('#next-image');
        this.previousButton = document.querySelector('#previous-image');
        this.nextButton.addEventListener('click', () => {
            this.selectedIndex++
            if (this.selectedIndex > this.PHOTO_NUMBERS -1) {
                this.selectedIndex = 0;
            }
            this.changePhoto(this.selectedIndex);
        });

        this.previousButton.addEventListener('click', () => {
            this.selectedIndex--
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.PHOTO_NUMBERS -1;
            }
            this.changePhoto(this.selectedIndex);

        });
    }

    /**
     * change gallery photo
     * @param selectorIndex
     */
    changePhoto(selectorIndex) {
        this.selectedIndex = selectorIndex
        const galleryElement = document.querySelector('.gallery')
        galleryElement.src = this.photosObject[selectorIndex].url;
        galleryElement.alt = this.photosObject[selectorIndex].title;
    }
}

customElements.define("customized-gallery", CustomizedGallery);
