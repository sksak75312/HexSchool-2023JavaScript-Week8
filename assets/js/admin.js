import axios from "axios";

const baseUrl = 'https://livejs-api.hexschool.io/api/livejs/v1/admin/';
const apiKey = 'zyHUjKJKsufh9tT1Je724rMgZnJ3';
const apiPath = 'eerojslive';

const adminOrderList = document.querySelector('.adminOrderList');
const delAllBtn = document.querySelector('[data-btn="delAllBtn"]');

let ordersSet = [];

// 取得所有訂單
const getAdminOrders = () => {
  axios.get(`${baseUrl}${apiPath}/orders`, {
    headers: {
      authorization: apiKey
    },
  })
  .then(res => {
    ordersSet = res.data.orders;
    renderAdminOrders(ordersSet);
  })
  .catch(err => {
    console.log(err)
  })
}

// 修改訂單狀態
const putAdminOrder = (id) => {
  const currentOrder = ordersSet.find(order => order.id === id);
  axios.put(`${baseUrl}${apiPath}/orders`, {
    data: {
    id,
    paid: !currentOrder.paid
  }
  }, {
    headers: {
      authorization: apiKey,
    },
  })
  .then(res => {
    ordersSet = res.data.orders;
    renderAdminOrders(ordersSet);
  })
  .catch(err => {
    console.log(err)
  })
}

// 刪除全部訂單
const deleteAllOrder = () => {
  axios.delete(`${baseUrl}${apiPath}/orders`, {
    headers: {
      authorization: apiKey,
    },
  })
  .then(res => {
    ordersSet = res.data.orders;
    renderAdminOrders(ordersSet);
  })
  .catch(err => {
    console.log(err);
  })
}

// 刪除單一訂單
const deleteSingleOrder = (id) => {
  axios.delete(`${baseUrl}${apiPath}/orders/${id}`, {
    headers: {
      authorization: apiKey,
    },
  })
  .then(res => {
    ordersSet = res.data.orders
    renderAdminOrders(ordersSet);
  })
  .catch(err => {
    console.log(err);
  })
}

// 渲染所有訂單資料
const renderAdminOrders = (ordersSet) => {
  adminOrderList.innerHTML = ordersSet.map((order) => {
    const orderTime = new Date(order.createdAt * 1000);
    return `<tr class="text-left [&>td]:py-3 [&>td]:px-4">
                <td class="border border-black">${order.id}</td>
                <td class="border border-black">${order.user.name} <br> ${order.user.tel}</td>
                <td class="border border-black">${order.user.address}</td>
                <td class="border border-black">${order.user.email}</td>
                <td class="border border-black">${order.products.map(product => `<p>${product.title}</p>`).join('')}</td>
                <td class="border border-black">${orderTime.getFullYear()}/${orderTime.getMonth() + 1}/${orderTime.getDate()}</td>
                <td class="border border-black">
                  <a href="#" class="text-blue-600 underline" data-state="${order.id}">${order.paid ? '已處理' : '未處理'}</a>
                </td>
                <td class="border border-black" style="padding-left: 2px; padding-right: 2px;">
                  <button type="button" class="block py-2 mx-auto w-full bg-red-700 text-white hover:bg-red-800" data-del="${order.id}">刪除</button>
                </td>
              </tr>`}
  ).join('');
}

// 監聽訂單列表
adminOrderList.addEventListener('click', (e) => {
  e.preventDefault();
  const currentId = e.target.dataset.state || e.target.dataset.del;
  if (!currentId) {
    return;
  } else if (e.target.dataset.state) {
    putAdminOrder(currentId);
  } else {
    deleteSingleOrder(currentId);
  }
})

// 監聽刪除全部訂單
delAllBtn.addEventListener('click', (e) => {
  deleteAllOrder();
})

getAdminOrders();