// In that object, include fields for all statistics the client requested; initialize each value to zero.

// Create a new JS file that contains all statistic functionalities and instantiate an object named statistics. 
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
statistics.Independents.votedWithParty = (sumVotes(arrayOfMembers, "I") / statistics.Independents.NoOfReps).toFixed(2);
statistics.Total.votedWithParty = ((Number(statistics.Democrats.votedWithParty) + Number(statistics.Republicans.votedWithParty) + Number(statistics.Independents.votedWithParty)) / 3).toFixed(2);
console.log(statistics);

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
    var tbody = document.getElementById("senate-stats");
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


// object for LEAST ARRAY table ************************************
var missedVotes = {
    fullName: 0,
    percentageVotes: 0
}

// concatenate names parameters to fullName
var lastName = data.results[0].members.last_name;
var firstName = data.results[0].members.first_name;
var middleName = data.results[0].members.middle_name;

if (middleName == null) {
    fullName = `${lastName} ${firstName}`;
} else {
    fullName = `${lastName} ${firstName} ${middleName}`;
}
console.log(data.results[0].members[0].last_name);


missedVotes = fillMissedVotesArray(arrayOfMembers);

function fillMissedVotesArray(abc) {
    missed_votes = data.results[0].members.missed_votes;;
    for (var i = 0; i < abc.length; i++) {
        missedVotes.push(missed_votes[i]);
        // .sort();
    }
}
console.log(fillMissedVotesArray(arrayOfMembers));



// missedVotes[j] = {
//     fullName: ["x"],
//     percentage: ["y"]
// };




// stats1.noMissedVotes = numberOfMissedVotes(arrayOfMembers);
// stats1.percentageMissed = percOfMissedVotes(arrayOfMembers);

// function numberOfMissedVotes(members) {
//     var noMissedVotes = 0;
//     for (var i = 0; i < members.length; i++) {
//         noMissedVotes += members[i].missed_votes;
//     }
//     return noMissedVotes;
// }
// console.log(numberOfMissedVotes(arrayOfMembers));


// function percOfMissedVotes(members) {
//     var percMissedVotes = 0;
//     for (var i = 0; i < members.length; i++) {
//         percMissedVotes += members[i].missed_votes_pct;
//     }
//     return percMissedVotes;
// }
// console.log(percOfMissedVotes(arrayOfMembers));