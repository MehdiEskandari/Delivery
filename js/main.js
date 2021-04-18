const items = document.querySelectorAll(".category li");
const itemDefualt = document.querySelector(".category li.active");
const categoryTitle = document.querySelector("#category-title");


items.forEach((item)=>{
    item.addEventListener('click', () => getProduct(item));
})
