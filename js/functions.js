const filteredProducts = (title) => {
    const currentCategoryIndex = categories.findIndex(category => {
         return category.title.toLowerCase() === title.textContent.trim().toLowerCase()
    })

    const isAll = currentCategoryIndex != -1 ? currentCategoryIndex : "all";
    console.log(isAll);
    const filteredProducts = products.filter((product) => {
        return isAll === "all" ? product: product.category === categories[currentCategoryIndex].id
    })
    console.log(filteredProducts);
    return filteredProducts;
}

const updateCategoryTitle = (icon, title) => {
    const iconElement = document.createElement('span');
    iconElement.append(icon);
    categoryTitle.textContent = ''
    categoryTitle.textContent = title.textContent.trim();
    categoryTitle.prepend(iconElement);
}

const createProductElement = (product) => {
    return productElement = ` 
    <header class="product-photo">
        <img src="${product.imageUrl}" alt="">
        <span class="product-rate">${product.rate}</span>
    </header>
    <h3>${product.title}</h3>
    <footer>
        <span class="product-provider">${product.host}</span>
        <span class="product-price">${product.price} $</span>
    </footer>
    `
}

const renderProducts = (products) => {
    const productsElement = document.querySelector('#products');
    productsElement.innerHTML = '';
    products.forEach((product)=> {
        const productElement = document.createElement('div')
        productElement.classList = "product"
        productElement.innerHTML = createProductElement(product)
        productsElement.appendChild(productElement)
    })
}

const getProduct = (item) => {
    const lastItem = document.querySelectorAll(".category li.active")
    lastItem[0].classList = '';
    item.classList.add("active");
    
    const icon = document.querySelector(".category li.active svg").cloneNode( true );
    const title = document.querySelector(".category li.active a").cloneNode( true );
    
    
    updateCategoryTitle(icon, title);
    const filteredItems = filteredProducts(title)
    renderProducts(filteredItems)

}

// Defualt
const iconDefualt = document.querySelector(".category li.active svg").cloneNode( true );
const titleDefualt = document.querySelector(".category li.active a").cloneNode( true );

updateCategoryTitle(iconDefualt, titleDefualt);
const filteredItems = filteredProducts(titleDefualt)
renderProducts(filteredItems)