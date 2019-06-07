var arrayOfMembers = data.results[0].members; // declare variable and access in js.file that contains all members
var tbody = document.getElementById("senate-data"); // connect variable with ID in HTML

function createTable(anyArray) {
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
        if (arrayOfMembers[i].url != "") { // condition: property URL is not empty
            var membersURL = document.createElement("a");
            membersURL.setAttribute("href", arrayOfMembers[i].url);
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
createTable(arrayOfMembers);


// ********** working with checkboxes and filters **********

// if change names of html element ids to match your variable names, can avoid using getElementById part

var chbox = document.getElementById('selections');
var x = document.getElementById('senate-data');

chbox.addEventListener('click', myFunction);

function myFunction() {
    if (x.style.display === 'none') {
        x.style.display = 'table-row-group';
    } else {
        x.style.display = 'none';
    }
}



// function myFunction() {
//     var x = document.getElementById('myDIV');
//     if (x.style.display === 'none') {
//       x.style.display = 'block';
//     } else {
//       x.style.display = 'none';
//     }
//   }

// if (chbox.checked) {
//     x.style.display = 'none';
// } else {
//     x.style.display = 'initial';
// }
// }

// people = [{
//             name: 'John',
//             filters: [R]
//         }
// if select Dems in checkbox, show Dems / hide R / I