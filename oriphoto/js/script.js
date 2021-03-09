// Définitions de variables permettant de rendre le code plus modulaire
const soldProduct = "cameras"; // Passage du produit vendu en variable afin de pouvoir facilement modifier sa valeur
const apiUrl = "http://localhost:3000/api/" + soldProduct + "/"; // Lien vers l'API du type de produit vendu

// Appel de l'API
getProductsInfo = () => {
    return new Promise((successCallback, failureCallback) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                successCallback(JSON.parse(this.responseText));
                console.log("API reached. Code " + this.status);

                // Si l'appel de l'api fonctionne, alors on retire l'erreur affichée par défaut
                error = document.getElementById("error");
                if (error) {
                    error.remove();
                }


            } else {
                console.log("An error has occured, API unreachable");
            }
        };
        request.open("GET", apiUrl + productId);
        request.send();
    });
};


/* Création du HTML */

//Fonction créant la liste des produits vendus

async function productsLibrary() {
    const products = await getProductsInfo();

    // Section dans laquelle se trouvera la liste des produits
    let productsLibrary = document.createElement("section");
    productsLibrary.setAttribute("class", "row products-list ");
    // Intégration de la bibliothèque des produits dans le main de la page
    let main = document.getElementById("main");
    main.appendChild(productsLibrary);

    // Structure de la section
    products.forEach(product => {
        // Structure de la carte de l'article
        // Création des éléments dans lesquels seront stockées les informations de chaques articles
        let productContainer = document.createElement("figure");
        // Attribution des attributs de chaques éléments constituants la structure d'un article
        productContainer.setAttribute("class", "card product-element col");
        productContainer.setAttribute("style", "width: 250px");
        //productContainer.setAttribute("style","width:18rem");

        let productImage = document.createElement("img");
        productImage.setAttribute("class", "card-img-left product-img");
        productImage.setAttribute("src", product.imageUrl);

        let productFigcaption = document.createElement("figcaption");
        productFigcaption.setAttribute("class", "card-body");

        let productName = document.createElement("h3");
        productName.setAttribute("class", "card-title");

        let productPrice = document.createElement("h4");
        productPrice.setAttribute("class", "text-text");

        let productSelect = document.createElement("a");
        productSelect.setAttribute("class", "btn btn-primary stretched-link");
        productSelect.setAttribute("href", "./product.html");

        productsLibrary.appendChild(productContainer);
        productContainer.appendChild(productImage);
        productContainer.appendChild(productFigcaption);
        productFigcaption.appendChild(productName);
        productFigcaption.appendChild(productPrice);
        productFigcaption.appendChild(productSelect);

        // Contenu de chaque balise créée
        productName.textContent = product.name;
        productPrice.textContent = product.price / 100 + "€";
        productSelect.textContent = "En savoir plus";

    });
};

// Initialisation du panier d'achat

if (localStorage.getItem("userShoppingCart")) {
    console.log("The shopping cart exists")
} else {
    console.log("Shopping cart not found. Creating one...")
    let shoppingCart = [];
    localStorage.setItem("userShoppingCart", JSON.stringify(shoppingCart));
};

