// Classes

// Everything related to the quotation and calculations in Insurance
class Insurance {
    constructor(make, year, level) {
        this.make = make;
        this.year = year;
        this.level = level;
    }

    //Calculate the price for the current quotation
    calculateQuotation(insurance) {
        let price;
        const base = 2000;

        // Make 

        const make = insurance.make;

        /*
        1 = American 15%
        2 = Asian 5%
        3 = European 35%
        */

        switch (make) {
            case '1':
                price = base * 1.15;
                break;
            case '2':
                price = base * 1.05;
                break;
            case '3':
                price = base * 1.35;
                break;
        }
        // Get the year 
        const year = insurance.year;

        // Get the year difference
        const difference = this.getYearDifference(year);

        // Each year the cost of the insurance is going to be 3% cheapear

        price = price - ((difference * 3) * price) / 100;

        // Check the level of protection 

        const level = insurance.level;

        price = this.calculateLevel(price, level);

        return price;

    }

    // Reature the difference between years
    getYearDifference(year) {
        return new Date().getFullYear() - year;
    };

    // Adds the value based on the level of protection
    calculateLevel(price, level) {
        /*
        Basic insurance is going to increase the value by 30%
        Complete insurance is going to increase the value by 50%
        */

        if (level === 'basic') {
            price = price * 1.30;
        } else {
            price = price * 1.50;
        }

        return price;
    }
}


// Every thing realted to HTML
class HTMLUI {

    // Display the latest 20 years in the select
    displayYears() {

        // Max and minimum years

        const max = new Date().getFullYear(),
            min = max - 20;

        // Generate the list with the latest 20 years

        const selectYears = document.getElementById('year');

        // Print the values
        for (let i = max; i >= min; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectYears.appendChild(option);
        }

    }

    // Print an error 

    displayError(message) {
        // create a div

        const div = document.createElement('div');
        div.classList = 'error';

        // insert the message 
        div.innerHTML = `<p>${message}</p>`;
        form.insertBefore(div, document.querySelector('.form-group'));

        // remove the error
        setTimeout(() => {
            document.querySelector('.error').remove();
        }, 3000);
    }

    // Prints the result into the HTML

    showResults(price, insurance) {
        // Print the result 

        const result = document.getElementById('result');

        // create a div with the result

        const div = document.createElement('div');

        // Get Make from the object and assign a readable name

        let make = insurance.make;

        switch (make) {
            case '1':
                make = 'American';
                break;
            case '2':
                make = 'Asian';
                break;
            case '3':
                make = 'European';
                break;
        }
        // Insert the result 

        div.innerHTML = `<p class="header" > Summary</p>
    <p>Make: ${make}</p>
    <p> Year: ${insurance.year}</p>
    <p> Level: ${insurance.level}</p>
    <p class = "total" > Total: $ ${price}</p>`;

        const spinner = document.querySelector('#loading img');
        spinner.style.display = 'block';

        setTimeout(() => {
            // Insert this into the HTML
            spinner.style.display = 'none';
            // Insert this into the HTML
            result.appendChild(div);
        }, 3000);


    }
}

// Variables
const form = document.getElementById('request-quote');
const html = new HTMLUI();

// Event Listeners

eventListeners();

function eventListeners() {

    document.addEventListener('DOMContentLoaded', function (params) {
        // Create <option> for years 

        html.displayYears();
    });

    // When form is submitted
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get the values from the form
        const make = document.getElementById('make').value;
        const year = document.getElementById('year').value;
        // Read the value from radio buttons
        const level = document.querySelector('input[name="level"]:checked').value;
        // Check that all the fields have something
        if (make === '' || year === '' || level === '') {
            html.displayError('All the fields are mandatory');
        } else {

            // Clear the previous quotes

            const prevResult = document.querySelector('#result div');
            if (prevResult != null) {
                prevResult.remove();
            }

            // Make the quotations 

            const insurance = new Insurance(make, year, level);
            const price = insurance.calculateQuotation(insurance);

            // Print the result from HTMLUI

            html.showResults(price, insurance);
        }
    });
}