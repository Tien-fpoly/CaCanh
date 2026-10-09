// Hiển thị danh sách cá trên trang sản phẩm từ mảng fishData dùng chung.
let productsPageGrid = document.getElementById("productsGrid");
let productsPageTitle = document.getElementById("productsTitle");
let productsPageCount = document.getElementById("productsCount");
let productsPageCategory = new URLSearchParams(window.location.search).get("category") || "all";
let productsPageCategories = {
  all: "Tất Cả Cá Cảnh",
  dragon: "Cá Rồng",
  koi: "Cá Koi & Cá Vàng",
  betta: "Cá Betta & Guppy",
  discus: "Cá Thần Tiên - Cá Dĩa",
  aquascape: "Cá Thủy Sinh Nhỏ",
  predator: "Cá Săn Mồi & Phong Thủy"
};

if (!Object.prototype.hasOwnProperty.call(productsPageCategories, productsPageCategory)) {
  productsPageCategory = "all";
}

let productsForPage = productsPageCategory === "all"
  ? fishData
  : fishData.filter((fish) => fish.category === productsPageCategory);

productsPageTitle.innerHTML = productsPageCategory === "all"
  ? `Tất Cả <span>Cá Cảnh</span>`
  : `<span>${productsPageCategories[productsPageCategory]}</span>`;
productsPageCount.textContent = productsForPage.length;
productsPageGrid.innerHTML = showAllsp(productsForPage, false);

// Hỗ trợ mở menu điều hướng trên màn hình nhỏ.
let productsPageMobileMenu = document.getElementById("mobileMenu");
let productsPageMobileToggle = document.getElementById("mobileMenuToggle");
let productsPageDropdown = document.querySelector(".nav-dropdown");
let productsPageDropdownToggle = document.querySelector(".nav-dropdown-toggle");

if (productsPageMobileMenu && productsPageMobileToggle) {
  productsPageMobileToggle.addEventListener("click", () => {
    productsPageMobileMenu.classList.toggle("active");
  });
}

if (productsPageDropdown && productsPageDropdownToggle) {
  productsPageDropdownToggle.addEventListener("click", () => {
    let isOpen = productsPageDropdown.classList.toggle("open");
    productsPageDropdownToggle.setAttribute("aria-expanded", isOpen);
  });
}
