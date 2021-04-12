// Définitions de variables permettant de rendre le code plus modulaire
const soldProduct = "cameras"; // Passage du produit vendu en variable afin de pouvoir facilement modifier sa valeur
const apiUrl = "http://localhost:3000/api/" + soldProduct + "/"; // Lien vers l'API du type de produit vendu 
//const apiUrl = "https://ab-p5-api.herokuapp.com/api/" + soldProduct + "/"; // Lien vers l'API du type de produit vendu 
//(ce dernier URL était utilisé car le 08/04/2021 la BDD originale ne pouvait plus être jointe)

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
    error.remove(); // On supprime le bloc erreur si l'appel a fonctionné
  }
  return fetchedProducts;
}

/* Création du HTML */

//Fonction créant la liste des produits vendus

async function productsLibrary() {
  const products = await getProductsInfo();

  // Section dans laquelle se trouvera la liste des produits
  let productsLibrary = createDomElement("section", ["class"], ["products-list row"]);

  // Intégration de la section dans le <main> de la page
  let main = document.getElementById("main");
  main.appendChild(productsLibrary);

  // Structure de chaque article
  products.forEach((product) => {
    // Structure de la carte de l'article
    // Container de l'article
    let productContainer = createDomElement("figure", ["class"], ["card product-element col shadow rounded"]);

    // Image de l'article
    let productImage = createDomElement("img", ["class", "src", "alt"], ["product-img", product.imageUrl, "Illustration produit"]);


    // Légende de l'image
    let productFigcaption = createDomElement("figcaption", ["class"], ["card-body"]);

    // Nom de l'article
    let productName = createDomElement("h3", ["class"], ["card-title"]);

    // Prix de l'article
    let productPrice = createDomElement("h4", ["class"], ["text-text"]);

    // Lien pour accéder à la page de l'article
    let productSelect = createDomElement("a", ["class", "href"], ["btn btn-primary stretched-link", "./product.html?id=" + product._id]);

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