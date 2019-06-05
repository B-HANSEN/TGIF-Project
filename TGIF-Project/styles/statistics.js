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
        NoOfReps: data.results[0].num_results,
        votedWithParty: 0,
    },
}

// Write code to create and fill three variables; one for a list of Dem objects etc.
// update statistics object with the number of members in each party,
// ... e.g. for the key "Number of Democrats" replace the default value of zero with the length of the list of Democrat objects.

var arrayOfMembers = data.results[0].members; // declare variable and access in js.file that contains all members

// members by party
statistics.Democrats.NoOfReps = numberOfMembers(arrayOfMembers, "D")
statistics.Republicans.NoOfReps = numberOfMembers(arrayOfMembers, "R")
statistics.Independents.NoOfReps = numberOfMembers(arrayOfMembers, "I")

function numberOfMembers(members, letter) {
    var numberOfMembersByParty = 0;
    for (var i = 0; i < members.length; i++) {
        var membersParty = members[i].party;
        if (membersParty == letter) {
            numberOfMembersByParty++; // creating 3 different groups
        }
    }
    return numberOfMembersByParty;
}

// avg % voted with party
statistics.Democrats.votedWithParty = (sumVotes(arrayOfMembers, "D") / statistics.Democrats.NoOfReps).toFixed(2);
statistics.Republicans.votedWithParty = (sumVotes(arrayOfMembers, "R") / statistics.Republicans.NoOfReps).toFixed(2);
if (sumVotes(arrayOfMembers, "I") !== 0) {
    statistics.Independents.votedWithParty = (sumVotes(arrayOfMembers, "I") / statistics.Independents.NoOfReps).toFixed(2)
} else {
    statistics.Independents.votedWithParty = 0;
}
statistics.Total.votedWithParty = ((Number(statistics.Democrats.votedWithParty) + Number(statistics.Republicans.votedWithParty) + Number(statistics.Independents.votedWithParty)) / 3).toFixed(2);



function sumVotes(members, letter) {
    var allVotes = 0;
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == letter) {
            allVotes += members[i].votes_with_party_pct;
        }
    }
    return allVotes;
}

// move values to html table ----------- why does the sequence of the output change in HTML??? 
function forHtmlTable(anyArray, tbodyId) {
    var tbody = document.getElementById(tbodyId);
    for (let keys in anyArray) {
        var row = tbody.insertRow(-1); // senate file, it works fine. with a different ID ref. "house", 
        var cell1 = row.insertCell(0); // it deletes all data in "senate" and does not populate "house"
        var cell2 = row.insertCell(1); // error msg: statistics.js:69 Uncaught TypeError: Cannot read property 'insertRow' of null
        var cell3 = row.insertCell(2);

        cell1.innerHTML = [keys];
        cell2.innerHTML = anyArray[keys].NoOfReps;
        cell3.innerHTML = anyArray[keys].votedWithParty;
    }
}
forHtmlTable(statistics, "senate");
// forHtmlTable(statistics, "house");


// // object for LEAST ARRAY table ************************************

// declare array with ascending and descending missed votes pct
var sorterAsc = [];
var sorterDesc = [];

// ascending all pct over the complete members array
function mainArrayAsc(anyArray) {
    for (var i = 0; i < anyArray.length; i++) {
        sorterAsc.push(anyArray[i])
    }
    sorterAsc.sort(function (a, b) {
        return a["missed_votes_pct"] - b["missed_votes_pct"]
    })
};
mainArrayAsc(arrayOfMembers);

// descending all pct over the complete members array
function mainArrayDesc(anyArray) {
    for (var i = 0; i < anyArray.length; i++) {
        sorterDesc.push(anyArray[i]);
    }
    sorterDesc.sort(function (a, b) {
        return b["missed_votes_pct"] - a["missed_votes_pct"]
    })
};
mainArrayDesc(arrayOfMembers);

// show complete arrays sorted ascending & descending
console.log(sorterAsc);

// ++++++ TODO: make a function out of it and replace missed_votes_pct; as needed for other parameters later ++++++

// for sorted array slice out TOP10%
var slicedArrayAsc = sorterAsc.slice(0, Math.round((arrayOfMembers.length * 0.1)));
console.log(slicedArrayAsc);
var slicedArrayDesc = sorterDesc.slice(0, Math.round((arrayOfMembers.length * 0.1)));
console.log(slicedArrayDesc);


// move values to html tables
function forHtmlTable1(anyArray, tbodyId) {
    var tbody = document.getElementById(tbodyId);
    for (var k = 0; k < anyArray.length; k++) {
        var row = tbody.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        if (anyArray[k].middle_name == null) {
            anyArray[k].middle_name = "";
        }
        cell1.innerHTML = `${anyArray[k].first_name} ${anyArray[k].middle_name} ${anyArray[k].last_name}`;
        cell2.innerHTML = anyArray[k].missed_votes;
        cell3.innerHTML = anyArray[k].missed_votes_pct;
    }
}
forHtmlTable1(slicedArrayAsc, "least");
forHtmlTable1(slicedArrayDesc, "top");

forHtmlTable1(slicedArrayAsc, "h_least"); // does not populate html.tables but here, the senate file stays as is
forHtmlTable1(slicedArrayDesc, "h_top");