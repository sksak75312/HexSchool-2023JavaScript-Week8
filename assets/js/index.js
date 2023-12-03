// 套件引入
import axios from 'axios';
import validate from 'validate.js';

// API 網域、路徑
const baseUrl = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/';
const apiPath = 'eerojslive';

// DOM 選取
const productsList = document.querySelector('.productsList');
const productSort = document.querySelector('.productSort');
const cartsList = document.querySelector('.cartsList');
const delAllCartsRow = document.querySelector('.delAllCartsRow');
const orderForm = document.querySelector('.orderForm');

// DOM All 選取
const orderInput = document.querySelectorAll('[data-order]');

// 變數宣告
const userData = {};
let productsSet = [];
let cartsSet = {};

// 取得產品資料
const getProducts = () => {
  axios
    .get(`${baseUrl}${apiPath}/products`)
    .then((res) => {
      productsSet = res.data.products;
      renderProducts(productsSet);
    })
    .catch((err) => {
      console.log(err);
    });
};

// 取得購物車資料
const getCarts = () => {
  axios
    .get(`${baseUrl}${apiPath}/carts`)
    .then((res) => {
      cartsSet = res.data;
      renderCarts(cartsSet);
    })
    .catch((err) => {
      console.log(err);
    });
};

// 新增購物車資料
const postCarts = (productId) => {
  axios
    .post(`${baseUrl}${apiPath}/carts`, {
      data: {
        productId,
        quantity: 1,
      },
    })
    .then((res) => {
      cartsSet = res.data;
      renderCarts(cartsSet);
    })
    .catch((err) => {
      console.log(err);
    });
};

// 刪除購物車全部品項
const deleteAllCarts = () => {
  axios.delete(`${baseUrl}${apiPath}/carts`)
  .then((res) => {
    cartsSet = res.data;
    renderCarts(cartsSet);
  })
  .catch((err) => {
    console.log(err)
  })
}

// 刪除單一購物車品項
const deleteSingleCarts = (cartId) => {
  axios.delete(`${baseUrl}${apiPath}/carts/${cartId}`)
    .then(res => {
      cartsSet = res.data
      renderCarts(cartsSet);
    })
    .catch(err => {
      console.log(err)
    })
}

// 送出訂單
const postOrder = (user) => {
  axios.post(`${baseUrl}${apiPath}/orders`, {data: {user}})
    .then(res => {
      orderForm.reset();
      getCarts();
    })
    .catch(err => {
      console.log(err)
    })
}

// 渲染產品列表
const renderProducts = (productsSet) => {
  productsList.innerHTML = productsSet
    .map(
      (product) => `<li class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-[15px]">
            <div class="relative">
              <img src="${product.images}" class="w-full object-cover" alt="${product.description}">
              <span class="absolute top-3 -right-1 py-2 px-6 bg-black text-xl text-white">新品</span>
            </div>
            <button type="button" class="w-full py-3 bg-black text-white text-xl hover:bg-purple-light" data-productId="${product.id}">加入購物車</button>
            <h2 class="pt-2 mb-2 text-xl">${product.title}</h2>
            <del class="text-xl">NT$${product.origin_price}</del>
            <p class="text-28px">NT$${product.price}</p>
          </li>`
    )
    .join('');
};

// 渲染購物車列表
const renderCarts = (cartsSet) => {
  const carts = cartsSet.carts;
  if (carts.length) {
    cartsList.innerHTML = cartsSet.carts.map((cart) => `<tr class="border-b">
                  <td class="flex items-center gap-[15px] py-5">
                    <img src="${cart.product.images}" class="w-20 h-20" alt="${cart.product.description}">
                    <h3>${cart.product.title}</h3>
                  </td>
                  <td>NT$${cart.product.price}</td>
                  <td>${cart.quantity}</td>
                  <td>NT$${cart.product.price * cart.quantity}</td>
                  <td class="text-right">
                    <button type="button" class="material-symbols-outlined hover:text-purple text-4xl" data-cartId="${
                      cart.id
                    }">
                      close
                    </button>
                  </td>
                </tr>`
      )
      .join('');
  } else {
    cartsList.innerHTML = '';
  }
  renderTotalPrice();
};

// 渲染總金額
const renderTotalPrice = () => {
  delAllCartsRow.lastElementChild.innerHTML = `<span class="mr-[55px] text-xl">總金額</span>
    <span class="totalPrice">NT$${cartsSet.finalTotal}</span>`;
};

// 監聽產品列表
productsList.addEventListener('click', (e) => {
  const currentId = e.target.getAttribute('data-productId');
  if (!currentId) {
    return;
  }
  postCarts(currentId);
});

// 監聽產品篩選
productSort.addEventListener('change', (e) => {
  const value = e.target.value;
  if (value) {
    const filterProduct = productsSet.filter((product) => product.category === value);
    renderProducts(filterProduct);
  } else {
    renderProducts(productsSet);
  }
});

// 監聽購物車列表
cartsList.addEventListener('click', (e) => {
  const currentId = e.target.getAttribute('data-cartId');
  if (!currentId) {
    return;
  }

  deleteSingleCarts(currentId);
});

// 監聽刪除全部購物車列
delAllCartsRow.addEventListener('click', (e) => {
  if (e.target.type !== 'button') {
    return;
  }
  deleteAllCarts();
});

// 監聽訂單按鈕
orderForm.addEventListener('click', (e) => {
  if (e.target.type !== 'button') {
    return;
  }
  orderInput.forEach(({ dataset, value }) => {
    userData[dataset.order] = value;
  });
  orderValidate();
});

// 訂單驗證
const orderValidate = () => {
  const constraints = {
    姓名: {
      presence: {
        message: '為必填',
      },
    },
    電話: {
      presence: {
        message: '為必填',
      },
    },
    信箱: {
      presence: {
        message: '為必填',
      },
    },
    地址: {
      presence: {
        message: '為必填',
      },
    },
    交易方式: {
      presence: {
        message: '為必填',
      },
    },
  };

  const errors = validate(orderForm, constraints);
  orderInput.forEach((el) => {
    el.nextElementSibling.textContent = '';
  })

  if (errors) {
    document.querySelectorAll('[data-message]').forEach(el => {
      el.textContent = errors[el.dataset.message];
    })
  } else {
    postOrder(userData)
  }
};

// 函式初始化呼叫
getProducts();
getCarts();