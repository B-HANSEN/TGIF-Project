var members = data.results[0].members; /// declare variable and access in js.file
var tbody = document.getElementById("house-data"); ///

function createTable(arrayMembers) {
    for (var i = 0; i < arrayMembers.length; i++) {
        var tr = document.createElement("tr");

        var lastName = arrayMembers[i].last_name; /// into members, select name IDs
        var firstName = arrayMembers[i].first_name;
        var middleName = arrayMembers[i].middle_name;
        var party = arrayMembers[i].party;
        var state = arrayMembers[i].state;
        var seniority = arrayMembers[i].seniority;
        var statePercentages = arrayMembers[i].votes_with_party_pct;
        var fullName;

        if (middleName == null) {
            fullName = `${lastName} ${firstName}`;
        } else {
            fullName = `${lastName} ${firstName} ${middleName}`;
        }
        var td_fullName = document.createElement("td"); /// create data cell              
        var td_party = document.createElement("td");
        var td_state = document.createElement("td");
        var td_seniority = document.createElement("td");
        var td_statePercentages = document.createElement("td");

        if (members[i].url != "") {
            var membersURL = document.createElement("a");
            membersURL.setAttribute("href", members[i].url);
            membersURL.innerHTML = fullName;
            membersURL.setAttribute("target", "_blank");
            td_fullName.append(membersURL);
        } else {
            td_fullName.innerHTML = fullName
        }

        /// access array and define table cells
        td_party.innerHTML = party;
        td_state.innerHTML = state;
        td_seniority.innerHTML = seniority;
        td_statePercentages.innerHTML = statePercentages + " %";

        tr.append(td_fullName, td_party, td_state, td_seniority, td_statePercentages); /// append cells to rows
        tbody.append(tr); /// append rows to body

    }
}
createTable(members);