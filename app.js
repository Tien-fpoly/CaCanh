// Mảng fishData được đặt trong fish-products.js và dùng chung trên các trang.

// ===== 2. TRẠNG THÁI ĐANG CHỌN TRÊN TRANG =====
// Các giá trị này thay đổi khi người dùng lọc, tìm kiếm, sắp xếp hoặc mua cá.
let currentCategory = new URLSearchParams(window.location.search).get('category') || 'all';
let searchQuery = '';
let priceFilter = 'all';
let sortBy = 'default';
let cart = [];

// ===== 3. LẤY CÁC VÙNG HTML CẦN ĐIỀU KHIỂN =====
// Các biến này nối JavaScript với lưới cá, bộ lọc, popup và giỏ hàng trong index.html.
let productsGrid = document.getElementById('productsGrid');
let searchInput = document.getElementById('searchInput');
let clearSearchBtn = document.getElementById('clearSearch');
let priceSelect = document.getElementById('priceSelect');
let sortSelect = document.getElementById('sortSelect');
let resetFilterBtn = document.getElementById('resetFilters');
let resultCountEl = document.getElementById('resultCount');
let cartCountEl = document.getElementById('cartCount');
let cartDrawer = document.getElementById('cartDrawer');
let cartOverlay = document.getElementById('cartOverlay');
let cartItemsContainer = document.getElementById('cartItemsContainer');
let cartTotalPriceEl = document.getElementById('cartTotalPrice');
let productModal = document.getElementById('productModal');
let modalContent = document.getElementById('modalDetails');
let mobileMenu = document.getElementById('mobileMenu');
let mobileMenuToggle = document.getElementById('mobileMenuToggle');
let categoryDropdown = document.querySelector('.nav-dropdown');
let categoryDropdownToggle = document.querySelector('.nav-dropdown-toggle');
let toastContainer = document.getElementById('toastContainer');

