const gallery = document.getElementById('gallery');
const searchBox = document.getElementById('searchBox');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeModal = document.getElementsByClassName('close')[0];

// Load images from JSON
fetch('https://raw.githubusercontent.com/obsregedit/Image/main/image.json')
    .then(response => response.json())
    .then(images => {
        displayImages(images);

        // Search filter
        searchBox.addEventListener('input', () => {
            const keyword = searchBox.value.toLowerCase();
            const filteredImages = images.filter(image =>
                image.title.toLowerCase().includes(keyword) ||
                image.keywords.some(k => k.toLowerCase().includes(keyword))
            );
            displayImages(filteredImages);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));

// Display images in gallery
function displayImages(images) {
    gallery.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = image.title;

        imgElement.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = image.url;
            captionText.innerHTML = `<h2>${image.title}</h2><p>${image.description}</p>`;
        });

        gallery.appendChild(imgElement);
    });
}

// Close modal
closeModal.onclick = function () {
    modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
