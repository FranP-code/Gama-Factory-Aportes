function getPricesElements() {
    const elements = document.querySelectorAll(".price-box.box-special .price")
    return elements
}

function main() {

    //Get all options

    const options = document.querySelectorAll("option")

    //Get the option with (+$price) and select the father element
    let select;

    options.forEach(option => {

        //If select defined, return
        if (select) {
            return
        }

        if (option.textContent.includes("(+$")) {
            const number = option.textContent.substring(
                option.textContent.indexOf("(+$") + 1, 
                option.textContent.lastIndexOf(")")
            );

            if (number) {
                select = option.parentElement
            }
        }
    })

    console.log(select)

    //If there are more or less than one selected, report the error and stop the script
    if (!select) {
        console.error("ERROR SELECTING THE PRICE SELECT ELEMENT")
        console.log("Select elements", selectElements)
        console.log("Select element", select)
        return
    }

    //Get prices of the product
    const priceElements = [...getPricesElements()]

    //Get the number of each price of the product
    const priceElementsPrices = priceElements.map(priceElement => {
        
        const priceText = priceElement.innerText
        
        return parseInt(
            priceText.substring(
                priceText.indexOf("$") + 1,
                priceText.length
            ).replace(".","")
        )
    })

    //Get shares element
    const sharesElement = document.querySelector(".short-des font b span font")

    //Add event listener to the selected select element
    select.addEventListener("change", (e) => {

        //Get option text
        const option = e.target.selectedOptions[0].innerText
        
        //Initialize the variable without increase on the price
        let priceIncrease = 0

        //If the text is a price, add it to the increase
        if (option.includes("(+$")) {
            let str = option.substring(
                option.indexOf("(+$") + 3,
                option.indexOf(")")
            ).replace(".","")

            priceIncrease = parseInt(str)
        }
        
        //Replace the original price text with the actualizated price
        priceElements.forEach((element, index) => {
            element.innerText = `$${(priceElementsPrices[index] + priceIncrease).toLocaleString()}`
        })

        //Set the shares of the product
        let sharesNumber = ((priceElementsPrices[0] + priceIncrease) / 10).toLocaleString(false, {minimumFractionDigits: 2})
        sharesElement.innerHTML = `$ ${sharesNumber} <br>`
    })
}

window.addEventListener('load', main)