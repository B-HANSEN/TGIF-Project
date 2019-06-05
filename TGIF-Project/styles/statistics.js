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

// create descending array with SORTING PARAMETER (here first: all missed votes)
var sorter = [];

function mainArray(myArray) {
    for (var i = 0; i < myArray.length; i++) {
        sorter.push(myArray[i].missed_votes_pct);
    }
    sorter.sort(function (a, b) {
        return b - a
    })

    console.log(sorter);
};
mainArray(arrayOfMembers);

// TODO: make a function out of it and replace missed_votes; as needed for other parameters later
arrayOfMembers.sort((a, b) => Number(b.missed_votes_pct) - Number(a.missed_votes_pct));

console.log(arrayOfMembers[0].missed_votes_pct);
console.log(arrayOfMembers[1].missed_votes_pct);
console.log(arrayOfMembers[2].missed_votes_pct);

// for sorted array slice out TOP10%
var slicedArray = arrayOfMembers.slice(0, Math.round((arrayOfMembers.length * 0.1)));

console.log(slicedArray);
// console.log(slicedArray[0].first_name);
console.log(typeof (slicedArray[0]));


// names parameters concatenation
var fullName;
var lastName = data.results[0].members.last_name;
var firstName = data.results[0].members.first_name;
var middleName = data.results[0].members.middle_name;
if (middleName == null) {
    fullName = `${lastName} ${firstName}`;
} else {
    fullName = `${lastName} ${firstName} ${middleName}`;
}

// show other parameters
function showOtherParams(object) {
    for (var i = 0; i < object.length; i++) {
        console.log(slicedArray[i].fullName); // why not shown in console??
        console.log(slicedArray[i].missed_votes);
        console.log(slicedArray[i].missed_votes_pct);
    }
}
showOtherParams(slicedArray);



// move values to html table    
function forHtmlTable1(object) {
    var tbody = document.getElementById("top-stats");
    for (let keys in object) {
        var row = tbody.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = object[keys].fullName;
        cell2.innerHTML = object[keys].missed_votes;
        cell3.innerHTML = object[keys].missed_votes_pct;
    }
}
forHtmlTable1(slicedArray);
// why is the sorting reversed??   ** same as with statistics mapping into table