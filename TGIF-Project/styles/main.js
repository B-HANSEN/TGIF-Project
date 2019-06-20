function btnFn() {
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (moreText.style.display === "none") {
        moreText.style.display = "inline";
        btnText.innerHTML = "Show less";
    } else if (moreText.style.display === "inline") {
        moreText.style.display = "none";
        btnText.innerHTML = "Show more";
    }
}

var ajaxloader = document.getElementById("ajaxloader");

var members;
var chamber;
if (window.location.href.includes("senate")) {
    getMembers("senate")
} else {
    getMembers("house")
}

function getMembers(chamber) {
    fetch("https://api.propublica.org/congress/v1/113/" + chamber + "/members.json", {
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
}

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
    var tbody = document.getElementById("tdata");
    tbody.innerHTML = "";
    var noShow = document.getElementById("no-members")

    if (anyArray.length == 0) {
        noShow.style.display = "block"
    } else {
        noShow.style.display = "none";

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
            if (anyArray[i].url != "") {
                // condition: property URL is not empty
                var membersURL = document.createElement("a");
                membersURL.setAttribute("href", anyArray[i].url);
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