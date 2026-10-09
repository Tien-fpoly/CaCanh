// ===== 1. DỮ LIỆU CÁ CẢNH =====
// Mỗi object là một sản phẩm. Sửa hoặc thêm cá trong mảng này để cập nhật
// danh sách, popup chi tiết và thông tin giỏ hàng.
// badge có thể là "hot", "new", "sale" hoặc chuỗi rỗng nếu không có nhãn.
let fishData = [
  {
    id: 1,
    name: "Cá Rồng Huyết Long (Super Red)",
    category: "dragon",
    categoryName: "Cá Rồng",
    price: 13000000,
    badge: "hot",
    badgeText: "Cực Phẩm",
    rating: 5.0,
    origin: "Indonesia (Kalimantan)",
    size: "25 - 30 cm",
    waterTemp: "28 - 30°C",
    ph: "6.5 - 7.5",
    difficulty: "Chuyên gia",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjWxzEVwYHE7-lN0XxtSz6OLyUY-44GmwIbJ8dPG2_pQ&s=10",
    description: "Cá Rồng Huyết Long với màu đỏ rực rỡ tượng trưng cho may mắn, tài lộc và sự quyền uy. Dòng cá quý phái được tuyển chọn kỹ càng từ trại cá danh tiếng tại Indonesia, vảy đều bóng sáng, râu dài thẳng tắp."
  },
  {
    id: 2,
    name: "Cá Koi Kohaku Nhật Bản",
    category: "koi",
    categoryName: "Cá Koi",
    price: 3500000,
    badge: "hot",
    badgeText: "Bán Chạy",
    rating: 4.9,
    origin: "Nhật Bản (Niigata)",
    size: "35 - 40 cm",
    waterTemp: "20 - 26°C",
    ph: "7.0 - 8.0",
    difficulty: "Trung bình",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI1wmPfSJD_j-stH5jMxtsSazy9CXuVwM0EJUk5tM0xQ&s=10",
    description: "Cá Koi dòng Kohaku chuẩn thuần chủng với thân trắng muốt như tuyết và hoa văn đỏ Hi đậm nét, phân bổ đối xứng hài hòa. Thích hợp nuôi hồ sân vườn và phong thủy tài lộc."
  },
  {
    id: 3,
    name: "Cá Betta Halfmoon Galaxy",
    category: "betta",
    categoryName: "Cá Betta & Guppy",
    price: 100000,
    badge: "new",
    badgeText: "Mới Về",
    rating: 4.8,
    origin: "Thái Lan",
    size: "5 - 6 cm",
    waterTemp: "24 - 28°C",
    ph: "6.8 - 7.2",
    difficulty: "Dễ nuôi",
    image: "https://tropicflow.com/cdn/shop/files/purple-halfmoon-male-betta-fish.jpg?v=1765480767&width=713",
    description: "Dòng Betta đuôi xòe 180 độ Halfmoon kết hợp phối màu Galaxy đa sắc long lanh. Khỏe mạnh, háo động, vây căng tròn không tỳ vết."
  },
  {
    id: 4,
    name: "Cá Dĩa Red Melon (Cá Đĩa)",
    category: "discus",
    categoryName: "Cá Thần Tiên - Dĩa",
    price: 320000,
    badge: "sale",
    badgeText: "Ưu Đãi",
    rating: 4.9,
    origin: "Malaysia",
    size: "10 - 12 cm",
    waterTemp: "28 - 31°C",
    ph: "6.0 - 6.8",
    difficulty: "Nâng cao",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTca95Cn0wlDCsxSBK_HDwoInG8StPY5w5WTBjFP3XOEA&s=10",
    description: "Được mệnh danh là 'Nhất Đại Mỹ Ngư', Cá Dĩa Red Melon sở hữu thân tròn đĩa hoàn hảo với sắc đỏ cam tươi sáng toàn thân, mắt đỏ quạch kiêu sa."
  },
  {
    id: 5,
    name: "Cá Guppy Rồng Đỏ BDS (Full Red)",
    category: "betta",
    categoryName: "Cá Betta & Guppy",
    price: 80000,
    badge: "hot",
    badgeText: "Hot Trend",
    rating: 4.7,
    origin: "Việt Nam (F1 Thái)",
    size: "3 - 4 cm",
    waterTemp: "24 - 28°C",
    ph: "6.8 - 7.6",
    difficulty: "Rất dễ",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkKOox-iS2xnY59yLMgsL4cy0XGGUyF8p7T5l5Wn4sHw&s=10",
    description: "Cá Bảy Màu Albino Full Red BDS sở hữu tông màu đỏ rực rỡ toàn thân kết hợp cùng đôi mắt đỏ (Albino) kiêu sa. Dòng cá sở hữu vây lưng to (Big Dorsal), vây đuôi xòe rộng dạng quạt (Delta tail) dày dặn và tay bơi căng tròn bơi lội uyển chuyển. Cá khỏe mạnh, dễ thích nghi, sinh sản tốt và cực kỳ phù hợp cho các bể thủy sinh mini để bàn."
  },
  {
    id: 6,
    name: "Cá Neon Vua (Cardinal Tetra)",
    category: "aquascape",
    categoryName: "Cá Thủy Sinh",
    price: 25000,
    badge: "",
    badgeText: "",
    rating: 4.8,
    origin: "Amazon / Nhân giống",
    size: "3 - 4 cm",
    waterTemp: "23 - 27°C",
    ph: "5.5 - 7.0",
    difficulty: "Dễ nuôi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQved1sVkIgvgnEBnqDwMJjrCNGkADvAmurYNQNM-9jfw&s=10",
    description: "Vua của các dòng cá bơi đàn trong bể thủy sinh! Dải màu xanh ngọc phát quang chạy dài cùng dải đỏ đậm toàn thân dưới tạo nên khung cảnh lấp lánh tuyệt mỹ khi bơi theo đàn từ 20-50 con."
  },
  {
    id: 7,
    name: "Cá Thần Tiên Ai Cập (Altum Scalare)",
    category: "discus",
    categoryName: "Cá Thần Tiên - Dĩa",
    price: 2500000,
    badge: "new",
    badgeText: "Hiếm",
    rating: 5.0,
    origin: "Nam Mỹ (Sông Orinoco)",
    size: "15 - 18 cm",
    waterTemp: "27 - 30°C",
    ph: "5.5 - 6.5",
    difficulty: "Chuyên gia",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYhC46BXgnmaUiO_4_a1DM_vtCfrXEIPfjjvWbIeNGUQ&s=10",
    description: "Được mệnh danh là 'Vua của họ Thần Tiên', Cá Thần Tiên Ai Cập (Altum Scalare) sở hữu phom dáng đỉnh cao với sống mũi gãy gập đặc trưng, vây lưng và vây bụng kéo dài thẳng tắp thanh thoát. Chủng tộc cá mang vẻ đẹp cổ kính với các sọc đen huyền bí dọc thân, bơi lội uyển chuyển đầy kiêu sa, là mảnh ghép đẳng cấp nhất cho các bể thủy sinh phong cách Biotop hoang dã."
  },
  {
    id: 8,
    name: "Cá La Hán King Kamfa F1",
    category: "predator",
    categoryName: "Cá Cảnh Phong Thủy",
    price: 4200000,
    badge: "hot",
    badgeText: "Đầu To",
    rating: 4.9,
    origin: "Thái Lan",
    size: "14 - 16 cm",
    waterTemp: "28 - 31°C",
    ph: "7.2 - 8.0",
    difficulty: "Trung bình",
    image: "https://shopthuysinh.com/wp-content/uploads/2025/02/ca-la-han_1696087930.jpg",
    description: "Cá La Hán dòng King Kamfa châu sáng phủ toàn thân, đầu gù to tròn mọng nước, mắt trắng lồi ấn tượng. Rất dạn người, quấn chủ và mang ý nghĩa tài lộc thịnh vượng."
  },
  {
    id: 9,
    name: "Cá Ranchu Vàng Đỏ (Goldfish)",
    category: "koi",
    categoryName: "Cá Vàng - Ba Đuôi",
    price: 450000,
    badge: "sale",
    badgeText: "Dễ Thương",
    rating: 4.8,
    origin: "Nhật Bản / Thái Lan",
    size: "8 - 10 cm",
    waterTemp: "18 - 24°C",
    ph: "7.0 - 7.8",
    difficulty: "Dễ nuôi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl6C7ETiVw-uGNH05nQsPSd63Jxki2fz9JRknbZIoEMQ&s=10",
    description: "Được gọi là 'Vua của loài cá vàng', Ranchu không có vây lưng, thân tròn mũm mĩm cùng khối đầu gù xù xì đáng yêu. Dáng bơi lắc lư duyên dáng mang lại sự thư giãn tuyệt đối."
  },
  {
    id: 10,
    name: "Cá Hổ Indo 4 Sọc Chuẩn (Tiger Fish)",
    category: "predator",
    categoryName: "Cá Săn Mồi & Độc Lạ",
    price: 700000,
    badge: "hot",
    badgeText: "Săn Mồi",
    rating: 4.9,
    origin: "Indonesia",
    size: "12 - 15 cm",
    waterTemp: "26 - 30°C",
    ph: "6.5 - 7.5",
    difficulty: "Trung bình",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgmCmHj-Tr-rstzUGhwkEBkYn8_UoS6dKzZxdlIie0UQ&s=10",
    description: "Cá Hổ Indo chuẩn 4 sọc đen đậm rõ nét, nền da vàng óng ánh không lem. Rất thích hợp nuôi cộng đồng cùng cá rồng tạo nên phong thủy Long Hổ hội ngộ."
  },
  {
    id: 11,
    name: "Cá Phượng Hoàng Lam (German Blue Ram)",
    category: "aquascape",
    categoryName: "Cá Thủy Sinh",
    price: 70000,
    badge: "new",
    badgeText: "Màu Đẹp",
    rating: 4.7,
    origin: "Đức / Nhân giống",
    size: "4 - 5 cm",
    waterTemp: "25 - 29°C",
    ph: "6.0 - 7.0",
    difficulty: "Trung bình",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQThEcGV1BqFioB_uzY7oWCuH6CtyP7WKZ2-vFZJoUqbg&s=10",
    description: "Sở hữu vẻ đẹp rực rỡ với ánh kim xanh lam dạ quang trên toàn cơ thể, các chóp vây viền đỏ rực. Rất hiền lành, thích hợp bể thủy sinh có nhiều cây cối."
  },
  {
    id: 12,
    name: "Cá Cánh Buồm Dạ Quang (Glofish)",
    category: "aquascape",
    categoryName: "Cá Thủy Sinh",
    price: 15000,
    badge: "",
    badgeText: "",
    rating: 4.6,
    origin: "Nhân giống công nghệ sinh học",
    size: "4 - 5 cm",
    waterTemp: "22 - 28°C",
    ph: "6.5 - 7.5",
    difficulty: "Rất dễ",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8k2dWcfbRHPRHFnAH8nLvTwRNP1V0x0IPIE_BV8e6bg&s=10",
    description: "Cá Cánh Buồm màu sắc dạ quang rực rỡ (hồng, xanh neon, vàng, tím). Rực sáng bắt mắt dưới đèn led thủy sinh màu xanh tím, cực kỳ khỏe mạnh và năng động."
  }
];

