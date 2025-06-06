document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("nav");
  burger.addEventListener("click", function () {
    nav.classList.toggle("active");
  });

  // Search toggle
  const searchToggle = document.querySelector(".search-toggle");
  const mobileSearch = document.querySelector(".mobile-search");
  searchToggle.addEventListener("click", function () {
    mobileSearch.classList.toggle("active");
  });

  // Search form submission
  const searchForm = document.getElementById("searchForm");
  const mobileSearchForm = document.getElementById("mobileSearchForm");

  function handleSearch(event) {
    event.preventDefault();
    const searchInput = event.target.querySelector('input[type="text"]');
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
      // Redirect to search results page
      window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
    } else {
      searchInput.focus();
    }
  }

  searchForm.addEventListener("submit", handleSearch);
  mobileSearchForm.addEventListener("submit", handleSearch);

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 992) {
        nav.classList.remove("active");
      }
    });
  });

  // Account dropdown for mobile
  const accountBtn = document.querySelector(".account-btn");
  const accountDropdown = document.querySelector(".account-dropdown");

  accountBtn.addEventListener("click", function (e) {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      accountDropdown.classList.toggle("active");
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".account-dropdown") && window.innerWidth > 992) {
      document.querySelector(".account-menu").style.opacity = "0";
      document.querySelector(".account-menu").style.visibility = "hidden";
    }
  });

  // Update cart count (example)
  function updateCartCount() {
    // In a real implementation, fetch from your cart system
    const cartCount = 3; // Example count
    document.querySelector(".cart-count").textContent = cartCount;
  }

  updateCartCount();
});

// Product Filtering
document.addEventListener("DOMContentLoaded", function () {
  // Category filtering
  const categoryButtons = document.querySelectorAll(".category-btn");
  const productItems = document.querySelectorAll(".product-item");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const category = button.dataset.category;

      // Filter products
      productItems.forEach((item) => {
        if (category === "all" || item.dataset.category === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Comparison functionality
  const compareButtons = document.querySelectorAll(".compare-btn");
  const comparisonModal = document.querySelector(".comparison-modal");
  const closeModal = document.querySelector(".close-modal");
  const clearComparison = document.querySelector(".clear-comparison");
  const comparisonBody = document.getElementById("comparison-body");

  let comparedProducts = [];

  compareButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productItem = this.closest(".product-item");
      const productName = productItem.querySelector("h3").textContent;
      const productPrice = productItem.querySelector(".price").textContent;
      const productCategory = productItem.dataset.category;
      const productRating = productItem.querySelector(".stars").textContent;

      // Check if product is already in comparison
      const existingIndex = comparedProducts.findIndex(
        (p) => p.name === productName
      );

      if (existingIndex >= 0) {
        // Remove from comparison
        comparedProducts.splice(existingIndex, 1);
        this.textContent = "Compare";
        this.style.backgroundColor = "#5d3a9e";
      } else {
        // Add to comparison (limit to 4)
        if (comparedProducts.length < 4) {
          comparedProducts.push({
            name: productName,
            price: productPrice,
            category: productCategory,
            benefits: productItem.querySelector(".description").textContent,
            rating: productRating,
          });
          this.textContent = "Added";
          this.style.backgroundColor = "#3d2466";
        } else {
          alert("You can compare up to 4 products at a time.");
        }
      }

      // Update comparison modal
      updateComparisonTable();

      // Show modal if we have products to compare
      if (comparedProducts.length > 0) {
        comparisonModal.style.display = "flex";
      } else {
        comparisonModal.style.display = "none";
      }
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    comparisonModal.style.display = "none";
  });

  // Close when clicking outside modal
  window.addEventListener("click", (e) => {
    if (e.target === comparisonModal) {
      comparisonModal.style.display = "none";
    }
  });

  // Clear comparison
  clearComparison.addEventListener("click", () => {
    comparedProducts = [];
    updateComparisonTable();
    comparisonModal.style.display = "none";

    // Reset all compare buttons
    compareButtons.forEach((button) => {
      button.textContent = "Compare";
      button.style.backgroundColor = "#5d3a9e";
    });
  });

  function updateComparisonTable() {
    comparisonBody.innerHTML = "";

    if (comparedProducts.length === 0) {
      comparisonBody.innerHTML =
        '<tr><td colspan="5">Add products to compare</td></tr>';
      return;
    }

    comparedProducts.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.category.replace("-", " ")}</td>
                <td>${product.benefits}</td>
                <td>${product.rating}</td>
            `;
      comparisonBody.appendChild(row);
    });
  }
});

// carousel code

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 5000; // 5 seconds

  // Initialize carousel
  function startCarousel() {
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  // Go to specific slide
  function goToSlide(n) {
    slides[currentSlide].classList.remove("active");
    indicators[currentSlide].classList.remove("active");
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    indicators[currentSlide].classList.add("active");
  }

  // Next slide
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  // Previous slide
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Event listeners
  nextBtn.addEventListener("click", function () {
    clearInterval(slideInterval);
    nextSlide();
    startCarousel();
  });

  prevBtn.addEventListener("click", function () {
    clearInterval(slideInterval);
    prevSlide();
    startCarousel();
  });

  // Indicator click events
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      clearInterval(slideInterval);
      goToSlide(index);
      startCarousel();
    });
  });

  // Start the carousel
  startCarousel();

  // Pause on hover
  const carousel = document.querySelector(".carousel-container");
  carousel.addEventListener("mouseenter", function () {
    clearInterval(slideInterval);
  });

  carousel.addEventListener("mouseleave", function () {
    startCarousel();
  });

  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(slideInterval);
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startCarousel();
    },
    { passive: true }
  );

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide(); // Swipe left
    }
    if (touchEndX > touchStartX + 50) {
      prevSlide(); // Swipe right
    }
  }
});

// Wait for everything to load
window.addEventListener("load", function () {
  // Fade out loader
  const loader = document.querySelector(".page-loader");
  loader.style.opacity = "0";

  // Show content
  const content = document.querySelector(".page-content");
  content.style.opacity = "1";

  // Remove loader from DOM after fade out
  setTimeout(() => {
    loader.style.display = "none";
  }, 500); // Match this with the CSS transition time
});

// Fallback in case load event doesn't fire
setTimeout(() => {
  const loader = document.querySelector(".page-loader");
  const content = document.querySelector(".page-content");

  if (loader && content) {
    loader.style.opacity = "0";
    content.style.opacity = "1";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
}, 2000); // Maximum 3 seconds wait time
