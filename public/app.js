let images = [];
let currentIndex = 0;
const imageElement = document.getElementById('image');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');

const votes = {};

function fetchImages() {
    fetch('./images') 
      .then(response => response.json())
      .then(data => {
        images = data.images;
        loadImage();
      })
  }
  
function loadImage() {
  if (images.length > 0) {
    imageElement.src = `/images/${images[currentIndex]}`; 
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
}

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
      loadImage();
    currentIndex--;
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
  nextButton.click();
  saveVotes();
});

noButton.addEventListener('click', () => {
  votes[images[currentIndex]] = 0;
  nextButton.click();
  saveVotes();
});

fetchImages();
