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

// Function to delete an entry from the table and localStorage
function deleteEntry(button) {
    var tableRow = button.parentNode.parentNode;
    var tableName = tableRow.parentNode.parentNode.id;
    var itemName = tableRow.firstChild.innerHTML;

    tableRow.parentNode.removeChild(tableRow);

    if (tableName === 'personTable') {
        var storedNames = localStorage.getItem('persons');
        var names = JSON.parse(storedNames);
        var updatedNames = names.filter(function(name) {
            return name !== itemName;
        });
        localStorage.setItem('persons', JSON.stringify(updatedNames));
    } else if (tableName === 'lunchTable') {
        var storedLunches = localStorage.getItem('lunches');
        var lunches = JSON.parse(storedLunches);
        var updatedLunches = lunches.filter(function(lunch) {
            return lunch !== itemName;
        });
        localStorage.setItem('lunches', JSON.stringify(updatedLunches));
    }
}

// Function to generate random names from the table
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
        var randomIndex1 = Math.floor(Math.random() * names.length);
        var randomIndex2 = Math.floor(Math.random() * names.length);

        // Ensure the two random indexes are different
        while (randomIndex1 === randomIndex2) {
            randomIndex2 = Math.floor(Math.random() * names.length);
        }

        var randomName1 = names[randomIndex1];
        var randomName2 = names[randomIndex2];

        alert('Random Names:\n\n1. ' + randomName1 + '\n2. ' + randomName2);
    }
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