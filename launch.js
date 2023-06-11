 // Function to add a person name to the table and localStorage
 function addPersonName() {
    var personInput = document.getElementById('personName');
    var personName = personInput.value.trim();

    if (personName !== '') {
        var table = document.getElementById('personTable');
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        cell1.innerHTML = personName;
        cell2.innerHTML = '<button class="table-btn" onclick="deleteEntry(this)">Delete</button>';

        // Store the person name in localStorage
        var storedNames = localStorage.getItem('persons');
        var names = [];

        if (storedNames !== null) {
            names = JSON.parse(storedNames);
        }

        names.push(personName);
        localStorage.setItem('persons', JSON.stringify(names));

        personInput.value = '';
    }
}
function deleteEntry(button) {
    var tableRow = button.parentNode.parentNode;
    var tableName = tableRow.parentNode.parentNode.id;
    var itemName = tableRow.firstChild.innerHTML;

    if (tableName === 'personTable') {
        var storedNames = localStorage.getItem('persons');
        var names = JSON.parse(storedNames);
        var updatedNames = names.filter(function (name) {
            return name !== itemName;
        });
        localStorage.setItem('persons', JSON.stringify(updatedNames));

        // Update the "choice" person if necessary
        var storedChoice = localStorage.getItem('choice');
        if (storedChoice === itemName) {
            localStorage.removeItem('choice');
        }
    } else if (tableName === 'lunchTable') {
        var storedLunches = localStorage.getItem('lunches');
        var lunches = JSON.parse(storedLunches);
        var updatedLunches = lunches.filter(function (lunch) {
            return lunch !== itemName;
        });
        localStorage.setItem('lunches', JSON.stringify(updatedLunches));
    }

    tableRow.parentNode.removeChild(tableRow);
}

// Function to add a lunch name to the table and localStorage
function addLunchName() {
    var lunchInput = document.getElementById('lunchName');
    var lunchName = lunchInput.value.trim();

    if (lunchName !== '') {
        var table = document.getElementById('lunchTable');
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        cell1.innerHTML = lunchName;
        cell2.innerHTML = '<button class="table-btn" onclick="deleteEntry(this)">Delete</button>';

        // Store the lunch name in localStorage
        var storedLunches = localStorage.getItem('lunches');
        var lunches = [];

        if (storedLunches !== null) {
            lunches = JSON.parse(storedLunches);
        }

        lunches.push(lunchName);
        localStorage.setItem('lunches', JSON.stringify(lunches));

        lunchInput.value = '';
    }
}
function generateRandomNames() {
    var table = document.getElementById('personTable');
    var rows = table.getElementsByTagName('tr');
    var names = [];

    // Exclude the first row (table header) from the random selection
    for (var i = 1; i < rows.length; i++) {
        names.push(rows[i].getElementsByTagName('td')[0].innerHTML);
    }

    if (names.length < 2) {
        alert('Add at least two names before generating random names.');
    } else {
        var randomPairs = generatePairs(names.slice(0, 2 * (names.length - 1)));
        var choicePerson = names[names.length - 1];

        // Create a new table to display the pairs
        var resultTable = document.createElement('table');
        resultTable.classList.add('pairTable');

        // Create table header
        var headerRow = document.createElement('tr');
        var headerCell1 = document.createElement('th');
        headerCell1.textContent = 'Pair';
        headerRow.appendChild(headerCell1);
        resultTable.appendChild(headerRow);

        // Create table rows for each pair
        randomPairs.forEach(function(pair, index) {
            var pairRow = document.createElement('tr');
            var pairCell = document.createElement('td');
            pairCell.textContent = pair[0] + ' - ' + pair[1];
            pairRow.appendChild(pairCell);
            resultTable.appendChild(pairRow);
        });
        // Clear the existing result container
        var resultContainer = document.getElementById('randomResult');
        resultContainer.innerHTML = '';

        // Append the result table to the container
        resultContainer.appendChild(resultTable);

        // Make the "choice" person by default visible in the lunch name
        var lunchInput = document.getElementById('lunchName');
        lunchInput.value = 'Choice: ' + choicePerson;

        // Store the "choice" person in localStorage
        localStorage.setItem('choice', choicePerson);
    }
}
function loadStoredLunches() {
    var storedLunches = localStorage.getItem('lunches');

    if (storedLunches !== null) {
        var lunches = JSON.parse(storedLunches);
        var table = document.getElementById('lunchTable');

        for (var i = 0; i < lunches.length; i++) {
            var row = table.insertRow();
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            cell1.innerHTML = lunches[i];
            cell2.innerHTML = '<button class="table-btn" onclick="deleteEntry(this)">Delete</button>';
        }
    }

    // Retrieve the stored "choice" person and set it as the default value in the lunch name field
    var storedChoice = localStorage.getItem('choice');
    if (storedChoice !== null) {
        var lunchInput = document.getElementById('lunchName');
        lunchInput.value = 'Choice: ' + storedChoice;
    }
}

