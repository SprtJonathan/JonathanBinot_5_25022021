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

async function displayShoppingCart() {
    let main = document.getElementById("cart-main");
    const selectedProduct = await getProductsInfo();

    if (shoppingCart.length > 0) {

        const emptyCart = document.getElementById("empty-cart");
        emptyCart.remove();

        // Création de l'interface du panier

        let cartCheckout = document.createElement("section");
        cartCheckout.setAttribute("id", "cart-checkout");
        cartCheckout.setAttribute("class", "card cart--section cart--section--checkout")

        let itemsSectionTitle = document.createElement("h3");
        itemsSectionTitle.setAttribute("id", "cart-checkout-title");
        itemsSectionTitle.setAttribute("class", "cart--section--title");
        itemsSectionTitle.textContent = "Articles sélectionnés";

        let recapFormSection = document.getElementById("cart-recap-form");

        let cartTotal = document.getElementById("cart-total");

        let recapSectionTitle = document.createElement("h3");
        recapSectionTitle.setAttribute("id", "cart-total-title");
        recapSectionTitle.setAttribute("class", "cart--section--title");
        recapSectionTitle.textContent = "Récapitulatif de commande";

        let cartForm = document.getElementById("cart-form");

        let formSectionTitle = document.createElement("h3");
        formSectionTitle.setAttribute("id", "cart-form-title");
        formSectionTitle.setAttribute("class", "cart--section--title");
        formSectionTitle.textContent = "Coordonnées";

        main.appendChild(cartCheckout);
        main.appendChild(recapFormSection);
        recapFormSection.appendChild(cartTotal);
        recapFormSection.appendChild(cartForm);
        cartCheckout.appendChild(itemsSectionTitle);
        cartTotal.appendChild(recapSectionTitle);
        cartForm.appendChild(formSectionTitle);

        // Structure de chaque article
        for (let i = 0; i < shoppingCart.length; i++) {
            // Container contenant les informations de l'article
            let productContainer = document.createElement("article");
            productContainer.setAttribute("class", "cart--product-container shadow-sm");

            // Bloc de l'image
            let productImgContainer = document.createElement("aside");
            productImgContainer.setAttribute("class", "cart--product-img--block");

            let productImg = document.createElement("img");
            productImg.setAttribute("class", "cart--product-img");
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
            productFiguresContainer.setAttribute("class", "cart--product-figures--block");

            // Bloc contenant la quantité d'articles d'un même objet et les boutons + et -
            let productQuantityBlock = document.createElement("div");
            productQuantityBlock.setAttribute("class", "cart--product-quantity--block");

            // Bouton servant à réduire la quantité d'articles
            let productQuantityLess = document.createElement("a");
            productQuantityLess.setAttribute("class", "cart--product-quantity--modifier--minus btn btn-secondary");
            productQuantityLess.setAttribute("id", "button-less--" + [i]);
            productQuantityLess.setAttribute("href", "");
            productQuantityLess.textContent = "";

            // Texte indiquant la quantité d'un même article
            let productQuantity = document.createElement("h4");
            productQuantity.setAttribute("class", "cart--product-quantity--number");
            productQuantity.textContent = "Quantité: " + shoppingCart[i].quantity;

            // Bouton servant à augmenter la quantité d'articles
            let productQuantityMore = document.createElement("a");
            productQuantityMore.setAttribute("class", "cart--product-quantity--modifier--plus btn btn-primary");
            productQuantityMore.setAttribute("id", "button-more--" + [i]);
            productQuantityLess.setAttribute("href", "");
            productQuantityMore.textContent = "";

            // Bouton contenant le prix du produit
            let productPrice = document.createElement("h3");
            productPrice.setAttribute("class", "cart--product-price");

            // Bloc contenant le bouton servant à retirer un article du panier
            let removeProduct = document.createElement("div");
            removeProduct.setAttribute("id", "delete-product-block");
            removeProduct.setAttribute("class", "cart--product-remove btn btn-danger");

            // Bouton servant à retirer un article du panier
            removeProductCross = document.createElement("a");
            removeProductCross.setAttribute("class", "cart--product-remove--cross");
            removeProductCross.setAttribute("id", "delete-product--" + [i]);
            removeProductCross.setAttribute("href", "");
            removeProductCross.textContent = "X";

            // Organisation de chacun des éléments précédemment créés
            cartCheckout.appendChild(productContainer);
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

            // Affichage du prix total (quantité comprise)
            productPrice.textContent = "Total " + parseFloat((shoppingCart[i].price * shoppingCart[i].quantity) / 100).toFixed(2) + " €";

            let buttonQtLess = document.getElementById("button-less--" + [i])
            let buttonQtMore = document.getElementById("button-more--" + [i])
            let buttonDelete = document.getElementById("delete-product--" + [i])

            // Bouton pour dimminuer la quantité d'un même produit
            // On récupère la quantité de l'article "en cours", et on décrémente sa valeur
            // Puis on stocke la nouvelle valeur dans un objet qu'on renvoie au localStorage
            // à la position initiale de l'article
            buttonQtLess.addEventListener("click", function (event) {
                event.preventDefault()
                let itemQuantity = shoppingCart[i].quantity;
                // Si la quantité de l'article est supérieure à 1 alors on peut dimminuer
                if (itemQuantity > 1) {
                    itemQuantity = parseInt(itemQuantity) - 1;
                    let newObject = {
                        image: shoppingCart[i].image,
                        name: shoppingCart[i].name,
                        id: shoppingCart[i].id,
                        price: shoppingCart[i].price,
                        options: shoppingCart[i].options,
                        quantity: itemQuantity,
                    }
                    shoppingCart.splice(i, 1, newObject);
                    localStorage.setItem(cartId, JSON.stringify(shoppingCart));
                    productQuantity.textContent = "Quantité: " + shoppingCart[i].quantity;
                    productPrice.textContent = "Total " + parseFloat((shoppingCart[i].price * shoppingCart[i].quantity) / 100).toFixed(2) + " €";
                    location.reload();
                } else {
                    alert("Quantité minimale atteinte")
                }

                console.log(shoppingCart[i].quantity);
            });

            // Bouton pour augmenter la quantité d'un même produit
            buttonQtMore.addEventListener("click", function (event) {
                event.preventDefault()
                let itemQuantity = shoppingCart[i].quantity;
                // Si la quantité de l'article est inférieure à 20 alors on peut augmenter
                if (itemQuantity < 20) {
                    itemQuantity = parseInt(itemQuantity) + 1;
                    let newObject = {
                        image: shoppingCart[i].image,
                        name: shoppingCart[i].name,
                        id: shoppingCart[i].id,
                        price: shoppingCart[i].price,
                        options: shoppingCart[i].options,
                        quantity: itemQuantity,
                    }
                    shoppingCart.splice(i, 1, newObject);
                    localStorage.setItem(cartId, JSON.stringify(shoppingCart));
                    productQuantity.textContent = "Quantité: " + shoppingCart[i].quantity;
                    productPrice.textContent = "Total " + parseFloat((shoppingCart[i].price * shoppingCart[i].quantity) / 100).toFixed(2) + " €";
                    location.reload();
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
        let cartNumberOfProducts = document.createElement("article");
        cartNumberOfProducts.setAttribute("class", "cart--total--items--block");

        let cartNumbersBlock = document.createElement("div");
        cartNumbersBlock.setAttribute("id", "recap-number");
        cartNumbersBlock.setAttribute("class", "cart--total--items shadow-sm");

        let numberOfItems = document.createElement("h3");
        numberOfItems.setAttribute("id", "total-items-number");
        numberOfItems.setAttribute("class", "cart--total--items--number");

        let cartTotalPrice = document.createElement("article");
        cartTotalPrice.setAttribute("id", "total-items-price");
        cartTotalPrice.setAttribute("class", "cart--total--items--block");

        let cartPrice = document.createElement("h3");
        cartPrice.setAttribute("id", "total-price");
        cartPrice.setAttribute("class", "cart--total--items--price");
        /*
                let buyButton = document.createElement("a");
                buyButton.setAttribute("id", "button-warning");
                buyButton.setAttribute("class", "btn-warning cart--buy-button");
                buyButton.setAttribute("href", "payment.html");
                buyButton.textContent = "Procéder au paiement";
        */

        // Calcul de la somme totale à payer
        let totalPrice = 0;
        for (i = 0; i < shoppingCart.length; i++) {
            totalPrice += (shoppingCart[i].price * shoppingCart[i].quantity) / 100;
            console.log(totalPrice);
            cartPrice.textContent = "Total à payer: " + parseFloat(totalPrice).toFixed(2) + "€";
        }

        // Calcul du nombre total d'articles
        let totalQuantity = 0;
        for (i = 0; i < shoppingCart.length; i++) {
            totalQuantity = parseInt(shoppingCart[i].quantity) + parseInt(totalQuantity);
            numberOfItems.textContent = "Nombre d'articles dans le panier: " + totalQuantity;
        }

        cartTotal.appendChild(cartNumbersBlock);
        cartNumbersBlock.appendChild(cartNumberOfProducts);
        cartNumbersBlock.appendChild(cartTotalPrice);
        // cartTotal.appendChild(buyButton);
        cartNumberOfProducts.appendChild(numberOfItems);
        cartTotalPrice.appendChild(cartPrice);

        /* Formulaire d'achat */

        let shoppingForm = document.getElementById("shopping-form");

        // Bouton d'achat
        let formSubmit = document.getElementById("submit");
        formSubmit.setAttribute("value", "Acheter " + totalQuantity + " articles");
        /*formSubmit.addEventListener("click", function (event) {
            event.preventDefault()
        });*/

        cartForm.appendChild(shoppingForm);

        // Fonction permettant de vérifier les champs du formulaire
        verifyForm = () => {
            // Vérification des caractères
            let verifyLetters = /[a-zA-Z]/;
            let verifyNumbers = /[0-9]/;
            let verifyEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let verifyCharacters = /[§!@#$%^&*().?":{}|<>]/;

            // Message de retour des contrôles
            let returnMessage = "";

            //Récupération des inputs

            let lname = document.getElementById("lname").value;
            let fname = document.getElementById("fname").value;
            let email = document.getElementById("email").value;
            let address = document.getElementById("address").value;
            let address2 = document.getElementById("address").value;
            let city = document.getElementById("city").value;
            let zipcode = document.getElementById("zipcode").value;

            if (verifyNumbers.test(lname) == true || verifyCharacters.test(lname) == true || lname == "") {
                returnMessage = "Chiffres ou caractères spéciaux non autorisés, veuillez vérifier vos informations.";
            } else {
                console.log("Nom validé")
            }

            if (verifyNumbers.test(fname) == true || verifyCharacters.test(fname) == true || fname == "") {
                returnMessage = returnMessage + "\n" + "Chiffres ou caractères spéciaux non autorisés, veuillez vérifier vos informations.";
            } else {
                console.log("Prénom validé")
            }

            if (verifyEmail.test(email) == false || email == "") {
                returnMessage = returnMessage + "\n" + "Caractères spéciaux non autorisés ou format de l'email invalide, veuillez vérifier vos informations.";
            } else {
                console.log("Format d'Email validé")
            }

            if (verifyCharacters.test(address) == true || address == "") {
                returnMessage = returnMessage + "\n" + "Caractères spéciaux non autorisés, veuillez vérifier vos informations.";
            } else {
                console.log("Format d'adresse validé")
            }

            if (verifyCharacters.test(address2) == true) {
                returnMessage = returnMessage + "\n" + "Caractères spéciaux non autorisés, veuillez vérifier vos informations.";
            } else {
                console.log("Complément d'adresse validé")
            }

            if (verifyNumbers.test(city) == true || verifyCharacters.test(city) == true || city == "") {
                returnMessage = returnMessage + "\n" + "Chiffres ou caractères spéciaux non autorisés, veuillez vérifier vos informations.";
            } else {
                console.log("Format ville validé")
            }

            if (verifyLetters.test(zipcode) == true || verifyCharacters.test(zipcode) == true || zipcode == "") {
                alert("test");
                //returnMessage = returnMessage + "\n" + "Caractères spéciaux ou lettres non autorisés, veuillez vérifier vos informations.";
            } else {
                console.log("Format code postal validé")
            }

            // Si aucun message d'erreur n'est retourné, 
            // alors le formulaire est validé et 
            // on peut enregistrer les informations client dans un nouvel objet

            if (returnMessage != "") {
                shoppingForm.append("<div id='form-alert'><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>" + "Des erreurs sont présentes dans vos informations, veuillez les corriger: " + "\n" + checkMessage + "</strong></div></div>");
            } else {
                let customerInfo = {
                    lname: lname,
                    fname: fname,
                    email: email,
                    address: address,
                    address2: address2,
                    city: city,
                    zipcode: zipcode,
                }
                return customerInfo;
            }

            // Confirmation et commande par l'envoi des données précéemment collectées
            let customerInfo;
            let products = [];
            let orderUrl = apiUrl + "order";

            // Appel de l'API grâce à fetch
            async function sendForm(customerInfo, orderUrl) {
                const formResponse = await fetch(apiUrl + productId);
                const fetchedProducts = await response.json();
                //console.log(fetchedProducts)

                console.log("API reached. Code " + response.status);
                error = document.getElementById("error");
                if (error) {
                    error.remove();
                }
                return fetchedProducts;
            }

        };



    }
}