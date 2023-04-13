"use strict";

const form = document.forms.item(0);


window.addEventListener('load', () => {
    calc();
    form.onchange = calc;

    document.querySelectorAll('form section input[type="checkbox"]').forEach((checkbox) => {
        checkbox.onchange = () => {
            if (checkbox.checked) document.getElementById(`${checkbox.id}Add`).style.display = "block";
            else document.getElementById(`${checkbox.id}Add`).style.display = "none";
            updateTotal();
        };
    });
});

function calc() {
    calcKennelSize();
    // calcBoarding();
    updateTotal();
}

function calcKennelSize() {
    const weight = form.weight.value;
    let size;

    if (!weight) size = "";
    else if (weight <= 4) size = "mini";
    else if (weight > 4 && weight <= 12) size = "small";
    else if (weight > 12 && weight <= 50) size = "medium";
    else if (weight > 50) size = "large";

    form.size.value = size;
}

function calcBoarding() {
    const days = form.days.value;
    let fee;

    if (!days) {
        form.days.value = 0;
        fee = 0.00;
    } else if (parseFloat(days) || parseFloat(days) === 0) {
        form.days.value = parseInt(days);
        fee = (19.99 * days).toFixed(2);
    }
    return form.boardingFee.value = fee;
}

function updateTotal() {
    let numEvents = 0;
    const boardingCost = calcBoarding();

    if (form.sing.checked) ++numEvents;
    if (form.cute.checked) ++numEvents;
    if (form.trick.checked) ++numEvents;

    const registrationCost = 120 * numEvents;
    const total = boardingCost + registrationCost;

    form.boardingCost.value = boardingCost; // BoardingCost is already fixed in calcBoarding()
    form.registrationCost.value = registrationCost.toFixed(2);
    form.totalCost.value = parseFloat(total).toFixed(2);
}