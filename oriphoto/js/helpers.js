// Fonction permettant de créer des éléments du DOM
function createDomElement(tagName, attributeType, attributeName) {
    let newElement = document.createElement(tagName);
    for (i = 0; i < attributeType.length; i++) {
        newElement.setAttribute(attributeType[i], attributeName[i]);
    }
    return newElement;
}

// Fonction permettant de vérifier la validité des différents inputs du formulaire de contact
function checkFormInput(checkedRegex, expextedValue, inputName, inputId, errorType) {
    // Variable comptant le nombre d'erreurs
    let errorCount = 0;
    if (checkedRegex == expextedValue) {
        inputId.insertAdjacentHTML(
            "afterend",
            errorType +
            "</strong></div></div>"
        );
        console.log("Erreur: " + inputName);
        errorCount = 1;
        console.log(errorCount)
    } else {
        console.log("Champ " + inputId.id + " validé: " + inputName);
    }
    console.log(errorCount)
    return errorCount;
}

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
