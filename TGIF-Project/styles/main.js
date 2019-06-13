var arrayOfMembers = data.results[0].members; // declare variable and access in js.file that contains all members
var tbody = document.getElementById("senate-data"); // connect variable with ID in HTML

function createTable(anyArray) {
    tbody.innerHTML = "";
    for (var i = 0; i < anyArray.length; i++) {
        // CREATE item in HTML
        var tr = document.createElement("tr");

        // define variables and access from properties from json table
        var lastName = anyArray[i].last_name;
        var firstName = anyArray[i].first_name;
        var middleName = anyArray[i].middle_name;
        var party = anyArray[i].party;
        var state = anyArray[i].state;
        var seniority = anyArray[i].seniority;
        var votes = anyArray[i].votes_with_party_pct;
        var fullName;

        // define new variable fullName, in case there is a middle name Y/N
        if (middleName == null) {
            fullName = `${lastName} ${firstName}`;
        } else {
            fullName = `${lastName} ${firstName} ${middleName}`;
        }

        // creation of table data
        var td_fullName = document.createElement("td");
        var td_party = document.createElement("td");
        var td_state = document.createElement("td");
        var td_seniority = document.createElement("td");
        var td_votes = document.createElement("td");

        // link to website if available; keep text fullName if not available
        if (arrayOfMembers[i].url != "") {
            // condition: property URL is not empty
            var membersURL = document.createElement("a");
            membersURL.setAttribute("href", arrayOfMembers[i].url);
            membersURL.setAttribute("target", "_blank"); /// open a new browser tab
            td_fullName.append(membersURL);
            membersURL.innerHTML = fullName; /// declare available URL and set equal with fullName...
        } else {
            td_fullName.innerHTML = fullName; /// ... show fullName if/ if no URL available
        }

        // assign values to table data
        td_party.innerHTML = party;
        td_state.innerHTML = state;
        td_seniority.innerHTML = seniority;
        td_votes.innerHTML = votes + " %";

        // append cells to rows; then append rows to body
        tr.append(td_fullName, td_party, td_state, td_seniority, td_votes);
        tbody.append(tr);
    }
}
createTable(arrayOfMembers);

// ********** CHECKBOX FILTERS **********

// access Elements in html and declare variables
dem = document.getElementById("Dems");
rep = document.getElementById("Reps");
ind = document.getElementById("Indies");

// add EventListeners to variables
rep.addEventListener("click", activeBoxFn);
ind.addEventListener("click", activeBoxFn);
dem.addEventListener("click", activeBoxFn);

var partyCode = document.querySelectorAll(".chBox");

// function to identify checked boxes and show all if all unchecked; create table with values from selected checkboxes
function activeBoxFn() {
    var checkedValue = [];
    for (var i = 0; i < partyCode.length; i++) {
        if (partyCode[i].checked) {
            checkedValue.push(partyCode[i].value)
        }
    }
    if (checkedValue.length == 0) {
        createTable(arrayOfMembers)
    } else {
        partyFilter(checkedValue);
    }
}

// invoke in case at least one checkbox checked
// run thru complete array and the selected checkbox array; check whichever member fulfils the checkbox condition...
/// ... and push into new array which will be executed in the createTable function

function partyFilter(checkedValue) {
    var filteredMembers = [];
    for (i = 0; i < arrayOfMembers.length; i++) {
        for (j = 0; j < checkedValue.length; j++) {
            if (checkedValue[j] == arrayOfMembers[i].party) {
                filteredMembers.push(arrayOfMembers[i]);
            }
        }
    }
    createTable(filteredMembers);
}

// ******************************** DROP-DOWN FILTERS ********************************

// create drop-down list in HTML    
var usStates = [];
for (i = 0; i < arrayOfMembers.length; i++) {
    if (!usStates.includes(arrayOfMembers[i].state)) {
        usStates.push(arrayOfMembers[i].state);
        usStates.sort();
    }
}
console.log(usStates);

// create drop-down list
var select = document.getElementById("dropDownList");
var members = usStates;

for (var i = 0; i < members.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("dropDownList", members[i]);
    option.text = members[i];
    select.appendChild(option);
}


// create eventListener 
var dropListItems = document.getElementById("dropDownList")
dropListItems.addEventListener("change", activeOptionFn);

var stateCode = document.querySelectorAll(".usStates");

function newFunction() {
    sort(usStates);
}

// function to identify active selections and show all if all unchecked; create table with values from selected checkboxes
function activeOptionFn() {
    var checkedState = [];
    for (var i = 0; i < stateCode.length; i++) {
        if (stateCode[i].checked) {
            checkedState.push(stateCode[i].value)
        }
    }
    if (checkedState.length == 0) {
        createTable(arrayOfMembers)
    } else {
        stateFilter(checkedState);
    }
}

// invoke in case at least one checkbox checked
// run thru complete array and the selected checkbox array; check whichever member fulfils the checkbox condition...
/// ... and push into new array which will be executed in the createTable function

function stateFilter(checkedState) {
    var filteredStates = [];
    for (i = 0; i < arrayOfMembers.length; i++) {
        for (j = 0; j < checkedState.length; j++) {
            if (checkedState[j] == arrayOfMembers[i].state) {
                filteredStates.push(arrayOfMembers[i]);
            }
        }
    }
    createTable(filteredStates);
}