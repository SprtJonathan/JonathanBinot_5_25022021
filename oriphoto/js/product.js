// Définitions de variables permettant de rendre le code plus modulaire
const soldProduct = "cameras"; // Passage du produit vendu en variable afin de pouvoir facilement modifier sa valeur
const apiUrl = "http://localhost:3000/api/" + soldProduct + "/"; // Lien vers l'API du type de produit vendu

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
    let selectedProductQuantitySelect = document.createElement("select");
    selectedProductQuantitySelect.setAttribute("id", "product-quantity");
    selectedProductQuantitySelect.setAttribute("class", "details--product-quantity");
    selectedProductQuantitySelect.setAttribute("onChange", "selectionQuantity(this);");

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
    selectedProductBuyBlock.appendChild(selectedProductSelect);
    selectedProductBuyBlock.appendChild(selectedProductQuantitySelect);
    selectedProductBuyBlock.appendChild(selectedProductBuy);

    document.getElementById("product-name").textContent = selectedProduct.name;
    document.title = "Produit : " + selectedProduct.name;


    // Contenu de chaque balise créée
    selectedProductName.textContent = selectedProduct.name;
    selectedProductPrice.textContent = parseFloat(selectedProduct.price / 100).toFixed(2) + " €";
    selectedProductDescription.textContent = selectedProduct.description;
    selectedProductBuy.textContent = "Ajouter au panier";
    selectedProductBuy.addEventListener("click", function (event) {
        event.preventDefault()
    });
};

// Déclaration des variables du panier
const cartId = "userShoppingCart" // Nom du panier qui sera ajouté au localStorage
let shoppingCart = JSON.parse(localStorage.getItem(cartId)); // Tableau contenant les éléments ajoutés au panier

function getItemsNumber() {
    let cartItemsNumber = shoppingCart.length; // Nombre d'articles dans le panier
    let cartNumber = document.getElementById("shopping-cart-number"); // Nombre d'articles dans le panier
    cartNumber.textContent = cartItemsNumber;
}

// Vérification que le localStorage soit initialisée pour éviter les erreurs
if (localStorage.getItem(cartId)) {
    console.log(cartId);
} else {
    console.log("Le panier va être initalisé");
    let cartInit = [];
    localStorage.setItem(cartId, JSON.stringify(cartInit));
}

addToCart = () => {
    let addToCartButton = document.getElementById("add-to-cart-button");
    addToCartButton.addEventListener("click", buyItem())
    async function buyItem() {
        const selectedProduct = await getProductsInfo();

        // Définition des différentes variables de chaque objet
        const itemImage = selectedProduct.imageUrl

        const itemName = selectedProduct.name;
        //console.log(itemName);

        const itemId = selectedProduct._id;
        //console.log(itemId);

        const itemPrice = selectedProduct.price
        //console.log(itemPrice);


        // Option sélectionnée
        let select = document.getElementById("product-options");
        let quantity = document.getElementById("product-quantity");
        let itemOption = select.value; // Valeur de l'option choisie
        let itemCount = quantity.value; // Valeur de l'option choisie

        let selectedItem = {
             image: itemImage,
             name: itemName,
             id: itemId,
             price: itemPrice,
             options: itemOption,
             quantity: itemCount,
         }

        // Si aucune option n'est choisie, alors on retourne une erreur
        // Si une option valide est choisie, alors on ajoute le produit sélectionné et son option au tableau shoppingCart
        if (itemOption != "Choisissez votre option") {
            shoppingCart.push(selectedItem);
            localStorage.setItem(cartId, JSON.stringify(shoppingCart))
            console.log("Produit ajouté au panier");
            alert("Article ajouté au panier");
            location.reload();
            console.log(shoppingCart);
        } else {
            alert("Erreur : Veuillez sélectionner une option");
        }
    };
};
