// ======================
// DOM Elements
// ======================
const cards = document.querySelectorAll(".card");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const images = [...document.querySelectorAll(".card img")].map(
  img => img.src
);

let currentIndex = 0;

// ======================
// Lightbox Open
// ======================
cards.forEach((card, index) => {
  card.addEventListener("click", (e) => {
    // Prevent opening lightbox when clicking buttons
    if (e.target.tagName === "BUTTON") return;

    currentIndex = index;
    lightbox.style.display = "flex";
    lightboxImg.src = images[currentIndex];
  });
});

// ======================
// Close Lightbox
// ======================
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Click outside image closes lightbox
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// ======================
// Next / Prev
// ======================
function showImage() {
  lightboxImg.src = images[currentIndex];
}

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

// ======================
// Keyboard Navigation
// ======================
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    }

    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage();
    }

    if (e.key === "Escape") {
      lightbox.style.display = "none";
    }
  }
});

// ======================
// Category Filtering
// ======================
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ======================
// Search Functionality
// ======================
searchInput.addEventListener("keyup", () => {
  const searchValue = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();

    if (title.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// ======================
// Dark Mode
// ======================
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});

// ======================
// Favorite System
// ======================
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((btn, index) => {
  const saved = localStorage.getItem(`liked-${index}`);

  if (saved === "true") {
    btn.style.background = "red";
    btn.style.color = "white";
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    const isLiked = btn.style.background === "red";

    if (isLiked) {
      btn.style.background = "";
      btn.style.color = "";
      localStorage.setItem(`liked-${index}`, "false");
    } else {
      btn.style.background = "red";
      btn.style.color = "white";
      localStorage.setItem(`liked-${index}`, "true");
    }
  });
});

// ======================
// Download Image
// ======================
const downloadBtns = document.querySelectorAll(".download-btn");

downloadBtns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    const link = document.createElement("a");
    link.href = images[index];
    link.download = `image-${index + 1}.jpg`;
    link.target = "_blank";
    link.click();
  });
});