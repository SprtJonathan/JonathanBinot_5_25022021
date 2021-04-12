// Définitions de variables permettant de rendre le code plus modulaire
const soldProduct = "cameras"; // Passage du produit vendu en variable afin de pouvoir facilement modifier sa valeur
const apiUrl = "http://localhost:3000/api/" + soldProduct + "/"; // Lien vers l'API du type de produit vendu 
//const apiUrl = "https://ab-p5-api.herokuapp.com/api/" + soldProduct + "/"; // Lien vers l'API du type de produit vendu 
//(ce dernier URL était utilisé car le 08/04/2021 la BDD originale ne pouvait plus être jointe)

// Variables pour la confirmation et commande par l'envoi des données précéemment collectées
const orderUrl = apiUrl + "order" + "/";

// Création du tableau contenant la commande
let products = [];

console.log(shoppingCart);

async function displayShoppingCart() {
  // Déclaration des variables liées aux éléments principaux de la page
  const main = document.getElementById("cart-main");
  const emptyCart = document.getElementById("empty-cart");

  const recapFormSection = document.getElementById("cart-recap-form");
  const shoppingForm = document.getElementById("shopping-form");

  if (shoppingCart.length > 0) {
    emptyCart.remove();

    // Création de l'interface du panier

    let cartCheckout = createDomElement("section", ["id", "class"], ["cart-checkout", "card cart--section cart--section--checkout"]);

    let itemsSectionTitle = createDomElement("h3", ["id", "class"], ["cart-checkout-title", "cart--section--title"]);
    itemsSectionTitle.textContent = "Articles sélectionnés";

    let cartTotal = document.getElementById("cart-total");

    let recapSectionTitle = createDomElement("h3", ["id", "class"], ["cart-total-title", "cart--section--title"]);
    recapSectionTitle.textContent = "Récapitulatif de commande";

    let cartForm = document.getElementById("cart-form");

    let formSectionTitle = createDomElement("h3", ["id", "class"], ["cart-form-title", "cart--section--title"]);
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
      // Enregistrement de l'ID des produits dans le tableau produits qui sera renvoyé à l'API pour la commande
      products.push(shoppingCart[i].id);
      // Container contenant les informations de l'article
      let productContainer = createDomElement("article", ["class"], ["cart--product-container shadow-sm"]);

      // Bloc de l'image
      let productImgContainer = createDomElement("aside", ["class"], ["cart--product-img--block"]);

      let productImg = createDomElement("img", ["class", "src"], ["cart--product-img", shoppingCart[i].image]);

      // Bloc contenant le nom et l'option de l'article
      let productNameContainer = createDomElement("aside", ["class"], ["cart--product-name--block"]);

      // Nom de l'article
      let productName = createDomElement("h3", ["class"], ["cart--product-name" + [i]]);
      productName.textContent = shoppingCart[i].name;

      // Option sélectionnée
      let productOption = createDomElement("h5", ["class"], ["cart--product-option" + [i]]);
      productOption.textContent =
        "Option sélectionnée: " + shoppingCart[i].options;

      // Bloc contenant les chiffres de l'article choisi
      let productFiguresContainer = createDomElement("aside", ["class"], ["cart--product-figures--block"]);

      // Bloc contenant la quantité d'articles d'un même objet et les boutons + et -
      let productQuantityBlock = createDomElement("div", ["class"], ["cart--product-quantity--block"]);

      // Bouton servant à réduire la quantité d'articles
      let productQuantityLess = createDomElement("a", ["class", "id", "href"], ["cart--product-quantity--modifier--minus btn btn-secondary", "button-less--" + [i], ""]);

      // Texte indiquant la quantité d'un même article
      let productQuantity = createDomElement("h4", ["class"], ["cart--product-quantity--number"]);
      productQuantity.textContent = "Quantité: " + shoppingCart[i].quantity;

      // Bouton servant à augmenter la quantité d'articles
      let productQuantityMore = createDomElement("a", ["class", "id", "href"], ["cart--product-quantity--modifier--plus btn btn-primary", "button-more--" + [i], ""]);

      // Bouton contenant le prix du produit
      let productPrice = createDomElement("h3", ["class"], ["cart--product-price"]);

      // Bloc contenant le bouton servant à retirer un article du panier
      let removeProduct = createDomElement("div", ["id", "class"], ["delete-product-block", "cart--product-remove btn btn-danger"]);

      // Bouton servant à retirer un article du panier
      removeProductCross = createDomElement("a", ["class", "id", "href"], ["cart--product-remove--cross", "delete-product--" + [i], ""]);
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
      // Puis on stocke la nouvelle valeur dans un objet que l'on renvoie au localStorage
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
    let cartNumberOfProducts = createDomElement("article", ["class"], ["cart--total--items--block"]);

    let cartNumbersBlock = createDomElement("div", ["id", "class"], ["recap-number", "cart--total--items shadow-sm"]);

    let numberOfItems = createDomElement("h3", ["id", "class"], ["total-items-number", "cart--total--items--number"]);

    let cartTotalPrice = createDomElement("article", ["id", "class"], ["total-items-price", "cart--total--items--block"]);

    let cartPrice = createDomElement("h3", ["id", "class"], ["total-price", "cart--total--items--price"]);

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

    cartForm.appendChild(shoppingForm);

    let formBoolean = false;
    // Fonction permettant de vérifier les champs du formulaire
    async function verifyForm() {
      // Vérification des caractères via des regex
      let verifyLetters = /[A-Za-z]/; // Vérification des lettres uniquement
      let verifyNumbers = /[0-9]/; // Vérification des chiffres uniquement
      let verifyEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Vérification de l'email
      let verifyCharacters = /[*?":{}|<>]/; // Vérification des caractères spéciaux

      // Création de variables pour l'affichage des erreurs
      let formErrorHTML =
        "<div id='form-alert'><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>";
      let badValue = "Format incorrect:";
      let badValueLetter = " - Lettres interdites";
      let badValueFigure = " - Chiffres interdits";
      let badValueChar = " - Caractères spéciaux interdits";
      let badValueEmail = " Format d'email non autorisé:";

      // Création des variables des champs
      let lnameId = document.getElementById("lname");
      let fnameId = document.getElementById("fname");
      let emailId = document.getElementById("email");
      let addressId = document.getElementById("address");
      let address2Id = document.getElementById("address-2");
      let cityId = document.getElementById("city");
      let zipcodeId = document.getElementById("zipcode");

      // Récupération des inputs
      let lname = lnameId.value;
      let fname = fnameId.value;
      let email = emailId.value;
      let address = addressId.value;
      let address2 = address2Id.value;
      let city = cityId.value;
      let zipcode = zipcodeId.value;

      // Vérification de la validité des différents inputs
      // Nom de famille
      let lnameCheck = checkFormInput(verifyNumbers.test(lname) | verifyCharacters.test(lname), true, lname, lnameId, formErrorHTML + badValue + badValueFigure + badValueChar);

      // Prénom
      let fnameCheck = checkFormInput(verifyNumbers.test(fname) | verifyCharacters.test(fname), true, fname, fnameId, formErrorHTML + badValue + badValueFigure + badValueChar);

      // Email
      let emailCheck = checkFormInput(verifyEmail.test(email), false, email, emailId, formErrorHTML + badValueEmail + badValueChar);

      // Adresse
      let addressCheck = checkFormInput(verifyCharacters.test(address), true, address, addressId, formErrorHTML + badValue + badValueChar);

      // Complément d'adresse
      let address2Check = checkFormInput(verifyCharacters.test(address), true, address2, address2Id, formErrorHTML + badValue + badValueChar);

      // Ville
      let cityCheck = checkFormInput(verifyNumbers.test(city) | verifyCharacters.test(city), true, city, cityId, formErrorHTML + badValue + badValueFigure + badValueChar);

      // Code postal
      let zipcodeCheck = checkFormInput(verifyCharacters.test(zipcode) | verifyLetters.test(zipcode), true, zipcode, zipcodeId, formErrorHTML + badValue + badValueLetter + badValueChar);

      // Variable comptant le nombre d'erreurs
      let errorCount = lnameCheck + fnameCheck + emailCheck + addressCheck + address2Check + cityCheck + zipcodeCheck;

      if (errorCount != 0) {
        shoppingForm.insertAdjacentHTML("afterend", formErrorHTML + "Erreur: Des erreurs sont présentes dans le formulaire, veuillez les corriger" + "<br>" + "</strong></div></div>");
        formBoolean = false; // Si des erreurs sont retournées alors on définit la variable comme fausse pour que le formulaire ne puisse pas être envoyé
      } else {
        // Construction de l'objet contenant les infos du client
        contact = {
          firstName: fname,
          lastName: lname,
          email: email,
          address: address + ", " + address2, // L'adresse secondaire est ici ajoutée à la principale pour plus d'exactitude lors de la commande
          city: city + ", " + zipcode, // Le code postal est ici ajouté après la ville afin que la localisation soit plus précise
        };
        console.log("formulaire validé");
        formBoolean = true; // Si aucune erreur n'est retournée alors on définit la variable comme vraie pour que le formulaire ne puisse pas être envoyé
      }
    }

    // Déclaration des variables de la commande
    // Variable permettant de récupérer les informations de contact de l'utilisateur
    let contact;

    // Bouton d'achat
    let formSubmit = document.getElementById("shopping-form");
    let orderButton = document.getElementById("submit");
    orderButton.textContent = "Commander " + totalQuantity + " articles"; // Affichage du nombre d'articles de la commande
    
    // Fonciton éxecutée lorsque le bouton acheté est cliqué
    formSubmit.addEventListener("submit", (event) => {
      event.preventDefault();
      verifyForm(contact); // Vérification du formulaire avant l'envoi
      console.log(contact);
      if (formBoolean == true) { // Vérification de la variable booléenne définie précédemment
        shoppingForm.insertAdjacentHTML(
          "afterend",
          "<div id='form-alert'><div class='alert alert-primary'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>" +
          "Formulaire valide" +
          "</strong></div></div>"
        ); // Si vrai, alors on affiche un message de confirmation pour la validation du formulaire
        console.log(products);
        let orderDataObject = {
          contact,
          products,
        }; // On crée un objet contenant les données qui seront envoyées à l'API
        let orderData = JSON.stringify(orderDataObject);
        sendForm(orderData, orderUrl); // Envoi des données à l'API
        console.log(orderData);
        // Une fois la commande faite, vidage des valeurs enregistrées et du local storage
        contact = {};
        products = [];
        localStorage.clear();
      }
      console.log(formBoolean);
    });

    // Envoi à l'API des informations grâce à fetch
    async function sendForm(orderData, orderUrl) {
      const formResponse = await fetch(orderUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: orderData,
      });

      let responseId = await formResponse.json();

      // Si la réponse de l'api est valide alors on récupère les information de commande et on les ajoute à l'URL de la page de confirmation avant d'y être redirigé
      if (formResponse.status < 300 && formResponse.status >= 200) {
        let parsedData = JSON.parse(orderData);
        console.log(formResponse.status);
        console.log("API reached. Code " + formResponse.status);
        document.location.assign("./confirmation.html?id=" + responseId.orderId + "&total=" + totalPrice + "&firstName=" + parsedData.contact.firstName + "&lastName=" + parsedData.contact.lastName);
      } else {
        alert("Une erreur s'est produite, veuillez réessayer ultérieurement."); // Sinon on renvoie une alerte au navigateur
      }
    }
    // Si le panier est vide, alors on supprime le formulaire
  } else {
    recapFormSection.remove();
  }
}