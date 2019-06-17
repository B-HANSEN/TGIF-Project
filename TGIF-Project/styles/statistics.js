var ajaxloaxder = document.getElementById("ajaxloader");

var members;


if (window.location.href.includes("senate")) {
    getData("senate")
} else {
    getData("house")

}


function getData(chamber) {
    fetch("https://api.propublica.org/congress/v1/113/" + chamber + "/members.json", {
        method: "GET",
        headers: {
            'X-API-Key': 'gpxI5jMm6JWOG7WlInZOFyaKP1wTYions6uW86Dd'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        members = json.results[0].members;
        num_results = json.results[0].num_results;
        countMembers();
        votedByParty();
        forHtmlTable(statistics, "glanceTable");
        ascArray();
        descArray()
        createTables();
        ajaxloader.style.display = 'none';
    }).catch(function (error) {
        console.log("something went wrong");
    })

}


// object for AT A GLANCE table
let statistics = {
    "Democrats": {
        NoOfReps: 0,
        votedWithParty: 0,
    },
    "Republicans": {
        NoOfReps: 0,
        votedWithParty: 0,
    },
    "Independents": {
        NoOfReps: 0,
        votedWithParty: 0,
    },
    "Total": {
        // NoOfReps: data.results[0].num_results,
        NoOfReps: 0,
        votedWithParty: 0,
    },
}


// Write code to create and fill three variables; one for a list of Dem objects etc.
// update statistics object with the number of members in each party,
// ... e.g. for the key "Number of Democrats" replace the default value of zero with the length of the list of Democrat objects.


// members by party
function countMembers() {
    statistics.Democrats.NoOfReps = numberOfMembers(members, "D")
    statistics.Republicans.NoOfReps = numberOfMembers(members, "R")
    statistics.Independents.NoOfReps = numberOfMembers(members, "I")
    statistics.Total.NoOfReps = numberOfMembers(members, "D") + numberOfMembers(members, "R") + numberOfMembers(members, "I")
}

function numberOfMembers(anyArray, letter) {
    var numberOfMembersByParty = 0;
    for (var i = 0; i < anyArray.length; i++) {
        var membersParty = anyArray[i].party;
        if (membersParty == letter) {
            numberOfMembersByParty++;
        }
    }
    return numberOfMembersByParty;
}

// avg % voted with party
function votedByParty() {
    statistics.Democrats.votedWithParty = (sumVotes(members, "D") / statistics.Democrats.NoOfReps).toFixed(2);
    statistics.Republicans.votedWithParty = (sumVotes(members, "R") / statistics.Republicans.NoOfReps).toFixed(2);
    if (sumVotes(members, "I") !== 0) {
        statistics.Independents.votedWithParty = (sumVotes(members, "I") / statistics.Independents.NoOfReps).toFixed(2)
    } else {
        statistics.Independents.votedWithParty = 0;
    }
    statistics.Total.votedWithParty = ((sumVotes(members, "D") + sumVotes(members, "R") + sumVotes(members, "I")) /
        (statistics.Democrats.NoOfReps + statistics.Republicans.NoOfReps + statistics.Independents.NoOfReps)).toFixed(2);
}


function sumVotes(anyArray, letter) {
    var allVotes = 0;
    for (var i = 0; i < anyArray.length; i++) {
        if (anyArray[i].party == letter) {
            allVotes += anyArray[i].votes_with_party_pct;
        }
    }
    return allVotes;
}

// move values to html table
function forHtmlTable(anyArray, tbodyId) {
    var tbody = document.getElementById(tbodyId);
    for (let keys in anyArray) {
        var row = tbody.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = [keys];
        cell2.innerHTML = anyArray[keys].NoOfReps;
        cell3.innerHTML = anyArray[keys].votedWithParty;
    }
}

// *********************************************************************************************************************

var sorterAsc = [];
var sorterDesc = [];

// ascending all pct over the complete members array
function ascArray() {
    function mainArrayAsc(anyArray, criterion) {
        var perc = Math.round((anyArray.length * 0.1));
        anyArray.sort(function (a, b) {
            return a[criterion] - b[criterion];
        });
        sorterAsc = anyArray.slice(0, perc);

        for (var i = perc; i < anyArray.length; i++) {
            if (sorterAsc[perc - 1][criterion] == anyArray[i][criterion]) {
                sorterAsc.push(anyArray[i]);
            } else {
                break
            }
        }
    }
    if (document.URL.includes("attendance")) {
        mainArrayAsc(members, "missed_votes_pct")
    } else {
        mainArrayAsc(members, "votes_with_party_pct")
    }
}

// descending all pct over the complete members array
function descArray() {
    function mainArrayDesc(anyArray, criterion) {
        var perc = Math.round((anyArray.length * 0.1));
        anyArray.sort(function (a, b) {
            return b[criterion] - a[criterion]
        });
        sorterDesc = anyArray.slice(0, perc);

        for (var i = 0; i < anyArray.length; i++) {
            if (sorterDesc[perc - 1][criterion] == anyArray[i][criterion]) {
                sorterDesc.push(anyArray[i]);
            } else {
                break
            }
        }
    }
    console.log(sorterDesc);
    for (var i = 0; i < sorterDesc.length; i++) {
        if (sorterDesc[sorterDesc.length - 1][criterion] === anyArray[i][criterion]) {
            sorterDesc = sorterDesc.push(anyArray[i])
        } else {
            break
        }
    }
    console.log(sorterDesc);
    if (document.URL.includes("attendance")) {
        mainArrayDesc(members, "missed_votes_pct")
    } else {
        mainArrayDesc(members, "votes_with_party_pct")
    }
}

// move values to html tables
function createTables() {
    function forHtmlTable1(anyArray, tbodyId) {
        var tbody = document.getElementById(tbodyId);
        for (var i = 0; i < anyArray.length; i++) {
            var row = tbody.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            if (anyArray[i].middle_name == null) {
                anyArray[i].middle_name = "";
            }
            cell1.innerHTML = `${anyArray[i].first_name} ${anyArray[i].middle_name} ${anyArray[i].last_name}`;
            cell2.innerHTML = anyArray[i].missed_votes;
            cell3.innerHTML = anyArray[i].missed_votes_pct;
        }
    }

    function forHtmlTable2(anyArray, tbodyId) {
        var tbody = document.getElementById(tbodyId);
        for (var i = 0; i < anyArray.length; i++) {
            var row = tbody.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            if (anyArray[i].middle_name == null) {
                anyArray[i].middle_name = "";
            }
            cell1.innerHTML = `${anyArray[i].first_name} ${anyArray[i].middle_name} ${anyArray[i].last_name}`;
            cell2.innerHTML = anyArray[i].total_votes;
            cell3.innerHTML = anyArray[i].votes_with_party_pct;
        }
    }
    if (document.URL.includes("attendance")) {
        forHtmlTable1(sorterDesc, "least");
        forHtmlTable1(sorterAsc, "top");
    } else {
        forHtmlTable2(sorterAsc, "leastloyalty");
        forHtmlTable2(sorterDesc, "toployalty");
    }
}