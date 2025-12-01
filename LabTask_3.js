window.onload = function () {
    // IDs of all required fields
    const requiredIds = [
        "first-name",
        "last-name",
        "address-1",
        "city",
        "zip-code",
        "email"
    ];

    // Elements
    const continueBtn = document.querySelector(".buttons button:last-child");
    const resetBtn = document.querySelector(".buttons button:first-child");
    const otherAmountInput = document.getElementById("other-amount");
    const amountRadios = document.querySelectorAll("input[name='amount']");
    const recurringCheck = document.getElementById("recurring-donation");
    const ccSection = document.querySelector(".cc");
    const emailField = document.getElementById("email");

    // Initialize
    otherAmountInput.style.display = "none";
    ccSection.style.display = "none";

    // Set default select values (must be valid option values)
    const stateSelect = document.getElementById("state");
    if ([...stateSelect.options].some(o => o.value === "Alabama")) {
        stateSelect.value = "Alabama"; // example default
    }
    const countrySelect = document.getElementById("country");
    if ([...countrySelect.options].some(o => o.value === "Bangladesh")) {
        countrySelect.value = "Bangladesh";
    }

    // Validate form on Continue button click
    continueBtn.addEventListener("click", function (event) {
        event.preventDefault();

        let missingFields = [];

        // Check required fields
        for (const id of requiredIds) {
            const field = document.getElementById(id);
            if (!field || field.value.trim() === "") {
                // Grab the previous label text if possible, else fallback to id
                const label = field?.previousElementSibling;
                missingFields.push(label ? label.innerText.replace("*", "").trim() : id);
            }
        }

        if (missingFields.length > 0) {
            alert("Please fill all required fields:\n\n" + missingFields.join("\n"));
            return;
        }

        // Email format validation
        const emailValue = emailField.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
            alert("Please enter a valid email address.");
            emailField.focus();
            return;
        }

        alert("Form Submitted Successfully!");
    });

    // Show/hide Other Amount input based on radio selection
    amountRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.value === "other") {
                otherAmountInput.style.display = "inline-block";
                otherAmountInput.focus();
            } else {
                otherAmountInput.style.display = "none";
                otherAmountInput.value = "";
            }
        });
    });

    // Show/hide Credit Card section based on recurring checkbox
    recurringCheck.addEventListener("change", () => {
        ccSection.style.display = recurringCheck.checked ? "block" : "none";
        if (!recurringCheck.checked) {
            // Clear CC inputs when hidden
            ccSection.querySelectorAll("input").forEach(input => input.value = "");
            // Remove total display if exists
            const totalDiv = ccSection.querySelector(".total-recurring");
            if (totalDiv) totalDiv.innerHTML = "";
        }
    });

    // Calculate and show total recurring donation dynamically
    const ccAmountInput = ccSection.querySelector("input[name='cc']");
    const ccMonthsInput = ccSection.querySelectorAll("input[name='cc']")[1];

    // Create total display paragraph dynamically if not exists
    let totalDiv = ccSection.querySelector(".total-recurring");
    if (!totalDiv) {
        totalDiv = document.createElement("p");
        totalDiv.classList.add("total-recurring");
        totalDiv.style.marginLeft = "190px";
        totalDiv.style.fontWeight = "bold";
        ccSection.appendChild(totalDiv);
    }

    function updateTotal() {
        const amount = parseFloat(ccAmountInput.value);
        const months = parseInt(ccMonthsInput.value);

        if (!isNaN(amount) && !isNaN(months) && amount > 0 && months > 0) {
            const total = amount * months;
            totalDiv.textContent = `Total Recurring Donation: $${total.toFixed(2)}`;
        } else {
            totalDiv.textContent = "";
        }
    }

    ccAmountInput.addEventListener("input", updateTotal);
    ccMonthsInput.addEventListener("input", updateTotal);

    // Confirm before resetting form
    resetBtn.addEventListener("click", function (e) {
        const confirmReset = confirm("Are you sure you want to reset the form?");
        if (!confirmReset) e.preventDefault();
    });

    // Donation type radios toggle for acknowledge fields visibility
    const donationTypeRadios = document.querySelectorAll("input[name='honor'], input[name='memory']");
    const acknowledgeFields = document.querySelectorAll(
        ".donation-info input[type='text'].donation-info-input-name, " +
        ".donation-info input[type='text'].donation-info-input-acknowledge"
    );

    donationTypeRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.checked) {
                acknowledgeFields.forEach(field => (field.style.display = "block"));
            }
        });
    });

    // Comments textarea character limit (200 chars)
    const commentsInput = document.getElementById("comments");
    if (commentsInput) {
        commentsInput.addEventListener("input", () => {
            const maxLength = 200;
            if (commentsInput.value.length > maxLength) {
                commentsInput.value = commentsInput.value.substring(0, maxLength);
                alert("Comment limit is 200 characters!");
            }
        });
    }
};

