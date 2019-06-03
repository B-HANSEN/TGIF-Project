// Create a new JS file that contains all statistic functionalities and instantiate an object named statistics. 
// In that object, include fields for all statistics the client requested; initialize each value to zero.

var statistics = {
    numberDems: 0,
    numberReps: 0,
    numberIndies: 0,
    avgVotesDems: 0,
    avgVotesReps: 0,
    avgVotesIndies: 0,
    missed_votesDems: 0,
    missed_votesReps: 0,
    missed_votesIndies: 0,

};

// Write code to create and fill three variables; one for a list of Dem objects etc.
// update statistics object with the number of members in each party,
// ... e.g. for the key "Number of Democrats" replace the default value of zero with the length of the list of Democrat objects.

var arrayOfMembers = data.results[0].members; // declare variable and access in js.file that contains all members

// members by party
statistics.numberDems = numberOfMembers(arrayOfMembers, "D")
statistics.numberReps = numberOfMembers(arrayOfMembers, "R")
statistics.numberIndies = numberOfMembers(arrayOfMembers, "I")

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
statistics.avgVotesDems = (sumVotes(arrayOfMembers, "D") / statistics.numberDems).toFixed(1);
statistics.avgVotesReps = (sumVotes(arrayOfMembers, "R") / statistics.numberReps).toFixed(1);
statistics.avgVotesIndies = (sumVotes(arrayOfMembers, "I") / statistics.numberIndies).toFixed(1);
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


function forHtmlTable() {
    var tbody = document.getElementById("senate-stats");

    var row = tbody.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "Democrats";
    cell2.innerHTML = statistics.numberDems;
    cell3.innerHTML = statistics.avgVotesDems + " %";

    var row = tbody.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "Republicans";
    cell2.innerHTML = statistics.numberReps;
    cell3.innerHTML = statistics.avgVotesReps + " %";

    var row = tbody.insertRow(2);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "Independents";
    cell2.innerHTML = statistics.numberIndies;
    cell3.innerHTML = statistics.avgVotesIndies + " %";
}
forHtmlTable();