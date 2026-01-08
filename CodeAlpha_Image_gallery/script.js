const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let currentIndex = 0;
let filteredImages = [...images]; // Images currently visible

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = filteredImages[currentIndex].src;
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function changeImage(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = filteredImages.length - 1;
  }
  if (currentIndex >= filteredImages.length) {
    currentIndex = 0;
  }

  lightboxImg.src = filteredImages[currentIndex].src;
}

function filterImages(category) {
  filteredImages = [];

  images.forEach(img => {
    if (category === "all" || img.classList.contains(category)) {
      img.style.display = "block";
      filteredImages.push(img);
    } else {
      img.style.display = "none";
    }
  });

  // Reset lightbox index when filter changes
  if (filteredImages.length > 0) {
    currentIndex = 0;
    lightboxImg.src = filteredImages[0].src;
  } else {
    closeLightbox();
  }
}
