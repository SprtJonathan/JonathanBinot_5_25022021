// Définition des variables
let pageUrl = new URL(document.location.href); // Permet de récupérer l'URL de la page
let orderId = pageUrl.searchParams.get("id"); // Récupère les informations de l'URL à partir de l'id défini précédemment
let customerFName = pageUrl.searchParams.get("firstName");
let customerLName = pageUrl.searchParams.get("lastName");
let totalPrice = pageUrl.searchParams.get("total");
totalPriceText = "Total payé: " + parseFloat(totalPrice).toFixed(2) + "€";

// Fonction permettant d'afficher les informations de la confirmation de commande
async function displayConfirmation() {
    let recapText = document.getElementById("recap-text");
    let orderIdText = createDomElement("p", ["id", "class"], ["order-id-text", "order--id--text"]);
    orderIdText.innerHTML = "Commande N°" + orderId + "</br>" + " au nom de " + customerFName + " " + customerLName + " confirmée";
    recapText.appendChild(orderIdText);
    let totalPriceElement = createDomElement("p", ["id", "class"], ["order-total-price-text", "order--total-price--text"]);
    totalPriceElement.textContent = totalPriceText;
    recapText.appendChild(totalPriceElement);
}