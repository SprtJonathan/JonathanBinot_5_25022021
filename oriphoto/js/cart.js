// Définitions de variables permettant de rendre le code plus modulaire
const soldProduct = "cameras"; // Passage du produit vendu en variable afin de pouvoir facilement modifier sa valeur
const apiUrl = "http://localhost:3000/api/" + soldProduct + "/"; // Lien vers l'API du type de produit vendu

// Variables pour la confirmation et commande par l'envoi des données précéemment collectées
const orderUrl = apiUrl + "order" + "/";

// Création du tableau contenant la commande
let produits = [];

// Déclaration des variables du panier
const cartId = "userShoppingCart"; // Nom du panier qui sera ajouté au localStorage
let shoppingCart = JSON.parse(localStorage.getItem(cartId)); // Tableau contenant les éléments ajoutés au panier

// Récupération du nombre d'articles dans le panier
function getItemsNumber() {
  let cartItemsNumber = shoppingCart.length; // Nombre d'articles dans le panier
  let cartNumber = document.getElementById("shopping-cart-number"); // Nombre d'articles dans le panier
  cartNumber.textContent = cartItemsNumber;
}

console.log(shoppingCart);

async function displayShoppingCart() {
  let main = document.getElementById("cart-main");

  if (shoppingCart.length > 0) {
    const emptyCart = document.getElementById("empty-cart");
    emptyCart.remove();

    // Création de l'interface du panier

    let cartCheckout = document.createElement("section");
    cartCheckout.setAttribute("id", "cart-checkout");
    cartCheckout.setAttribute(
      "class",
      "card cart--section cart--section--checkout"
    );

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
      // Enregistrement de l'ID des produits dans le tableau produits qui sera renvoyé à l'API
      produits.push(shoppingCart[i].id);
      // Container contenant les informations de l'article
      let productContainer = document.createElement("article");
      productContainer.setAttribute(
        "class",
        "cart--product-container shadow-sm"
      );

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
      productOption.textContent =
        "Option sélectionnée: " + shoppingCart[i].options;

      // Bloc contenant les chiffres de l'article choisi
      let productFiguresContainer = document.createElement("aside");
      productFiguresContainer.setAttribute(
        "class",
        "cart--product-figures--block"
      );

      // Bloc contenant la quantité d'articles d'un même objet et les boutons + et -
      let productQuantityBlock = document.createElement("div");
      productQuantityBlock.setAttribute(
        "class",
        "cart--product-quantity--block"
      );

      // Bouton servant à réduire la quantité d'articles
      let productQuantityLess = document.createElement("a");
      productQuantityLess.setAttribute(
        "class",
        "cart--product-quantity--modifier--minus btn btn-secondary"
      );
      productQuantityLess.setAttribute("id", "button-less--" + [i]);
      productQuantityLess.setAttribute("href", "");
      productQuantityLess.textContent = "";

      // Texte indiquant la quantité d'un même article
      let productQuantity = document.createElement("h4");
      productQuantity.setAttribute("class", "cart--product-quantity--number");
      productQuantity.textContent = "Quantité: " + shoppingCart[i].quantity;

      // Bouton servant à augmenter la quantité d'articles
      let productQuantityMore = document.createElement("a");
      productQuantityMore.setAttribute(
        "class",
        "cart--product-quantity--modifier--plus btn btn-primary"
      );
      productQuantityMore.setAttribute("id", "button-more--" + [i]);
      productQuantityLess.setAttribute("href", "");
      productQuantityMore.textContent = "";

      // Bouton contenant le prix du produit
      let productPrice = document.createElement("h3");
      productPrice.setAttribute("class", "cart--product-price");

      // Bloc contenant le bouton servant à retirer un article du panier
      let removeProduct = document.createElement("div");
      removeProduct.setAttribute("id", "delete-product-block");
      removeProduct.setAttribute(
        "class",
        "cart--product-remove btn btn-danger"
      );

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
      productPrice.textContent =
        "Total " +
        parseFloat(
          (shoppingCart[i].price * shoppingCart[i].quantity) / 100
        ).toFixed(2) +
        " €";

      let buttonQtLess = document.getElementById("button-less--" + [i]);
      let buttonQtMore = document.getElementById("button-more--" + [i]);
      let buttonDelete = document.getElementById("delete-product--" + [i]);

      // Bouton pour dimminuer la quantité d'un même produit
      // On récupère la quantité de l'article "en cours", et on décrémente sa valeur
      // Puis on stocke la nouvelle valeur dans un objet qu'on renvoie au localStorage
      // à la position initiale de l'article
      buttonQtLess.addEventListener("click", function (event) {
        event.preventDefault();
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
          };
          shoppingCart.splice(i, 1, newObject);
          localStorage.setItem(cartId, JSON.stringify(shoppingCart));
          productQuantity.textContent = "Quantité: " + shoppingCart[i].quantity;
          productPrice.textContent =
            "Total " +
            parseFloat(
              (shoppingCart[i].price * shoppingCart[i].quantity) / 100
            ).toFixed(2) +
            " €";
          location.reload();
        } else {
          alert("Quantité minimale atteinte");
        }

        console.log(shoppingCart[i].quantity);
        console.log(shoppingCart);
      });

      // Bouton pour augmenter la quantité d'un même produit
      buttonQtMore.addEventListener("click", function (event) {
        event.preventDefault();
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
          };
          shoppingCart.splice(i, 1, newObject);
          localStorage.setItem(cartId, JSON.stringify(shoppingCart));
          productQuantity.textContent = "Quantité: " + shoppingCart[i].quantity;
          productPrice.textContent =
            "Total " +
            parseFloat(
              (shoppingCart[i].price * shoppingCart[i].quantity) / 100
            ).toFixed(2) +
            " €";
          location.reload();
        } else {
          alert("Quantité maximale atteinte");
        }

        console.log(shoppingCart[i].quantity);
      });

      // Bouton pour supprimer un produit
      buttonDelete.addEventListener("click", function (event) {
        event.preventDefault();
        shoppingCart.splice(i, 1);
        localStorage.setItem(cartId, JSON.stringify(shoppingCart));
        location.reload();
      });
    }

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

    // Calcul de la somme totale à payer
    let totalPrice = 0;
    for (i = 0; i < shoppingCart.length; i++) {
      totalPrice += (shoppingCart[i].price * shoppingCart[i].quantity) / 100;
      console.log(totalPrice);
      cartPrice.textContent =
        "Total à payer: " + parseFloat(totalPrice).toFixed(2) + "€";
    }

    // Calcul du nombre total d'articles
    let totalQuantity = 0;
    for (i = 0; i < shoppingCart.length; i++) {
      totalQuantity =
        parseInt(shoppingCart[i].quantity) + parseInt(totalQuantity);
      numberOfItems.textContent =
        "Nombre d'articles dans le panier: " + totalQuantity;
    }

    cartTotal.appendChild(cartNumbersBlock);
    cartNumbersBlock.appendChild(cartNumberOfProducts);
    cartNumbersBlock.appendChild(cartTotalPrice);
    // cartTotal.appendChild(buyButton);
    cartNumberOfProducts.appendChild(numberOfItems);
    cartTotalPrice.appendChild(cartPrice);

    /* Formulaire d'achat */

    let shoppingForm = document.getElementById("shopping-form");

    cartForm.appendChild(shoppingForm);

    let formBoolean = false;
    // Fonction permettant de vérifier les champs du formulaire
    async function verifyForm() {
      // Vérification des caractères
      let verifyLetters = /[A-Za-z]/;
      let verifyNumbers = /[0-9]/;
      let verifyEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let verifyCharacters = /[?":{}|<>]/;

      let formErrorHTML =
        "<div id='form-alert'><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>";
      let badValue = "Format incorrect:";
      let badValueLetter = " - Lettres interdites";
      let badValueFigure = " - Chiffres interdits";
      let badValueChar = " - Caractères spéciaux interdits";
      let badValueEmail = " Format d'email non autorisé:";

      // Récupération des inputs
      let lnameId = document.getElementById("lname");
      let fnameId = document.getElementById("fname");
      let emailId = document.getElementById("email");
      let addressId = document.getElementById("address");
      let address2Id = document.getElementById("address");
      let cityId = document.getElementById("city");
      let zipcodeId = document.getElementById("zipcode");

      let lname = lnameId.value;
      let fname = fnameId.value;
      let email = emailId.value;
      let address = addressId.value;
      let address2 = address2Id.value;
      let city = cityId.value;
      let zipcode = zipcodeId.value;

      // Message de retour des contrôles
      let returnMessage = "";

      // Vérification de la validité des différents inputs
      // Nom de famille
      if (
        verifyNumbers.test(lname) == true ||
        verifyCharacters.test(lname) == true ||
        lname == ""
      ) {
        returnMessage = lnameId.insertAdjacentHTML(
          "afterend",
          formErrorHTML +
            badValue +
            badValueFigure +
            badValueChar +
            "</strong></div></div>"
        );
        console.log("erreur" + lname);
      } else {
        console.log("Nom validé" + lname);
      }

      // Prénom
      if (
        verifyNumbers.test(fname) == true ||
        verifyCharacters.test(fname) == true ||
        fname == ""
      ) {
        returnMessage = fnameId.insertAdjacentHTML(
          "afterend",
          formErrorHTML +
            badValue +
            badValueFigure +
            badValueChar +
            "</strong></div></div>"
        );
      } else {
        console.log("Prénom validé");
      }

      // Email
      if (verifyEmail.test(email) == false || email == "") {
        returnMessage = emailId.insertAdjacentHTML(
          "afterend",
          formErrorHTML + badValueEmail + badValueChar + "</strong></div></div>"
        );
      } else {
        console.log("Format d'Email validé");
      }

      // Adresse
      if (verifyCharacters.test(address) == true || address == "") {
        returnMessage = addressId.insertAdjacentHTML(
          "afterend",
          formErrorHTML + badValue + badValueChar + "</strong></div></div>"
        );
      } else {
        console.log("Format d'adresse validé");
      }

      // Complément d'adresse
      if (verifyCharacters.test(address2) == true) {
        returnMessage = address2Id.insertAdjacentHTML(
          "afterend",
          formErrorHTML + badValue + badValueChar + "</strong></div></div>"
        );
      } else {
        console.log("Complément d'adresse validé");
      }

      // Ville
      if (
        verifyNumbers.test(city) == true ||
        verifyCharacters.test(city) == true ||
        city == ""
      ) {
        returnMessage = cityId.insertAdjacentHTML(
          "afterend",
          formErrorHTML +
            badValue +
            badValueFigure +
            badValueChar +
            "</strong></div></div>"
        );
      } else {
        console.log("Format ville validé");
      }

      // Code postal
      if (
        verifyNumbers.test(zipcode) == false ||
        verifyLetters.test(zipcode) == true ||
        zipcode == ""
      ) {
        returnMessage = zipcodeId.insertAdjacentHTML(
          "afterend",
          formErrorHTML +
            badValue +
            badValueLetter +
            badValueChar +
            "</strong></div></div>"
        );
      } else {
        console.log("Format code postal validé");
      }

      // Si aucun message d'erreur n'est retourné,
      // alors le formulaire est validé et on peut enregistrer
      // les informations client dans un nouvel objet

      if (returnMessage != "") {
        shoppingForm.insertAdjacentHTML(
          "afterend",
          formErrorHTML +
            "Erreur: Des erreurs sont présentes dans le formulaire, veuillez les corriger" +
            "<br>" +
            "</strong></div></div>"
        );
        formBoolean = false;
      } else {
        // Construction de l'objet contenant les infos du client
        contact = {
          lname: lname,
          fname: fname,
          email: email,
          address: address,
          address2: address2,
          city: city,
          zipcode: zipcode,
        };
        console.log("formulaire validé");
        console.log(contact);
        formBoolean = true;
      }
    }

    // Déclaration des variables de la commande
    let contact;
    // Bouton d'achat
    let formSubmit = document.getElementById("shopping-form");
    let orderButton = document.getElementById("submit");
    orderButton.textContent = "Commander " + totalQuantity + " articles";
    formSubmit.addEventListener("submit", (event) => {
      event.preventDefault();
      verifyForm(contact);
      console.log(contact);
      if (formBoolean == true) {
        shoppingForm.insertAdjacentHTML(
          "afterend",
          "<div id='form-alert'><div class='alert alert-primary'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>" +
            "Formulaire valide" +
            "</strong></div></div>"
        );
        console.log(produits);
        let orderDataObject = {
          contact,
          produits,
        };
        let orderData = JSON.stringify(orderDataObject);
        sendForm(orderData, orderUrl);
        console.log(orderDataObject);
        //Une fois la commande faite, vidage des valeurs enregistrées et du local storage
        /*contact = {};
        produits = [];
        localStorage.clear();*/
        console.log(contact);
      }
      console.log(formBoolean);
    });

    async function sendForm(orderDataObject, orderUrl) {
      return new Promise((responseId) => {
        let xhr = new XMLHttpRequest();

        xhr.onload = function () {
          //document.location.assign("./confirmation.html?id=" + responseId.orderId + "&total=" + totalPrice + "&lname=" + lname + "&fname=" + fname);
          responseId(JSON.parse(this.responseText));
          console.log(orderDataObject);

          alert(xhr.status);
        };
        xhr.open("POST", orderUrl);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(orderDataObject);
        console.log(orderDataObject);
      });
    };

    // Appel de l'API pour l'envoi des informations grâce à fetch
    /*async function sendForm(orderData) {
      const formResponse = await fetch(orderUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: orderData,
      });

      let responseId = await formResponse.json();

      alert(formResponse.status);
      console.log("API reached. Code " + formResponse.status);
      document.location.assign(
        "./confirmation.html?id=" + responseId.orderId + "&total=" + totalPrice
      );
    }*/
  }
}
