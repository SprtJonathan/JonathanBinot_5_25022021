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
    error.remove();
  }
  return fetchedProducts;
}

// Création de la page propre à chaque produit

async function productDetailPage() {
  // Définition de l'ID du produit d'après l'ID situé dans l'URL afin de pouvoir appeler son contenu depuis l'API
  productId = location.search.substring(4);
  //console.log(productId);

  // Appel à l'API pour récupérer les informations du produit
  const selectedProduct = await getProductsInfo();

  //Ajout des éléments suivants au main de la page produit
  let selectedProductDetails = document.getElementById("product-details-main");

  // Structure de la page de l'article
  // Container de l'article
  let selectedProductContainer = createDomElement("section", ["class"], ["details--product-container"]);

  // Image de l'article
  let selectedProductImage = createDomElement("img", ["class", "src"], ["details--product-image", selectedProduct.imageUrl]);

  // Légende de l'image
  let selectedProductArticle = createDomElement("article", ["class"], ["details--product-article col-sm-12"]);

  // Bloc regroupant le nom et la description de l'article
  let selectedProductDetailsBlock = createDomElement("aside", ["class"], ["card details--product-details-aside"]);

  // Nom de l'article
  let selectedProductName = createDomElement("h3", ["class"], ["details--product-name"]);

  // Description de l'article
  let selectedProductDescription = createDomElement("h5", ["class"], ["details--product-description"]);

  // Bloc regroupant les détails d'achat de l'article
  let selectedProductBuyBlock = createDomElement("aside", ["class"], ["card details--product-buy-aside"]);

  // Prix de l'article
  let selectedProductPrice = createDomElement("h4", ["class"], ["details--product-price"]);

  // Select Div block
  let selectedProductSelectBlock = createDomElement("div", ["class"], ["details--product-selection-block"]);

  // Options de l'article
  let selectedProductSelect = createDomElement("select", ["id", "class", "onChange"], ["product-options", "details--product-options", "selectionChange(this);"]);

  // Fonction permettant de changer la valeur de la sélection
  selectionChange = function (select) {
    let selection = select.options[select.selectedIndex].text;
    // Si l'index du select est 0 alors la réponse sera invalide
    if (select.selectedIndex == 0) {
      selectedProductSelect.setAttribute("value", "null");
    } else {
      selectedProductSelect.setAttribute("value", selection);
    }
  };

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
    //console.log(selectedProduct.lenses[i], i);
  }

  // Quantité de produits
  let selectedProductQuantitySelect = createDomElement("select", ["id", "class", "onChange",], ["product-quantity", "details--product-quantity", "selectionQuantity(this);"]);

  // Boucle for qui crée les différentes quantités sélectionnables
  for (let i = 1; i <= 10; i++) {
    let selectedProductQuantity = document.createElement("option");
    selectedProductQuantity.innerHTML = i;
    selectedProductQuantitySelect.appendChild(selectedProductQuantity);
    selectedProductQuantitySelect.setAttribute("value", 1);
  }

  // Fonction qui change la valeur de la quantité sélectionnée au changement de la sélection
  selectionQuantity = function (quantity) {
    let quantitySelection = quantity.options[quantity.selectedIndex].text;
    selectedProductQuantitySelect.setAttribute("value", quantitySelection);
  };

  // Lien pour acheter le produit
  let selectedProductBuy = createDomElement("a", ["id", "class", "href", "onclick"], ["add-to-cart-button", "btn btn-warning", "/cart.html", "addToCart()"]);

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
  selectedProductBuyBlock.appendChild(selectedProductSelectBlock);
  selectedProductSelectBlock.appendChild(selectedProductSelect);
  selectedProductSelectBlock.appendChild(selectedProductQuantitySelect);
  selectedProductBuyBlock.appendChild(selectedProductBuy);

  let choiceText = document.getElementById("choice-name-section");
  let productName = createDomElement("h2", ["id"], ["product-name"]);
  productName.textContent = selectedProduct.name;
  choiceText.append(productName);

  document.title = "Produit : " + selectedProduct.name;

  // Contenu de chaque balise créée
  selectedProductName.textContent = selectedProduct.name;
  selectedProductPrice.textContent =
    parseFloat(selectedProduct.price / 100).toFixed(2) + " €";
  selectedProductDescription.textContent = selectedProduct.description;
  selectedProductBuy.textContent = "Ajouter au panier";
  selectedProductBuy.addEventListener("click", function (event) {
    event.preventDefault();
  });
}

// Fonction permettant d'ajouter l'article au panier
async function addToCart() {
  let addToCartButton = document.getElementById("add-to-cart-button");
  addToCartButton.addEventListener("click", buyItem());
  async function buyItem() {
    const selectedProduct = await getProductsInfo();

    // Définition des différentes variables de chaque objet
    const itemImage = selectedProduct.imageUrl;

    const itemName = selectedProduct.name;
    //console.log(itemName);

    const itemId = selectedProduct._id;
    //console.log(itemId);

    const itemPrice = selectedProduct.price;
    //console.log(itemPrice);

    // Option sélectionnée
    let select = document.getElementById("product-options");
    let quantity = document.getElementById("product-quantity");
    let itemOption = select.value; // Valeur de l'option choisie
    let itemCount = quantity.value; // Valeur de l'option choisie

    // Création de l'objet de l'article ajouté au panier
    let selectedItem = {
      image: itemImage,
      name: itemName,
      id: itemId,
      price: itemPrice,
      options: itemOption,
      quantity: itemCount,
    };

    // Si aucune option n'est choisie, alors on retourne une erreur
    // Si une option valide est choisie, alors on ajoute le produit sélectionné et son option au tableau shoppingCart
    if (itemOption != "Choisissez votre option") {
      shoppingCart.push(selectedItem);
      localStorage.setItem(cartId, JSON.stringify(shoppingCart));
      console.log("Produit ajouté au panier");
      //alert("Article ajouté au panier");
      location.reload();
      console.log(shoppingCart);
    } else {
      alert("Erreur : Veuillez sélectionner une option");
    }
  }
}