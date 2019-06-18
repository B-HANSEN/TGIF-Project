var ajaxloader = document.getElementById("ajaxloader");

var members;
fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
    method: "GET",
    headers: {
        'X-API-Key': 'gpxI5jMm6JWOG7WlInZOFyaKP1wTYions6uW86Dd'
    }
}).then(function (response) {
    return response.json();
}).then(function (json) {
    members = json.results[0].members;
    eventListeners();
    createDropDown();
    createTable(members);
    ajaxloader.style.display = 'none';
}).catch(function (error) {
    console.log("something went wrong");
})

var tbody = document.getElementById("house-data");
var partyCode = document.querySelectorAll(".chBox");

// access Elements in html and declare variables
dem = document.getElementById("Dems");
rep = document.getElementById("Reps");
ind = document.getElementById("Indies");

function eventListeners() {
    rep.addEventListener("click", activeBoxFn);
    ind.addEventListener("click", activeBoxFn);
    dem.addEventListener("click", activeBoxFn);
    document.getElementById("dropDownList").addEventListener("change", activeBoxFn);
}

function createTable(anyArray) {
    tbody.innerHTML = "";
    var noShow = document.getElementById("no-members")

    if (anyArray.length == 0) {
        noShow.style.display = "block"
    } else {
        noShow.style.display = "none";

        for (var i = 0; i < anyArray.length; i++) {
            var tr = document.createElement("tr");

            var lastName = anyArray[i].last_name;
            var firstName = anyArray[i].first_name;
            var middleName = anyArray[i].middle_name;
            var party = anyArray[i].party;
            var state = anyArray[i].state;
            var seniority = anyArray[i].seniority;
            var votes = anyArray[i].votes_with_party_pct;
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
}

// ******************************** CHECKBOX FILTERS *******************************
// function to identify checked boxes
function activeBoxFn() {
    var checkedValue = [];
    for (var i = 0; i < partyCode.length; i++) {
        if (partyCode[i].checked) {
            checkedValue.push(partyCode[i].value)
        }
    }
    var filteredMembersByParty = [];
    if (checkedValue.length == 0) {
        activeOptionFn(members);
    } else {
        for (var i = 0; i < members.length; i++) {
            for (var j = 0; j < checkedValue.length; j++) {
                if (checkedValue[j] == members[i].party) {
                    filteredMembersByParty.push(members[i]);
                }
            }
        }
        activeOptionFn(filteredMembersByParty);
    }
}

// ******************************** DROP-DOWN FILTERS ******************************
function activeOptionFn(anyArray) {
    var filteredMembersByState = [];
    selectValue = document.getElementById("dropDownList").value
    if (selectValue == "All States") {
        createTable(anyArray);
    } else {
        for (var i = 0; i < anyArray.length; i++) {
            if (selectValue == anyArray[i].state) {
                filteredMembersByState.push(anyArray[i])
            }
        }
        createTable(filteredMembersByState);
    }
}

// get all states from json file, put in array & create drop-down list with all states
function createDropDown() {
    var usStates = [];
    for (i = 0; i < members.length; i++) {
        if (!usStates.includes(members[i].state)) {
            usStates.push(members[i].state);
        }
    }
    usStates.sort();

    var select = document.getElementById("dropDownList");

    for (var i = 0; i < usStates.length; i++) {
        var option = document.createElement("option");
        option.text = usStates[i];
        option.value = usStates[i];
        select.append(option);
    }
}