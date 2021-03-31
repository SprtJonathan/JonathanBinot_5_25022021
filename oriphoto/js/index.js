// Définitions de variables permettant de rendre le code plus modulaire
const soldProduct = "cameras"; // Passage du produit vendu en variable afin de pouvoir facilement modifier sa valeur
const apiUrl = "http://localhost:3000/api/" + soldProduct + "/"; // Lien vers l'API du type de produit vendu

// Déclaration des variables du panier
const cartId = "userShoppingCart"; // Nom du panier qui sera ajouté au localStorage
let shoppingCart = JSON.parse(localStorage.getItem(cartId)); // Tableau contenant les éléments ajoutés au panier

function getItemsNumber() {
  // Ajout de l'affichage du nombre d'éléments dans le panier
  // Vérification que le localStorage soit initialisée pour éviter les erreurs
  if (localStorage.getItem(cartId)) {
    console.log(shoppingCart);
  } else {
    console.log("Le panier va être initalisé");
    shoppingCart = [];
    localStorage.setItem(cartId, JSON.stringify(shoppingCart));
  }
  let cartItemsNumber = shoppingCart.length; // Nombre d'articles dans le panier
  let cartNumber = document.getElementById("shopping-cart-number"); // Nombre d'articles dans le panier
  cartNumber.textContent = cartItemsNumber;
}

// ID de chaque produit
let productId = "";

// Appel de l'API grâce à fetch
async function getProductsInfo() {
  const response = await fetch(apiUrl + productId);
  const fetchedProducts = await response.json();
  //console.log(fetchedProducts)

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
  products.forEach((product) => {
    // Structure de la carte de l'article
    // Container de l'article
    let productContainer = document.createElement("figure");
    productContainer.setAttribute(
      "class",
      "card product-element col shadow rounded"
    );

    // Image de l'article
    let productImage = document.createElement("img");
    productImage.setAttribute("class", "product-img");
    productImage.setAttribute("src", product.imageUrl);
    productImage.setAttribute("alt", "Illustration produit");

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
    productPrice.textContent =
      parseFloat(product.price / 100).toFixed(2) + " €";
    productSelect.textContent = "En savoir plus";
  });
}
