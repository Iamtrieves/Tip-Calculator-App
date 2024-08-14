// Get references to input elements, display areas, and error messages
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const customTipInput = document.getElementById('custom-tip-percentage');
const tipAmountDisplay = document.getElementById('tipAmount');
const totalAmountDisplay = document.getElementById('totalAmount');
const tipOptions = document.querySelectorAll('.flex-item');
const billError = document.querySelector('.bill-error');
const peopleError = document.querySelector('.people-error');
const resetButton = document.getElementById('button');

// The outer forEach loop iterates through each tip option.
// The inner forEach loop efficiently removes the selected class from all other options except the clicked one.
// The classList.toggle method is used to toggle the selected class on the clicked option.
tipOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remove 'selected' class from all other options
    tipOptions.forEach(btn => {
        if (btn !== option) {
        btn.classList.remove('selected');
        }
    });
    // Toggle 'selected' class on the clicked option and makes the custom tip input empty
    option.classList.toggle('selected');
    customTipInput.value = '';
    });
});

// Remove the selected class on the tipOptions when the customInput receives an input
customTipInput.addEventListener('input', () => {
    tipOptions.forEach(btn => {
        btn.classList.remove('selected');
    });
})

// Event Listener to validate the billInput value and display or remove the error class message
billInput.addEventListener('input', () => {
    const inputValue1 = billInput.value.trim();
    const numberRegex = /^\d+(\.\d+)?$/;
    const inputValue = parseFloat(billInput.value.trim()); // Parse to a number for comparison

    if (!numberRegex.test(inputValue1)) {
        billError.textContent = 'Invalid Input';
        billInput.style.borderColor = "red";
        setTimeout(() => {
            billError.textContent = '';
            billInput.style.borderColor = "";
            billInput.value = "";
        }, 2000)
    } else {
        if (isNaN(inputValue) || inputValue <= 0) {
        if (inputValue === 0) {
            billError.textContent = "Can't be zero";
            billInput.style.borderColor = "red";
            setTimeout(() => {
                billError.textContent = "";
                billInput.value = "";
                billInput.style.borderColor = "";
            }, 2000)
        } else {
            billError.textContent = 'Invalid Input';
            billInput.style.borderColor = "red";
            setTimeout(() => {
                billError.textContent = '';
                billInput.value = "";
                billInput.style.borderColor = "";
            }, 2000)
        }
    }
    }
});

// Event Listener to validate the custom value and display or remove the error class message
customTipInput.addEventListener('input', () => {
    const customValue = customTipInput.value.trim();
    if (isNaN(customValue) || customValue === '') {
        // Clear the input after 2 seconds
        customTipInput.style.borderColor = "red";
        setTimeout(() => {
            customTipInput.style.borderColor = "";
            customTipInput.value = '';
        }, 2000);
    } 
});

// Event Listener to validate the peopleInput value and display or remove the error class message
peopleInput.addEventListener('input', () => {
    const peopleInputValue1 = peopleInput.value.trim();
    const numberRegex = /^\d+(\.\d+)?$/;
    const peopleInputValue = parseFloat(peopleInput.value.trim()); // Parse to a number for comparison
    if (!numberRegex.test(peopleInputValue1)) {
        peopleError.textContent = 'Invalid Input';
        peopleInput.style.borderColor = "red";
        setTimeout(() => {
            peopleError.textContent = "";
            peopleInput.value = "";
            peopleInput.style.borderColor = "";
        }, 2000)
    } else {
        if (isNaN(peopleInputValue) || peopleInputValue <= 0) {
            if (peopleInputValue === 0) {
            peopleError.textContent = "Can't be zero";
            peopleInput.style.borderColor = "red";
            setTimeout(() => {
                peopleError.textContent = "";
                peopleInput.value = "";
                peopleInput.style.borderColor = "";
            }, 2000)
        } else {
            peopleError.textContent = 'Invalid Input';
            peopleInput.style.borderColor = "red";
            setTimeout(() => {
                peopleError.textContent = '';
                peopleInput.value = "";
                peopleInput.style.borderColor = "";
            }, 2000)
        }
    }
}});


// Event Listener for the peopleInput variable
peopleInput.addEventListener('input', calculateTip);

// Function to Calculate Tip
// Get input values
function calculateTip() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);

    // Input validation
    if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0) {
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    return; // Exit the function if inputs are invalid
    }

    // Determine the tip Percentage
    let tipPercentage = 0;
    const selectedTipButton = document.querySelector('.flex-item.selected');
    if (selectedTipButton) {
        tipPercentage = parseFloat(selectedTipButton.dataset.tip) / 100;
      } else if (customTipInput.value !== '') {
        tipPercentage = parseFloat(customTipInput.value) / 100;
      } else {
        // Handle missing tip percentage
        billError.textContent = 'Invalid Input';
      }
    // Calculate tip and total

    const tipAmount = bill * tipPercentage;
    const totalAmount = (bill + tipAmount) / people;

    // Update Display
    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}
// Function to Reset Inputs for the Reset Button 
function resetInputs() {
    billInput.value = '';
    peopleInput.value = '';
    customTipInput.value = '';
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    billError.textContent = '';
    peopleError.textContent = '';
    tipOptions.forEach(btn => {
        btn.classList.remove('selected');
    });
}
resetButton.addEventListener('click', resetInputs);
window.onload = resetInputs;
