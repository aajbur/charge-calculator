const charges = [
    { offense: "Armed Robbery Store", fine: 1000, jail: 10 },
    { offense: "Armed Bank Robbery", fine: 2000, jail: 15 },
    { offense: "Jewellery Robbery", fine: 3000, jail: 20 },
    { offense: "Kidnapping / Hostage", fine: 500, jail: 5 },
    { offense: "Evading a police officer", fine: 200, jail: 5 },
    { offense: "Felony Evading a Police Officer", fine: 250, jail: 5 },
    { offense: "Possession of Unregistered Weapon", fine: 300, jail: 10 },
    { offense: "Possession of Class 2 Weapon", fine: 400, jail: 15 },
    { offense: "Possession of Class 3 Weapon", fine: 800, jail: 25 },
    { offense: "Carrying a Firearm Without a License", fine: 200, jail: 5 },
    { offense: "Brandishing a Weapon", fine: 200, jail: 5 },
    { offense: "Weapons Discharge Violation", fine: 200, jail: 5 },
    { offense: "Felony Weapons Discharge Violation", fine: 200, jail: 5 },
    { offense: "Trafficking of Class 1 Weapon", fine: 2500, jail: 20 },
    { offense: "Trafficking of Class 2 Weapon", fine: 3000, jail: 30 },
    { offense: "Trafficking of Class 3 Weapon", fine: 4000, jail: 40 },
    { offense: "Assault and Battery", fine: 1000, jail: 10 },
    { offense: "Aggravated Assault and Battery", fine: 1000, jail: 10 },
    { offense: "Attempted Murder", fine: 800, jail: 10 },
    { offense: "Attempted Murder (PP)", fine: 800, jail: 10 },
    { offense: "Robbery", fine: 40, jail: 1000 },
    { offense: "Armed Robbery", fine: 800, jail: 5 },
    { offense: "Armed Robbery of a Stockade", fine: 3000, jail: 30 },
    { offense: "Criminal Threats", fine: 250, jail: 5 },
    { offense: "Criminal Threats (PP)", fine: 300, jail: 10 },
    { offense: "Display of Tactical Gear", fine: 100, jail: 5 },
    { offense: "Verbal Harassment", fine: 150, jail: 10 },
    { offense: "Bribery", fine: 500, jail: 15 },
    { offense: "Disregarding a Lawful Command", fine: 300, jail: 10 },
    { offense: "Obstruction of Justice", fine: 200, jail: 0 },
    { offense: "Possession of Extended Magazines", fine: 500, jail: 10 },
    { offense: "Possession of Silencers", fine: 500, jail: 10 },
    { offense: "Possession of a Class A Substance", fine: 500, jail: 5 },
    { offense: "Intention to Sell a Class A Substance", fine: 1500, jail: 10 },
    { offense: "Possession of a Class B Substance", fine: 200, jail: 5 },
    { offense: "Intention to Sell a Class B Substance", fine: 1000, jail: 2 },
    { offense: "Drug Trafficking a Class B Substance", fine: 1500, jail: 2 },
    { offense: "Maintaining a Place for Distribution", fine: 500, jail: 2 },
    { offense: "Sale of a Controlled Substance", fine: 200, jail: 2 },
    { offense: "Driving without a License", fine: 200, jail: 0 },
    { offense: "Speeding", fine: 150, jail: 0 },
    { offense: "Speeding (+30mph)", fine: 400, jail: 2 },
    { offense: "Traffic / Parking Violation", fine: 200, jail: 0 },
    { offense: "Hit and Run", fine: 800, jail: 2 },
];

const select = document.getElementById('offenseSelect');
const searchInput = document.getElementById('searchInput');
const tableBody = document.querySelector('#offenseTable tbody');

function populateDropdown(list) {
    select.innerHTML = '<option value="">--Select Offense--</option>';
    list.forEach(c => {
        const option = document.createElement('option');
        option.value = c.offense;
        option.textContent = c.offense;
        select.appendChild(option);
    });
}

// Initial dropdown population
populateDropdown(charges);

// Filter dropdown based on search input
function filterOffenses() {
    const query = searchInput.value.toLowerCase();
    const filtered = charges.filter(c => c.offense.toLowerCase().includes(query));
    populateDropdown(filtered);
}

// Add offense to table
function addOffense() {
    const selected = select.value;
    if (!selected) return;

    const offense = charges.find(c => c.offense === selected);

    const row = document.createElement('tr');
    row.innerHTML = `<td>${offense.offense}</td>
                     <td>${offense.fine}</td>
                     <td>${offense.jail}</td>
                     <td><span class="remove-btn" onclick="removeOffense(this)">Remove</span></td>`;
    tableBody.appendChild(row);

    updateTotals();
}

// Remove offense from table
function removeOffense(element) {
    element.parentElement.parentElement.remove();
    updateTotals();
}

// Update total fine and jail time
function updateTotals() {
    let totalFine = 0;
    let totalJail = 0;

    tableBody.querySelectorAll('tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        totalFine += parseInt(cells[1].textContent);
        totalJail += parseInt(cells[2].textContent);
    });

    document.getElementById('totalFine').textContent = totalFine;
    document.getElementById('totalJail').textContent = totalJail;
}
