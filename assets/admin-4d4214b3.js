import{a}from"./main-6ce664c7.js";const s="https://livejs-api.hexschool.io/api/livejs/v1/admin/",o="zyHUjKJKsufh9tT1Je724rMgZnJ3",l="eerojslive",c=document.querySelector(".adminOrderList"),b=document.querySelector('[data-btn="delAllBtn"]');let d=[];const u=()=>{a.get(`${s}${l}/orders`,{headers:{authorization:o}}).then(e=>{d=e.data.orders,n(d)}).catch(e=>{console.log(e)})},h=e=>{const t=d.find(r=>r.id===e);a.put(`${s}${l}/orders`,{data:{id:e,paid:!t.paid}},{headers:{authorization:o}}).then(r=>{d=r.data.orders,n(d)}).catch(r=>{console.log(r)})},p=()=>{a.delete(`${s}${l}/orders`,{headers:{authorization:o}}).then(e=>{d=e.data.orders,n(d)}).catch(e=>{console.log(e)})},$=e=>{a.delete(`${s}${l}/orders/${e}`,{headers:{authorization:o}}).then(t=>{d=t.data.orders,n(d)}).catch(t=>{console.log(t)})},n=e=>{c.innerHTML=e.map(t=>{const r=new Date(t.createdAt*1e3);return`<tr class="text-left [&>td]:py-3 [&>td]:px-4">
                <td class="border border-black">${t.id}</td>
                <td class="border border-black">${t.user.name} <br> ${t.user.tel}</td>
                <td class="border border-black">${t.user.address}</td>
                <td class="border border-black">${t.user.email}</td>
                <td class="border border-black">${t.products.map(i=>`<p>${i.title}</p>`).join("")}</td>
                <td class="border border-black">${r.getFullYear()}/${r.getMonth()+1}/${r.getDate()}</td>
                <td class="border border-black">
                  <a href="#" class="text-blue-600 underline" data-state="${t.id}">${t.paid?"已處理":"未處理"}</a>
                </td>
                <td class="border border-black" style="padding-left: 2px; padding-right: 2px;">
                  <button type="button" class="block py-2 mx-auto w-full bg-red-700 text-white hover:bg-red-800" data-del="${t.id}">刪除</button>
                </td>
              </tr>`}).join("")};c.addEventListener("click",e=>{e.preventDefault();const t=e.target.dataset.state||e.target.dataset.del;if(t)e.target.dataset.state?h(t):$(t);else return});b.addEventListener("click",e=>{p()});u();