// Dung mang san pham de tao danh sach the ca, giong ham showAllsp cua Callie.
function showAllsp(msp, includeCartAction = true) {
  let noiDung = ``;
  msp.forEach((fish) => {
    let badgeHtml = ``;
    let cartAction = includeCartAction
      ? `<button class="btn-add-cart" onclick="addToCart(${fish.id})" title="Thêm vào giỏ">
           <i class="fas fa-cart-plus"></i>
         </button>`
      : ``;
    if (fish.badge === "hot") {
      badgeHtml = `<span class="card-badge badge-hot"><i class="fas fa-fire"></i> ${fish.badgeText}</span>`;
    } else if (fish.badge === "new") {
      badgeHtml = `<span class="card-badge badge-new"><i class="fas fa-sparkles"></i> ${fish.badgeText}</span>`;
    } else if (fish.badge === "sale") {
      badgeHtml = `<span class="card-badge badge-sale"><i class="fas fa-tags"></i> ${fish.badgeText}</span>`;
    }

    noiDung += `
      <div class="fish-card" data-id="${fish.id}">
        <div class="fish-card-img-wrap">
          <img src="${fish.image}" alt="${fish.name}" class="fish-card-img" loading="lazy">
          ${badgeHtml}
          <span class="card-category-pill">${fish.categoryName}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${fish.name}</h3>
          <div class="card-origin">
            <i class="fas fa-map-marker-alt"></i> Xuất xứ: ${fish.origin}
          </div>
          <div class="card-meta">
            <div class="card-meta-item">
              <i class="fas fa-ruler-horizontal"></i> ${fish.size}
            </div>
            <div class="card-meta-item">
              <i class="fas fa-temperature-high"></i> ${fish.waterTemp}
            </div>
          </div>
          <div class="card-bottom">
            <div class="card-price">${formatFishCurrency(fish.price)}</div>
            <div class="card-actions">
              <a class="btn-detail" href="product-detail.html?id=${fish.id}" title="Xem chi tiết ${fish.name}">
                <i class="fas fa-eye"></i> Chi tiết
              </a>
              ${cartAction}
            </div>
          </div>
        </div>
      </div>`;
  });

  return noiDung;
}

