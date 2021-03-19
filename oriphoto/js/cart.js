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

// Déclaration des variables du panier
const cartId = "userShoppingCart" // Nom du panier qui sera ajouté au localStorage
let shoppingCart = JSON.parse(localStorage.getItem(cartId)); // Tableau contenant les éléments ajoutés au panier

// Récupération du nombre d'articles dans le panier
function getItemsNumber() {
    let cartItemsNumber = shoppingCart.length; // Nombre d'articles dans le panier
    let cartNumber = document.getElementById("shopping-cart-number"); // Nombre d'articles dans le panier
    cartNumber.textContent = cartItemsNumber;
}

console.log(shoppingCart[0]);
console.log(shoppingCart.name);

async function displayShoppingCart() {
    let main = document.getElementById("cart-main");
    const selectedProduct = await getProductsInfo();

    if (shoppingCart.length > 0) {

        const emptyCart = document.getElementById("empty-cart");
        emptyCart.remove();

        // Création de l'interface du panier

        let section = document.createElement("section");
        section.setAttribute("class", "cart--recap")
        main.appendChild(section);

        // Structure de chaque article
        for (let i = 0; i < shoppingCart.length; i++) {
            // Container contenant les informations de l'article
            let productContainer = document.createElement("article");
            productContainer.setAttribute("class", "cart--product-container card shadow");

            // Bloc de l'image
            let productImgContainer = document.createElement("aside");
            productImgContainer.setAttribute("class", "cart--product-img-block--" + [i]);

            let productImg = document.createElement("img");
            productImg.setAttribute("class", "cart--product-image");
            productImg.setAttribute("src", shoppingCart[i].image);

            // Bloc contenant le nom et l'option de l'article
            let productNameContainer = document.createElement("aside");
            productNameContainer.setAttribute("class", "cart--product-name-aside");

            // Nom de l'article
            let productName = document.createElement("h3");
            productName.setAttribute("class", "cart--product-name" + [i]);
            productName.textContent = shoppingCart[i].name;

            // Option sélectionnée
            let productOption = document.createElement("h5");
            productOption.setAttribute("class", "cart--product-option" + [i]);
            productOption.textContent = "Option sélectionnée: " + shoppingCart[i].options;

            // Bloc contenant les chiffres de l'article choisi
            let productFiguresContainer = document.createElement("aside");
            productFiguresContainer.setAttribute("class", "cart--product-figures-block");

            let productQuantityBlock = document.createElement("div");
            productQuantityBlock.setAttribute("class", "cart--product-quantity-block");

            let productQuantityLess = document.createElement("a");
            productQuantityLess.setAttribute("class", "card cart--product-quantity-modifier");
            productQuantityLess.setAttribute("id", "button-less--" + [i]);
            productQuantityLess.setAttribute("href", "");
            productQuantityLess.textContent = "-";

            let productQuantity = document.createElement("h4");
            productQuantity.setAttribute("class", "card cart--product-quantity");
            productQuantity.textContent = "Quantité: " + shoppingCart[i].quantity;

            let productQuantityMore = document.createElement("a");
            productQuantityMore.setAttribute("class", "cart--product-quantity-modifier");
            productQuantityMore.setAttribute("id", "button-more--" + [i]);
            productQuantityLess.setAttribute("href", "");
            productQuantityMore.textContent = "+";

            let productPrice = document.createElement("h3");
            productPrice.setAttribute("class", "cart--product-price");

            let removeProduct = document.createElement("div");
            removeProduct.setAttribute("id", "delete-product-block");
            removeProduct.setAttribute("class", "cart--product-remove");
            removeProductCross = document.createElement("a");
            removeProductCross.setAttribute("class", "cart--product-remove-cross");
            removeProductCross.setAttribute("id", "delete-product--" + [i]);
            removeProductCross.setAttribute("href", "");
            removeProductCross.textContent = "X";


            section.appendChild(productContainer);
            productContainer.appendChild(productImgContainer);
            productContainer.appendChild(productNameContainer);
            productContainer.appendChild(productFiguresContainer);
            productContainer.appendChild(removeProduct);
            productImgContainer.appendChild(productImg);
            productNameContainer.appendChild(productName);
            productNameContainer.appendChild(productOption);
            productFiguresContainer.appendChild(productQuantityBlock);
            productQuantityBlock.appendChild(productQuantityLess);
            productQuantityBlock.appendChild(productQuantity);
            productQuantityBlock.appendChild(productQuantityMore);
            productFiguresContainer.appendChild(productPrice);
            removeProduct.appendChild(removeProductCross);

            console.log(shoppingCart);

            productPrice.textContent = "Total " + parseFloat((shoppingCart[i].price * shoppingCart[i].quantity) / 100).toFixed(2) + " €";
            let buttonQtLess = document.getElementById("button-less--" + [i])
            let buttonQtMore = document.getElementById("button-more--" + [i])
            let buttonDelete = document.getElementById("delete-product--" + [i])

            // Bouton pour dimminuer la quantité d'un même produit
            buttonQtLess.addEventListener("click", function (event) {
                event.preventDefault()
                let itemQuantity = shoppingCart[i].quantity;
                if (itemQuantity > 1) {
                    shoppingCart[i].quantity--;
                    productQuantity.textContent = "Quantité: " + shoppingCart[i].quantity;
                    productPrice.textContent = "Total " + parseFloat((shoppingCart[i].price * shoppingCart[i].quantity) / 100).toFixed(2) + " €";
                    let e = {
                        image: shoppingCart[i].image,
                        name: shoppingCart[i].name,
                        id: shoppingCart[i].id,
                        price: shoppingCart[i].price,
                        options: shoppingCart[i].options,
                        quantity: shoppingCart[i].quantity,
                    }
                    shoppingCart.push(e);
                    localStorage.setItem(cartId, JSON.stringify(shoppingCart[i]))
                } else {
                    alert("Quantité minimale atteinte")
                }

                console.log(shoppingCart[i].quantity);
            });

            // Bouton pour augmenter la quantité d'un même produit
            buttonQtMore.addEventListener("click", function (event) {
                event.preventDefault()
                let itemQuantity = shoppingCart[i].quantity;
                if (itemQuantity < 20) {
                    shoppingCart[i].quantity++;
                    productQuantity.textContent = "Quantité: " + shoppingCart[i].quantity;
                    productPrice.textContent = "Total " + parseFloat((shoppingCart[i].price * shoppingCart[i].quantity) / 100).toFixed(2) + " €";
                } else {
                    alert("Quantité maximale atteinte")
                }

                console.log(shoppingCart[i].quantity);
            });


            // Bouton pour supprimer un produit
            buttonDelete.addEventListener("click", function (event) {
                event.preventDefault()
                shoppingCart.splice(i, 1);
                localStorage.setItem(cartId, JSON.stringify(shoppingCart));
                location.reload();
            });
        };

        // Création du total d'articles et du prix total
        let cartTotal = document.createElement("section");
        cartTotal.setAttribute("id", "cart-total");
        cartTotal.setAttribute("class", "card");

        let numberOfItems = document.createElement("h3");
        numberOfItems.setAttribute("id", "items-number");

        let cartNumberOfProducts = document.createElement("article");
        let cartNumber = document.createElement("article");
        //  let cartNumberOfProducts = document.createElement("article");
        let cartTotalPrice = document.createElement("article");
        let = document.createElement("section");
        //let = document.createElement("");

        // Calcul de la somme totale à payer
        let totalPrice = 0;
        numberOfItems.textContent = totalPrice;
        shoppingCart.forEach((shoppingCart) => {
            let totalQuantity = shoppingCart.quantity;
            totalPrice += shoppingCart.price / 100;
            console.log(totalPrice);
        });

    }
}