// ===== 4. ĐỊNH DẠNG GIÁ TIỀN =====
// Chuyển số thành định dạng tiền Việt, ví dụ 150000 thành 150.000 ₫.
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// ===== 5. LỌC, SẮP XẾP VÀ HIỂN THỊ DANH SÁCH CÁ =====
function renderProducts() {
  // Chỉ giữ cá khớp với danh mục, từ khóa tìm kiếm và khoảng giá đã chọn.
  let filtered = fishData.filter(item => {
    let matchesCategory = (currentCategory === 'all') || (item.category === currentCategory);

    // Tìm theo tên cá, tên danh mục hoặc xuất xứ.
    let nameMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    let categoryNameMatch = item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    let originMatch = item.origin.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesSearch = nameMatch || categoryNameMatch || originMatch;

    // Chọn khoảng giá từ các lựa chọn trong giao diện.
    let matchesPrice = true;
    if (priceFilter === 'under-100k') {
      matchesPrice = item.price < 100000;
    } else if (priceFilter === '100k-500k') {
      matchesPrice = item.price >= 100000 && item.price <= 500000;
    } else if (priceFilter === '500k-2m') {
      matchesPrice = item.price > 500000 && item.price <= 2000000;
    } else if (priceFilter === 'above-2m') {
      matchesPrice = item.price > 2000000;
    }

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sắp xếp danh sách đã lọc theo lựa chọn của người dùng.
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'rating-desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Cập nhật số lượng kết quả đang hiển thị.
  resultCountEl.textContent = filtered.length;

  // Nếu không có kết quả, hiển thị thông báo và nút đặt lại bộ lọc.
  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-fish"></i>
        <h3>Không tìm thấy loài cá nào phù hợp!</h3>
        <p>Vui lòng thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.</p>
        <button class="btn btn-primary" onclick="resetAllFilters()">
          <i class="fas fa-undo"></i> Đặt Lại Bộ Lọc
        </button>
      </div>
    `;
    return;
  }

  // Hàm showAllsp trong fish-products.js tạo các thẻ từ mảng đã lọc.
  productsGrid.innerHTML = showAllsp(filtered);
}

// ===== 6. HIỂN THỊ POPUP CHI TIẾT CÁ =====
// Nhận ID từ nút bấm, tìm đúng cá trong fishData rồi đưa thông tin vào popup.
window.openDetailModal = function (id) {
  let fish = fishData.find(f => f.id === id);
  if (!fish) return;

  // Dùng chung dữ liệu fishData để dựng thông tin đúng con cá được chọn.
  let noiDung = ``;
  noiDung = `
    <div class="modal-grid">
      <div>
        <img src="${fish.image}" alt="${fish.name}" class="modal-image">
      </div>
      <div>
        <span class="modal-category-badge">${fish.categoryName}</span>
        <h2 class="modal-title">${fish.name}</h2>
        <div class="modal-price">${formatCurrency(fish.price)}</div>
        <p class="modal-desc">${fish.description}</p>
        
        <div class="modal-specs-list">
          <div class="spec-item">
            <strong><i class="fas fa-globe-asia"></i> Xuất xứ:</strong>
            <span>${fish.origin}</span>
          </div>
          <div class="spec-item">
            <strong><i class="fas fa-ruler-combined"></i> Kích thước:</strong>
            <span>${fish.size}</span>
          </div>
          <div class="spec-item">
            <strong><i class="fas fa-temperature-low"></i> Nhiệt độ nước:</strong>
            <span>${fish.waterTemp}</span>
          </div>
          <div class="spec-item">
            <strong><i class="fas fa-vial"></i> Độ pH thích hợp:</strong>
            <span>${fish.ph}</span>
          </div>
          <div class="spec-item">
            <strong><i class="fas fa-shield-heart"></i> Mức độ chăm sóc:</strong>
            <span>${fish.difficulty}</span>
          </div>
          <div class="spec-item">
            <strong><i class="fas fa-star" style="color: #f59e0b;"></i> Đánh giá:</strong>
            <span>${fish.rating} / 5.0</span>
          </div>
        </div>

        <div style="display: flex; gap: 12px;">
          <button class="btn btn-primary" style="flex: 1;" onclick="addToCart(${fish.id}); closeModal();">
            <i class="fas fa-cart-plus"></i> Chọn Mua Ngay
          </button>
        </div>
      </div>
    </div>
  `;

  modalContent.innerHTML = noiDung;
  productModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// Đóng popup chi tiết và cho phép cuộn trang trở lại.
window.closeModal = function () {
  productModal.classList.remove('active');
  document.body.style.overflow = 'auto';
};

// ===== 7. CÁC THAO TÁC GIỎ HÀNG =====
// Thêm cá vào giỏ; nếu cá đã có thì tăng số lượng.
window.addToCart = function (id) {
  let fish = fishData.find(f => f.id === id);
  if (!fish) return;

  let existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...fish,
      quantity: 1
    });
  }

  updateCartUI();
  showToast(`Đã thêm <b>${fish.name}</b> vào giỏ hàng!`);
};

function updateCartUI() {
  // Tính tổng số cá và cập nhật huy hiệu giỏ hàng trên thanh đầu trang.
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalItems;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 40px 0;">
        <i class="fas fa-shopping-basket" style="font-size: 2.5rem; color: #cbd5e1; margin-bottom: 10px;"></i>
        <p>Giỏ hàng của bạn đang trống</p>
      </div>
    `;
    cartTotalPriceEl.textContent = formatCurrency(0);
    return;
  }

  // Tạo lại danh sách trong giỏ và cộng tổng tiền theo số lượng từng cá.
  let totalPrice = 0;
  cartItemsContainer.innerHTML = cart.map(item => {
    totalPrice += item.price * item.quantity;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${formatCurrency(item.price)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Xóa">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
  }).join('');

  cartTotalPriceEl.textContent = formatCurrency(totalPrice);
}

window.changeQty = function (id, change) {
  let item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCartUI();
};

window.removeFromCart = function (id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
  showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
};

window.toggleCart = function (show) {
  // show=true mở ngăn giỏ; show=false đóng ngăn và lớp phủ.
  if (show) {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

window.checkoutOrder = function () {
  if (cart.length === 0) {
    showToast('Giỏ hàng trống! Vui lòng chọn cá cảnh trước.');
    return;
  }
  showToast('🎉 Đặt hàng thành công! Nhân viên AquaParadise sẽ liên hệ với bạn trong 15 phút.');
  cart = [];
  updateCartUI();
  toggleCart(false);
};

// Hiện thông báo ngắn sau thao tác thêm/xóa cá hoặc đặt hàng.
function showToast(message) {
  let toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Đưa tìm kiếm, danh mục, giá và sắp xếp về trạng thái ban đầu.
window.resetAllFilters = function () {
  currentCategory = 'all';
  searchQuery = '';
  priceFilter = 'all';
  sortBy = 'default';

  searchInput.value = '';
  clearSearchBtn.style.display = 'none';
  priceSelect.value = 'all';
  sortSelect.value = 'default';

  renderProducts();
};

// Áp dụng danh mục được chọn từ menu điều hướng.
function selectCategory(category) {
  currentCategory = category;
  renderProducts();
}

// ===== 8. GẮN SỰ KIỆN CHO GIAO DIỆN =====
// Chạy sau khi HTML tải xong để các phần tử trên trang đã sẵn sàng.
document.addEventListener('DOMContentLoaded', () => {
  // Dừng nếu trang không có lưới sản phẩm để bộ lọc không truy cập phần tử không tồn tại.
  if (!productsGrid) return;

  // Chấp nhận danh mục có trong dữ liệu khi trang được mở từ menu hoặc URL.
  if (currentCategory !== 'all' && !fishData.some(item => item.category === currentCategory)) {
    currentCategory = 'all';
  }
  selectCategory(currentCategory);

  // Search input event
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    renderProducts();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderProducts();
  });

  document.querySelectorAll('[data-nav-category]').forEach(link => {
    link.addEventListener('click', () => {
      selectCategory(link.dataset.navCategory);
      if (categoryDropdown) categoryDropdown.classList.remove('open');
      if (categoryDropdownToggle) categoryDropdownToggle.setAttribute('aria-expanded', 'false');
      if (mobileMenu) mobileMenu.classList.remove('active');
    });
  });

  if (categoryDropdownToggle && categoryDropdown) {
    categoryDropdownToggle.addEventListener('click', () => {
      let isOpen = categoryDropdown.classList.toggle('open');
      categoryDropdownToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Price select
  priceSelect.addEventListener('change', (e) => {
    priceFilter = e.target.value;
    renderProducts();
  });

  // Sort select
  sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    renderProducts();
  });

  // Reset button
  resetFilterBtn.addEventListener('click', resetAllFilters);

  // Mobile Menu Toggle
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  // Close modal on overlay click
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
      closeModal();
    }
  });

  // Close cart on overlay click
  cartOverlay.addEventListener('click', () => {
    toggleCart(false);
  });
});
