document.addEventListener("DOMContentLoaded", () => {
    const bookTitleInput = document.getElementById("book-title");
    const publicationYearInput = document.getElementById("publication-year");
    const addBookBtn = document.getElementById("add-book-btn");
    const booksTableBody = document.querySelector("#books-table tbody");

    function isValidTitle(title) {
        return /^[A-Za-z]+$/.test(title);
    }

    function isValidYear(year) {
        const currentYear = new Date().getFullYear();
        return /^\d{4}$/.test(year) && year >= 1900 && year <= currentYear;
    }

    addBookBtn.addEventListener("click", () => {
        const title = bookTitleInput.value.trim();
        const year = publicationYearInput.value.trim();

        if (!isValidTitle(title)) {
            alert("Invalid title! Please enter alphabetic characters only, no spaces or special characters.");
            bookTitleInput.focus();
            return;
        }

        if (!isValidYear(year)) {
            alert(`Invalid year! Please enter a four-digit number between 1900 and ${new Date().getFullYear()}.`);
            publicationYearInput.focus();
            return;
        }

        const newRow = document.createElement("tr");

        if (parseInt(year) < 2000) {
            newRow.classList.add("light-gray");
        } else {
            newRow.classList.add("light-green");
        }

        const titleCell = document.createElement("td");
        titleCell.textContent = title;

        const yearCell = document.createElement("td");
        yearCell.textContent = year;

        newRow.appendChild(titleCell);
        newRow.appendChild(yearCell);

        booksTableBody.appendChild(newRow);

        bookTitleInput.value = "";
        publicationYearInput.value = "";
        bookTitleInput.focus();
    });
});
