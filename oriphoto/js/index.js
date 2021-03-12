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

// Création de la page propre à chaque produit

async function productDetailPage() {

    // Définition de l'ID du produit d'après l'ID situé dans l'URL afin de pouvoir appeler son contenu depuis l'API
    productId = location.search.substring(4);
    console.log(productId);

    // Appel à l'API pour récupérer les informations du produit
    const selectedProduct = await getProductsInfo();

    //Ajout des éléments suivants au main de la page produit
    let selectedProductDetails = document.getElementById("product-details-main");

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
    selectedProductArticle.setAttribute("class", "details--product-article col-sm-12");

    // Bloc regroupant le nom et la description de l'article
    let selectedProductDetailsBlock = document.createElement("aside");
    selectedProductDetailsBlock.setAttribute("class", "card details--product-details-aside");

    // Nom de l'article
    let selectedProductName = document.createElement("h3");
    selectedProductName.setAttribute("class", "details--product-name");

    // Description de l'article
    let selectedProductDescription = document.createElement("h5");
    selectedProductDescription.setAttribute("class", "details--product-description");

    // Bloc regroupant les détails d'achat de l'article
    let selectedProductBuyBlock = document.createElement("aside");
    selectedProductBuyBlock.setAttribute("class", "card details--product-buy-aside");

    // Prix de l'article
    let selectedProductPrice = document.createElement("h4");
    selectedProductPrice.setAttribute("class", "details--product-price");

    // Texte pour les options de l'article
    /*let selectedProductOptionsText = document.createElement("h6");
    selectedProductOptionsText.setAttribute("class", "details--product-options-text");*/

    // Options de l'article
    let selectedProductSelect = document.createElement("select");
    selectedProductSelect.setAttribute("id", "product-options");
    selectedProductSelect.setAttribute("class", "details--product-options");
    selectedProductSelect.setAttribute("onChange", "selectionChange(this);");

    selectionChange = function (select) {
        let selection = select.options[select.selectedIndex].text;
        // Si l'index du select est 0 alors la réponse sera invalide
        if (select.selectedIndex == 0) {
            selectedProductSelect.setAttribute("value", "null");
        } else {
            selectedProductSelect.setAttribute("value", selection);
        }
    }

    // Lien pour acheter le produit
    let selectedProductBuy = document.createElement("a");
    selectedProductBuy.setAttribute("id", "add-to-cart-button");
    selectedProductBuy.setAttribute("class", "btn btn-warning");
    selectedProductBuy.setAttribute("href", "/cart.html");
    selectedProductBuy.setAttribute("onclick", "addToCart()");

    /* Configuration de la parenté de chaque élément: 
    Le container se retrouve sous la section contenant les articles, l'image et la légende dans le figure, et les caractéristiques dans le figcaption*/
    selectedProductDetails.appendChild(selectedProductContainer);
    selectedProductContainer.appendChild(selectedProductImage);
    selectedProductContainer.appendChild(selectedProductArticle);
    selectedProductArticle.appendChild(selectedProductDetailsBlock);
    selectedProductArticle.appendChild(selectedProductBuyBlock);
    selectedProductDetailsBlock.appendChild(selectedProductName);
    selectedProductDetailsBlock.appendChild(selectedProductDescription);
    selectedProductBuyBlock.appendChild(selectedProductPrice);
    //selectedProductBuyBlock.appendChild(selectedProductOptionsText);
    selectedProductBuyBlock.appendChild(selectedProductSelect);
    selectedProductBuyBlock.appendChild(selectedProductBuy);

    document.getElementById("product-name").textContent = selectedProduct.name;
    document.title = "Produit : " + selectedProduct.name;

    // Création des options du produit
    // Option par défaut : Texte disant de choisir (retournant une value de null)
    const defaultSelectedProductOption = document.createElement("option");
    selectedProductSelect.appendChild(defaultSelectedProductOption);
    defaultSelectedProductOption.innerHTML = "Choisissez votre option";

    // Boucle 'for' créant les options à partir de l'api
    let soldProductOptions = selectedProduct.lenses;

    for (let i = 0; i < soldProductOptions.length; i++) {
        let selectedProductOption = document.createElement("option");
        selectedProductOption.innerHTML = selectedProduct.lenses[i];
        selectedProductSelect.appendChild(selectedProductOption);
        selectedProductSelect.setAttribute("value", "null");
        console.log(selectedProduct.lenses[i], i);
    }


    // Contenu de chaque balise créée
    selectedProductName.textContent = selectedProduct.name;
    selectedProductPrice.textContent = parseFloat(selectedProduct.price / 100).toFixed(2) + " €";
    selectedProductDescription.textContent = selectedProduct.description;
    selectedProductBuy.textContent = "Ajouter au panier";
    selectedProductBuy.addEventListener("click", function (event) {
        event.preventDefault()
    });
};

// Création du script du panier

/*let shoppingCart = (function () {
    let cart = [];

    function Item(name, id, price, count) {
        this.name = selectedProduct.name;
        this.id = selectedProduct.id;
        this.price = selectedProduct.price;
        this.count = count;
    }

    function saveCart() {
        localStorage.setItem(cartId, JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem(cartId));
        if (cart === null) {
            cart = []
        }
    }

    loadCart();

    let selectedItem = {};

    selectedItem.addItemToCart = function (name, id, price, count) {
        for (let i in cart) {
            if (cart[i].name === selectedProduct.name) {
                cart[i].count += count;
                saveCart();
                return;
            }
        }

        console.log("addItemToCart", name, id, price, count)
    }
})*/
/*
let checkShoppingCart = () => {
    if (localStorage.getItem(cartId)) {
        isShoppingCart = true;
    }
}

if (isShoppingCart = false) {

}*/

// Configuration du bouton ajouter au panier
async function addToCart() {

    // Appel à l'API pour récupérer les informations du produit
    const selectedProduct = await getProductsInfo();

    let addToCartButton = document.getElementById("add-to-cart-button");
    document.addEventListener("click", addToCartButton)

    // Ajout au panier

    //Déclaration des variables du panier
    const cartId = "userShoppingCart" // Nom du panier qui sera ajouté au localStorage
    let isShoppingCart = false; // Le panier est-il initialisé
    let shoppingCart = []; // Tableau contenant les éléments ajoutés au panier

    const itemName = selectedProduct.name;
    //console.log(itemName);

    const itemId = selectedProduct._id;
    //console.log(itemId);

    const itemPrice = parseFloat(selectedProduct.price / 100).toFixed(2) + " €";
    //console.log(itemPrice);

    // Option sélectionnée
    let select = document.getElementById("product-options");
    let itemOption = select.value;
    let cartItemsNumber = shoppingCart.length;
    let itemCount = 1;

    for (var i = 0; i < cartItemsNumber; i++) {
        if (cartItemsNumber[i].itemId == itemId) {
            itemCount += itmenCount;
        }
    }
    let selectedItem = { itemName, itemId, itemPrice, itemOption, itemCount }
    // Si aucune option n'est choisie, alors on retourne une erreur
    if (itemOption != "Choisissez votre option") {
        shoppingCart.push(selectedItem);
    } else {
        alert("Erreur : Veuillez sélectionner une option");
    }
    console.log(itemCount);










}


