var members = data.results[0].members; // declare variable and access in js.file that contains all members
var tbody = document.getElementById("senate-data"); // connect variable with ID in HTML

function createTable(arrayMembers) {
    for (var i = 0; i < arrayMembers.length; i++) {
        // CREATE item in HTML
        var tr = document.createElement("tr");

        // define variables and access from properties from json table
        var lastName = arrayMembers[i].last_name;
        var firstName = arrayMembers[i].first_name;
        var middleName = arrayMembers[i].middle_name;
        var party = arrayMembers[i].party;
        var state = arrayMembers[i].state;
        var seniority = arrayMembers[i].seniority;
        var votes = arrayMembers[i].votes_with_party_pct;
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
        if (members[i].url != "") { // condition: property URL is not empty
            var membersURL = document.createElement("a");
            membersURL.setAttribute("href", members[i].url);
            membersURL.setAttribute("target", "_blank"); /// open a new browser tab
            td_fullName.append(membersURL);
            membersURL.innerHTML = fullName; /// declare available URL and set equal with fullName...
        } else {
            td_fullName.innerHTML = fullName /// ... show fullName if/ if no URL available
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
createTable(members);