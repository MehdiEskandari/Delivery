const saveLocalStorage = () => {
  localStorage.setItem('orderedProducts', JSON.stringify(orderedProducts));
};

// const setBtns = ()=>{
//     const orderPlusBtns = document.querySelectorAll('.order-product-options-plus');
//     const orderMinusBtns = document.querySelectorAll('.order-product-options-minus');


//     orderPlusBtns.forEach((plusBtn) => {
//     plusBtn.addEventListener('click', () => {
//         const productId = plusBtn.parentNode.parentNode.getAttribute('id')
//         .split('-')[1];
//         orderedProducts[+productId].count += 1;
//         const newTitle = `${orderedProducts[+productId].count} x ${plusBtn.parentNode.parentNode.parentNode.querySelector('.order-product-title').textContent.split(' x ')[1]}`;
//         plusBtn.parentNode.parentNode.parentNode.querySelector('.order-product-title').textContent = newTitle;
//         saveLocalStorage();
//         updateTotalPrices();
//     });
//     });

//     orderMinusBtns.forEach((minusBtn) => {
//         minusBtn.addEventListener('click', () => {
//         const productId = minusBtn.parentNode.parentNode.getAttribute('id')
//             .split('-')[1];
//         orderedProducts[+productId].count -= 1;
//         const newTitle = `${orderedProducts[+productId].count} x ${minusBtn.parentNode.parentNode.parentNode.querySelector('.order-product-title').textContent.split(' x ')[1]}`;
//         minusBtn.parentNode.parentNode.parentNode.querySelector('.order-product-title').textContent = newTitle;
//         saveLocalStorage();
//         updateTotalPrices();
//         });
//     });
// }
const filteredProducts = (title) => {
  const currentCategoryIndex = categories.findIndex((category) => {
    return (
      category.title.toLowerCase() === title.textContent.trim().toLowerCase()
    );
  });

  const isAll = currentCategoryIndex != -1 ? currentCategoryIndex : 'all';
  console.log(isAll);
  const filteredProducts = products.filter((product) => {
    return isAll === 'all'
      ? product
      : product.category === categories[currentCategoryIndex].id;
  });
  console.log(filteredProducts);
  return filteredProducts;
};

const updateCategoryTitle = (icon, title) => {
  const iconElement = document.createElement('span');
  iconElement.append(icon);
  categoryTitle.textContent = '';
  categoryTitle.textContent = title.textContent.trim();
  categoryTitle.prepend(iconElement);
};

const createProductElement = (product) => {
  return (productElement = ` 
    <header class="product-photo">
        <img src="${product.imageUrl}" alt="">
        <span class="product-rate">${product.rate}</span>
    </header>
    <h3>${product.title}</h3>
    <footer>
        <span class="product-provider">${product.host}</span>
        <span class="product-price">${product.price} $</span>
    </footer>
    `);
};

const createOrderProductElement = (order) => {
  const product = products[order.id - 1];

  return (orderElement = ` 
    <div id="product-${order.id - 1}" class="order-product-content">
        <img src="${product.imageUrl}" alt="">
        <div class="order-product-options">
            <span class="order-product-options-plus">+</span>
            <span class="order-product-options-minus">-</span>
        </div>
    </div>
    
    <div class="order-product-details">
        <span class="order-product-title">${order.count} x ${
    product.title
  }</span>
        <span class="order-product-price">$${product.price}</span>
    </div>
    `);
};

const renderOrderedProducts = () => {
  const orderElements = document.querySelector('#order-products');
  orderElements.innerHTML = '';
  if (orderedProducts.length > 0) {
    orderedProducts.forEach((order) => {
      const orderElement = document.createElement('div');
      orderElement.classList = 'order-product';
      orderElement.innerHTML = createOrderProductElement(order);
      orderElements.appendChild(orderElement);
    });
  } else {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Opps! here is empty';
    orderElements.appendChild(emptyMessage);
  }
};

const updateTotalPrices = () => {
  const prices = [];
  orderedProducts.forEach((item) => {
    const index = products.findIndex((p) => p.id === item.id);
    const price = products[index].price * item.count;
    prices.push(price);
  });
  const total = prices.length > 0 ? prices.reduce((a, b) => a + b) : 0;

  const totalElement = document.querySelector('#total-price');
  totalElement.textContent = `$${total}`;
};

const addToOrder = (product) => {
  const existProduct = orderedProducts.findIndex((p) => p.id === product.id);
  console.log(existProduct);
  if (existProduct != -1) {
    orderedProducts[existProduct].count += 1;
  } else {
    orderedProducts.push({
      id: product.id,
      count: 1,
    });
  }

  renderOrderedProducts();
  updateTotalPrices();
  saveLocalStorage();
};

const renderProducts = (products) => {
  const productsElement = document.querySelector('#products');
  productsElement.innerHTML = '';
  products.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.classList = 'product';
    productElement.innerHTML = createProductElement(product);
    productElement.addEventListener('click', () => addToOrder(product));
    productsElement.appendChild(productElement);
  });
};

const getProduct = (item) => {
  const lastItem = document.querySelectorAll('.category li.active');
  lastItem[0].classList = '';
  item.classList.add('active');

  const icon = document
    .querySelector('.category li.active svg')
    .cloneNode(true);
  const title = document.querySelector('.category li.active a').cloneNode(true);

  updateCategoryTitle(icon, title);
  const filteredItems = filteredProducts(title);
  renderProducts(filteredItems);
};

// Defualt
const iconDefualt = document
  .querySelector('.category li.active svg')
  .cloneNode(true);
const titleDefualt = document
  .querySelector('.category li.active a')
  .cloneNode(true);

updateCategoryTitle(iconDefualt, titleDefualt);
const filteredItems = filteredProducts(titleDefualt);
renderProducts(filteredItems);
renderOrderedProducts();
updateTotalPrices();
// setBtns();

