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

        var td1 = document.createElement("td"); /// create data cell for last_name              
        var td2 = document.createElement("td"); /// create data cell for first_name
        var td3 = document.createElement("td"); /// create data cell for middle_name
        var td4 = document.createElement("td"); /// create data cell for middle_name
        var td5 = document.createElement("td"); /// create data cell for middle_name


        if (middleName == null) {
            var fullName = `${lastName}, ${firstName}`;
        } else {
            var fullName = `${lastName}, ${firstName}, ${middleName}`;
        }

        /// access array and define table cells
        td1.innerHTML = fullName; /// set data cell td1 with item 0 in array results, property last_name
        td2.innerHTML = party;
        td3.innerHTML = state;
        td4.innerHTML = seniority;
        td5.innerHTML = statePercentages;

        tr.append(td1, td2, td3, td4, td5); /// append cells to rows
        tbody.append(tr); /// append rows to body

    }
}
createTable(members);