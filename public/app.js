let images = [];
let currentIndex = 0;
const imageElement = document.getElementById('image');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');

const votes = {};

// Fetch initial set of images
function fetchImages() {
    fetch('./images')  // Endpoint to fetch image names
      .then(response => response.json())
      .then(data => {
        images = data.images;
        loadImage();
      })
      .catch(error => console.error('Error fetching images:', error));
  }
  
function loadImage() {
  if (images.length > 0) {
    imageElement.src = `/images/${images[currentIndex]}`;  // Ensure this path is correct
  }
}

function saveVotes() {
  fetch('/save-votes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(votes),
  })
  .then(response => response.json())
  .then(data => console.log('Votes saved:', data))
  .catch(error => console.error('Error:', error));
}

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadImage();
  }
});

nextButton.addEventListener('click', () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    loadImage();
  }
});

yesButton.addEventListener('click', () => {
  votes[images[currentIndex]] = 1;
  console.log('Yes for', images[currentIndex]);
  nextButton.click();
  saveVotes();
});

noButton.addEventListener('click', () => {
  votes[images[currentIndex]] = 0;
  console.log('No for', images[currentIndex]);
  nextButton.click();
  saveVotes();
});

fetchImages(); // Initial image fetch
