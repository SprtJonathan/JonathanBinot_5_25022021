// Définition des variables
let pageUrl = new URL(window.location.href);
let orderId = pageUrl.searchParams.get("id");
let totalPrice = pageUrl.searchParams.get("total");
totalPriceText = "Total payé: " + parseFloat(totalPrice).toFixed(2) + "€";

async function displayConfirmation() {
    const main = document.getElementById("main");
    let recapSection = document.getElementById("confirmation-container");
    let recapText = document.getElementById("recap-text");
    let orderIdText = document.createElement("p");
    orderIdText.setAttribute("id", "order--id--text");
    orderIdText.setAttribute("class", "order--id--text");
    orderIdText.textContent = "Commande N°" + orderId + " enregistrée";
    recapSection.appendChild(orderIdText);
    let totalPriceElement = document.createElement("p");
    totalPriceElement.setAttribute("id", "order-total-price--text");
    totalPriceElement.setAttribute("class", "order--total-price--text");
    totalPriceElement.textContent = totalPriceText;
    recapSection.appendChild(totalPriceElement);

    

}