let productDetail = document.getElementById("productDetail");
let detailMobileMenu = document.getElementById("mobileMenu");
let detailMobileMenuToggle = document.getElementById("mobileMenuToggle");
let detailCategoryDropdown = document.querySelector(".nav-dropdown");
let detailCategoryDropdownToggle = document.querySelector(".nav-dropdown-toggle");

// showCT trong fish-products.js tự lấy ID trên URL và tìm cá trong mảng fishData.
productDetail.innerHTML = showCT(fishData);

// Cho phép mở/đóng menu trên màn hình nhỏ.
if (detailMobileMenu && detailMobileMenuToggle) {
  detailMobileMenuToggle.addEventListener("click", () => {
    detailMobileMenu.classList.toggle("active");
  });
}

if (detailCategoryDropdown && detailCategoryDropdownToggle) {
  detailCategoryDropdownToggle.addEventListener("click", () => {
    let isOpen = detailCategoryDropdown.classList.toggle("open");
    detailCategoryDropdownToggle.setAttribute("aria-expanded", isOpen);
  });
}
