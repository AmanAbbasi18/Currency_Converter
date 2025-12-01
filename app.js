let base_link = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrs = document.querySelector(".from select");
const toCurrs = document.querySelector(".to select");

window.addEventListener("load", () => {
    updateExchangeRate();
})

for(let select of dropdowns) {   //there are 2 selects in total ,1 in from 1 in To
    for (currCode in countryList) {//code -> currency code, countryList[code] -> country code
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);   //evt.target Refers to the exact element that triggered the event — in this case, the <select> element.   the option is sent which we changed into
    })
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    // console.log(currCode, countryCode);
    let UpdtImage = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let currImage = element.parentElement.querySelector("img");
    currImage.src = UpdtImage;
    currImage.alt = currCode;
}



btn.addEventListener("click", (event) => {
    event.preventDefault(); 
    updateExchangeRate();    
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal < 0 || amtVal == "") {
        amtVal = 1;
        amount.value = "1";
    }

    let from = fromCurrs.value.toLowerCase(); // e.g., 'usd'    //jo slected he option wo return hoti idhar
    let to = toCurrs.value.toLowerCase();     // e.g., 'inr'

    let URL = `${base_link}/${from}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    
    let rate = data[from][to];
    let msg = document.querySelector("form .msgRate");
    msg.innerText = `${amtVal} ${from.toUpperCase()} = ${amtVal * rate} ${to.toUpperCase()}`;
    // console.log(`1 ${from.toUpperCase()} = ${rate} ${to.toUpperCase()}`);
}