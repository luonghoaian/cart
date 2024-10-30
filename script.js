const btn = document.querySelectorAll("button");

btn.forEach(function (button, index) {
  button.addEventListener("click", function (event) {
    var btnItem = event.target;
    var product = btnItem.parentElement;
    var productImg = product.querySelector("img").src;
    var productName = product.querySelector("h1").innerText;
    var productPrice = product.querySelector("span").innerText;
    addcart(productPrice, productImg, productName);
  });
});

function addcart(productPrice, productImg, productName) {
  var addtr = document.createElement("tr");
  var cartItem = document.querySelectorAll("tbody tr");

  // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
  for (var i = 0; i < cartItem.length; i++) {
    var productT = cartItem[i].querySelector(".title");
    if (productT && productT.innerText.trim() === productName.trim()) {
      alert("Sản phẩm của bạn đã có trong giỏ hàng");
      return;
    }
  }

  // Nếu chưa có, thêm sản phẩm vào giỏ hàng
  var trcontent =
    '<tr><td style="display: flex; align-items: center;"><img style="width: 70px;" src="' +
    productImg +
    '" alt=""><span class="title">' +
    productName +
    '</span></td><td><p><span class="prices">' +
    productPrice +
    '</span><sup>đ</sup></p></td><td><input style="width: 30px; outline: none;" type="number" value="1" min="1"></td><td style="cursor: pointer;"><span class="cart-delete">Xóa</span></td></tr>';

  addtr.innerHTML = trcontent;
  var cartTable = document.querySelector("tbody");
  cartTable.append(addtr);

  carttotal();
  deleteCart();
  inputchange();
}

// Tính tổng giá trị giỏ hàng
function carttotal() {
  var cartItem = document.querySelectorAll("tbody tr");
  var totalC = 0;

  for (var i = 0; i < cartItem.length; i++) {
    var inputValue = cartItem[i].querySelector("input").value;
    var productPrice = cartItem[i].querySelector(".prices").innerHTML;
    totalA = inputValue * productPrice * 1000; // Cập nhật nhân với 1000 để tính tổng
    totalC += totalA;
  }
  var cartTotalA = document.querySelector(".price-total span");
  var cartPrice = document.querySelector(".cart-icon span");
  cartTotalA.innerHTML = totalC.toLocaleString("de-DE");
  cartPrice.innerHTML = totalC.toLocaleString("de-DE");
}

// Xóa sản phẩm trong giỏ hàng
function deleteCart() {
  var cartItem = document.querySelectorAll("tbody tr");
  cartItem.forEach(function (item) {
    var deleteBtn = item.querySelector(".cart-delete");
    deleteBtn.addEventListener("click", function () {
      item.remove();
      carttotal(); // Cập nhật lại tổng giá trị sau khi sản phẩm bị xóa
    });
  });
}

// Thay đổi số lượng sản phẩm
function inputchange() {
  var cartItem = document.querySelectorAll("tbody tr");
  cartItem.forEach(function (item) {
    var inputValue = item.querySelector("input");
    inputValue.addEventListener("change", function () {
      carttotal(); // Cập nhật lại tổng giá trị khi số lượng thay đổi
    });
  });
}

// // Hiện/ẩn giỏ hàng
// const cartbtn = document.querySelector(".fa-circle-xmark");
// const cartshow = document.querySelector(".cart-icon i");

// cartshow.addEventListener("click", function () {
//   document.querySelector(".cart").style.right = "0";
// });

// cartbtn.addEventListener("click", function () {
//   document.querySelector(".cart").style.right = "-100%";
// });

// // Hiện/ẩn giỏ hàng
// const cartbtn = document.querySelector(".fa-circle-xmark");
// const cartshow = document.querySelector(".cart-icon i");

// cartshow.addEventListener("click", function () {
//   document.querySelector(".cart").classList.add("show");
//   document.querySelector(".product").style.marginRight = "400px"; // Thay đổi khoảng cách khi giỏ hàng hiện
// });

// cartbtn.addEventListener("click", function () {
//   document.querySelector(".cart").classList.remove("show");
//   document.querySelector(".product").style.marginRight = "0"; // Đặt lại khoảng cách khi giỏ hàng ẩn
// });

// Hiện/ẩn giỏ hàng
const cartbtn = document.querySelector(".fa-circle-xmark");
const cartshow = document.querySelector(".cart-icon i");

cartshow.addEventListener("click", function () {
  document.querySelector(".cart").classList.add("show");
  document.querySelector(".product").classList.add("cart-active"); // Thêm class để thay đổi vị trí sản phẩm
});

cartbtn.addEventListener("click", function () {
  document.querySelector(".cart").classList.remove("show");
  document.querySelector(".product").classList.remove("cart-active"); // Gỡ bỏ class khi giỏ hàng ẩn
});