// Tim ca theo ID tren URL va tao HTML cho trang chi tiet, nhu showCT cua Callie.
function showCT(msp) {
  let ma = Number(new URLSearchParams(window.location.search).get("id"));
  let fish = msp.find((item) => item.id === ma);
  let noiDung = ``;

  if (!fish) {
    noiDung = `
      <div class="product-detail-not-found">
        <i class="fas fa-fish"></i>
        <h2>Không tìm thấy cá cảnh</h2>
        <p>Vui lòng quay lại danh sách và chọn một loài cá.</p>
      </div>`;
    return noiDung;
  }

  document.title = `${fish.name} - AquaParadise`;

  noiDung = `
    <img src="${fish.image}" alt="${fish.name}" class="product-detail-image">
    <div class="product-detail-content">
      <span class="product-detail-category">${fish.categoryName}</span>
      <h1 class="product-detail-title">${fish.name}</h1>
      <div class="product-detail-price">${formatFishCurrency(fish.price)}</div>
      <p class="product-detail-description">${fish.description}</p>

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
          <strong><i class="fas fa-star"></i> Đánh giá:</strong>
          <span>${fish.rating} / 5.0</span>
        </div>
      </div>

      <a class="btn btn-primary" href="index.html#products">
        <i class="fas fa-fish"></i> Xem thêm cá
      </a>
    </div>`;

  return noiDung;
}

// Dinh dang gia ca dung chung cho the san pham va trang chi tiet.
function formatFishCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