// Helper function to generate random pairs from an array of names
function generatePairs(names) {
    var pairs = [];
    var shuffledNames = names.slice(); // Create a copy of the names array

    if (names.length % 2 !== 0) {
        // If there are odd number of names, remove one name and set it as the "choice" person
        var choicePersonIndex = Math.floor(Math.random() * shuffledNames.length);
        var choicePerson = shuffledNames.splice(choicePersonIndex, 1)[0];
        pairs.push(["Choice", choicePerson]);
    }

    while (shuffledNames.length) {
        var pair = [shuffledNames.shift(), shuffledNames.shift()];
        pairs.push(pair);
    }

    return pairs;
}
// Function to shuffle an array using Fisher-Yates algorithm
function shuffle(array) {
    var currentIndex = array.length,temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// Function to generate a random lunch from the table
function generateRandomLunch() {
    var table = document.getElementById('lunchTable');
    var rows = table.getElementsByTagName('tr');
    var lunches = [];

    // Exclude the first row (table header) from the random selection
    for (var i = 1; i < rows.length; i++) {
        lunches.push(rows[i].getElementsByTagName('td')[0].innerHTML);
    }

    if (lunches.length === 0) {
        alert('Add lunch names before generating a random lunch.');
    } else {
        var randomIndex = Math.floor(Math.random() * lunches.length);
        var randomLunch = lunches[randomIndex];

        alert('Random Lunch:\n\n' + randomLunch);
    }
}
// Function to load stored person names from localStorage and populate the person table
function loadStoredPersons() {
    var storedNames = localStorage.getItem('persons');

    if (storedNames !== null) {
        var names = JSON.parse(storedNames);
        var table = document.getElementById('personTable');

        for (var i = 0; i < names.length; i++) {
            var row = table.insertRow();
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            cell1.innerHTML = names[i];
            cell2.innerHTML = '<button class="table-btn" onclick="deleteEntry(this)">Delete</button>';
        }
    }
}
// Function to load stored lunch names from localStorage and populate the lunch table
function loadStoredLunches() {
    var storedLunches = localStorage.getItem('lunches');

    if (storedLunches !== null) {
        var lunches = JSON.parse(storedLunches);
        var table = document.getElementById('lunchTable');

        for (var i = 0; i < lunches.length; i++) {
            var row = table.insertRow();
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            cell1.innerHTML = lunches[i];
            cell2.innerHTML = '<button class="table-btn" onclick="deleteEntry(this)">Delete</button>';
        }
    }
}
// Load stored person names and lunch names when the page is loaded
window.addEventListener('load', function() {
    loadStoredPersons();
    loadStoredLunches();
});
// Add a person name when the person form is submitted
var personForm = document.getElementById('personForm');
personForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addPersonName();
});
// Add a lunch name when the lunch form is submitted
var lunchForm = document.getElementById('lunchForm');
lunchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addLunchName();
});
// Generate random names when the random names button is clicked
var randomNamesBtn = document.getElementById('randomNamesBtn');
randomNamesBtn.addEventListener('click', generateRandomNames);

// Generate a random lunch when the random lunch button is clicked
var randomLunchBtn = document.getElementById('randomLunchBtn');
randomLunchBtn.addEventListener('click', generateRandomLunch);