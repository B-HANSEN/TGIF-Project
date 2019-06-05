// object for AT A GLANCE table
let statistics = {
    "Total": {
        NoOfReps: data.results[0].num_results,
        votedWithParty: 0,
    },
    "Independents": {
        NoOfReps: 0,
        votedWithParty: 0,
    },
    "Republicans": {
        NoOfReps: 0,
        votedWithParty: 0,
    },
    "Democrats": {
        NoOfReps: 0,
        votedWithParty: 0,
    }
}

// Write code to create and fill three variables; one for a list of Dem objects etc.
// update statistics object with the number of members in each party,
// ... e.g. for the key "Number of Democrats" replace the default value of zero with the length of the list of Democrat objects.

var arrayOfMembers = data.results[0].members; // declare variable and access in js.file that contains all members

// members by party
statistics.Democrats.NoOfReps = numberOfMembers(arrayOfMembers, "D")
statistics.Republicans.NoOfReps = numberOfMembers(arrayOfMembers, "R")
statistics.Independents.NoOfReps = numberOfMembers(arrayOfMembers, "I")

function numberOfMembers(members, letter) { // add letter code to avoid writing 3 functions
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

// console.log(statistics);


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
function forHtmlTable(object) {
    var tbody = document.getElementById("stats");
    for (let keys in object) {
        var row = tbody.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = [keys];
        cell2.innerHTML = object[keys].NoOfReps;
        cell3.innerHTML = object[keys].votedWithParty;
    }
}
forHtmlTable(statistics);


// // object for LEAST ARRAY table ************************************

// declare array with ascending and descending missed votes
var sorterAsc = [];
var sorterDesc = [];

// ascending all pct over the complete members array
function mainArrayAsc(myArray) {
    for (var i = 0; i < myArray.length; i++) {
        sorterAsc.push(myArray[i].missed_votes_pct);
    }
    sorterAsc.sort(function (a, b) {
        return a - b
    })
};
mainArrayAsc(arrayOfMembers);

// descending all pct over the complete members array
function mainArrayDesc(myArray) {
    for (var i = 0; i < myArray.length; i++) {
        sorterDesc.push(myArray[i].missed_votes_pct);
    }
    sorterDesc.sort(function (a, b) {
        return b - a
    })
};
mainArrayDesc(arrayOfMembers);

// show complete arrays sorted ascending & descending
console.log(sorterAsc);
console.log(sorterDesc);

// TODO: make a function out of it and replace missed_votes_pct; as needed for other parameters later

// for sorted array slice out TOP10%
var slicedArrayAsc = sorterAsc.slice(0, Math.round((arrayOfMembers.length * 0.1)));
console.log(slicedArrayAsc);
var slicedArrayDesc = sorterDesc.slice(0, Math.round((arrayOfMembers.length * 0.1)));
console.log(slicedArrayDesc);


// move values to html table    
function forHtmlTable1(object, tbodyId) {
    var tbody = document.getElementById(tbodyId);
    for (let keys = 0; keys < object.length; keys++) {
        console.log(object[keys].first_name)
        var row = tbody.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        if (object[keys].middle_name == null) {
            object[keys].middle_name = "";
        }
        cell1.innerHTML = `${object[keys].first_name} ${object[keys].middle_name} ${object[keys].last_name}`;
        cell2.innerHTML = object[keys].missed_votes;
        cell3.innerHTML = object[keys].missed_votes_pct;
    }
}
forHtmlTable1(slicedArray, "least-stats");
forHtmlTable1(slicedArray, "top-stats"); // why is the sorting reversed??   ** same as with statistics mapping into table --> start with row counter -1