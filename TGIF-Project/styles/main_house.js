var members = data.results[0].members;
var tbody = document.getElementById("house-data");

function createTable(anyArray) {
    for (var i = 0; i < anyArrayMembers.length; i++) {
        var tr = document.createElement("tr");

        var lastName = arrayMembers[i].last_name;
        var firstName = arrayMembers[i].first_name;
        var middleName = arrayMembers[i].middle_name;
        var party = arrayMembers[i].party;
        var state = arrayMembers[i].state;
        var seniority = arrayMembers[i].seniority;
        var votes = arrayMembers[i].votes_with_party_pct;
        var fullName;

        if (middleName == null) {
            fullName = `${lastName} ${firstName}`;
        } else {
            fullName = `${lastName} ${firstName} ${middleName}`;
        }

        var td_fullName = document.createElement("td");
        var td_party = document.createElement("td");
        var td_state = document.createElement("td");
        var td_seniority = document.createElement("td");
        var td_votes = document.createElement("td");

        if (members[i].url != "") {
            var membersURL = document.createElement("a");
            membersURL.setAttribute("href", members[i].url);
            membersURL.innerHTML = fullName;
            membersURL.setAttribute("target", "_blank");
            td_fullName.append(membersURL);
        } else {
            td_fullName.innerHTML = fullName
        }

        td_party.innerHTML = party;
        td_state.innerHTML = state;
        td_seniority.innerHTML = seniority;
        td_votes.innerHTML = votes + " %";

        tr.append(td_fullName, td_party, td_state, td_seniority, td_votes);
        tbody.append(tr);
    }
}
createTable(members);


// ********** working with checkboxes and filters **********

// create array by party; initialise
var partyDems = [];
var partyReps = [];
var partyIndies = [];

// function to create array per party
function sorterFunction(anyArray) {
    for (var i = 0; i < anyArray.length; i++) {
        if (anyArray[i].party == "D") {
            partyDems.push(anyArray[i]);
        } else if (anyArray[i].party == "R") {
            partyReps.push(anyArray[i]);
        } else if (anyArray[i].party == "I") {
            partyIndies.push(anyArray[i]);
        }
    }
}
sorterFunction(arrayOfMembers);


// access Elements in html and declare variables
dem = document.getElementById("Dems");
rep = document.getElementById("Reps");
ind = document.getElementById("Indies");

// add EventListeners to variables
rep.addEventListener("click", function () {
    combineArrays();
});
ind.addEventListener("click", function () {
    combineArrays();
});
dem.addEventListener("click", function () {
    combineArrays();
});

// declare combined arrays with different party combinations
var partyDemsInds = partyDems.concat(partyIndies);
var partyDemsReps = partyDems.concat(partyReps);
var partyIndReps = partyIndies.concat(partyReps);

// function that checks if chechbox is checked and invoke createTable function
function combineArrays() {
    for (i = 0; i < arrayOfMembers.length; i++) {
        if (rep.checked && dem.checked && ind.checked) {
            createTable(arrayOfMembers);
        } else if (dem.checked && ind.checked) {
            createTable(partyDemsInds);
        } else if (dem.checked && rep.checked) {
            createTable(partyDemsReps);
        } else if (ind.checked && rep.checked) {
            createTable(partyIndReps);
        } else if (ind.checked) {
            createTable(partyIndies);
        } else if (dem.checked) {
            createTable(partyDems);
        } else if (rep.checked) {
            createTable(partyReps);
        } else {
            createTable(arrayOfMembers);
        }
    }
}