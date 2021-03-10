// Définitions de variables permettant de rendre le code plus modulaire
const soldProduct = "cameras"; // Passage du produit vendu en variable afin de pouvoir facilement modifier sa valeur
const apiUrl = "http://localhost:3000/api/" + soldProduct + "/"; // Lien vers l'API du type de produit vendu

// ID de chaque produit
let productId = "";

// Appel de l'API grâce à fetch
async function getProductsInfo() {
    const response = await fetch(apiUrl + productId);
    const fetchedProducts = await response.json();
    console.log(fetchedProducts)

    console.log("API reached. Code " + response.status);
    error = document.getElementById("error");
    if (error) {
        error.remove();
    }
    return fetchedProducts;
}

/* Création du HTML */

//Fonction créant la liste des produits vendus

async function productsLibrary() {
    const products = await getProductsInfo();

    // Section dans laquelle se trouvera la liste des produits
    let productsLibrary = document.createElement("section");
    productsLibrary.setAttribute("class", "products-list row");

    // Intégration de la section dans le <main> de la page
    let main = document.getElementById("main");
    main.appendChild(productsLibrary);

    // Structure de chaque article
    products.forEach(product => {
        // Structure de la carte de l'article
        // Container de l'article
        let productContainer = document.createElement("figure");
        productContainer.setAttribute("class", "card product-element col shadow rounded");

        // Image de l'article
        let productImage = document.createElement("img");
        productImage.setAttribute("class", "product-img");
        productImage.setAttribute("src", product.imageUrl);

        // Légende de l'image
        let productFigcaption = document.createElement("figcaption");
        productFigcaption.setAttribute("class", "card-body");

        // Nom de l'article
        let productName = document.createElement("h3");
        productName.setAttribute("class", "card-title");

        // Prix de l'article
        let productPrice = document.createElement("h4");
        productPrice.setAttribute("class", "text-text");

        // Lien pour accéder à la page de l'article
        let productSelect = document.createElement("a");
        productSelect.setAttribute("class", "btn btn-primary stretched-link");
        productSelect.setAttribute("href", "./product.html?id=" + product._id);

        /* Configuration de la parenté de chaque élément: 
        Le container se retrouve sous la section contenant les articles, l'image et la légende dans le figure, et les caractéristiques dans le figcaption*/
        productsLibrary.appendChild(productContainer);
        productContainer.appendChild(productImage);
        productContainer.appendChild(productFigcaption);
        productFigcaption.appendChild(productName);
        productFigcaption.appendChild(productPrice);
        productFigcaption.appendChild(productSelect);

        // Contenu de chaque balise créée
        productName.textContent = product.name;
        productPrice.textContent = parseFloat(product.price / 100).toFixed(2) + " €";
        productSelect.textContent = "En savoir plus";

    });
};

// Récupération du panier d'achat s'il existe sinon, il est créé

/*let cartId = "userShoppingCart"

if (localStorage.getItem(cartId)) {
    console.log("The shopping cart exists")
} else {
    console.log("Shopping cart not found. Creating one...")
    let shoppingCart = [];
    localStorage.setItem(cartId, JSON.stringify(shoppingCart));
};

let shoppingCart = {
    saveCart: function (product) {
        let stringifiedCart = JSON.stringify(product);
        localStorage.setItem(cartId, stringifiedCart);
        return true;
    },

    getCart: function () {
        return JSON.parse(localStorage.getItem(cartId));
    },

    clearCart: function () {
        localStorage.removeItem(cartId);
    }
};*/

// Affichage du panier
/*console.log(shoppingCart.getCart.length);

let shoppingCartNumberOfItems = document.getElementById("shopping-cart-number");
shoppingCartNumberOfItems.innerHTML = shoppingCart.getCart.length;*/

// Création de la page produit

async function productDetailPage() {

    // Définition de l'ID du produit d'après l'ID situé dans l'URL afin de pouvoir appeler son contenu depuis l'API
    productId = location.search.substring(4);
    console.log(productId);

    // Appel à l'API pour récupérer les informations du produit
    const selectedProduct = await getProductsInfo();

    // Structure de la page de l'article
    // Container de l'article
    let selectedProductContainer = document.createElement("section");
    selectedProductContainer.setAttribute("class", "details--product-container");

    // Image de l'article
    let selectedProductImage = document.createElement("img");
    selectedProductImage.setAttribute("class", "details--product-image");
    selectedProductImage.setAttribute("src", selectedProduct.imageUrl);

    // Légende de l'image
    let selectedProductArticle = document.createElement("article");
    selectedProductArticle.setAttribute("class", "details--product-article");

    // Nom de l'article
    let selectedProductName = document.createElement("h3");
    selectedProductName.setAttribute("class", "details--product-name");

    // Prix de l'article
    let selectedProductPrice = document.createElement("h4");
    selectedProductPrice.setAttribute("class", "details--product-price");

    // Description de l'article
    let selectedProductDescription = document.createElement("h5");
    selectedProductDescription.setAttribute("class", "details--product-description");

    // Options de l'article
    let selectedProductOptions = document.createElement("select");
    selectedProductOptions.setAttribute("id", "product-options");
    selectedProductOptions.setAttribute("class", "details--product-options");

    // Lien pour acheter le produit
    let selectedProductSelect = document.createElement("a");
    selectedProductSelect.setAttribute("class", "btn btn-warning");
    selectedProductSelect.setAttribute("href", "/cart.html");

    /* Configuration de la parenté de chaque élément: 
    Le container se retrouve sous la section contenant les articles, l'image et la légende dans le figure, et les caractéristiques dans le figcaption*/
    selectedProductDetails.appendChild(selectedProductContainer);
    selectedProductContainer.appendChild(selectedProductImage);
    selectedProductContainer.appendChild(selectedProductFigcaption);
    selectedProductFigcaption.appendChild(selectedProductName);
    selectedProductFigcaption.appendChild(selectedProductPrice);
    selectedProductFigcaption.appendChild(selectedProductSelect);

    // Contenu de chaque balise créée
    selectedProductName.textContent = selectedProduct.name;
    selectedProductPrice.textContent = parseFloat(selectedProduct.price / 100).toFixed(2) + " €";
    selectedProductSelect.textContent = "Ajouter au panier";
};





