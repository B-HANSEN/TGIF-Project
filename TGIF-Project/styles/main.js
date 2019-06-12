var arrayOfMembers = data.results[0].members; // declare variable and access in js.file that contains all members
var tbody = document.getElementById("senate-data"); // connect variable with ID in HTML

// document.getElementById("myBtn").addEventListener("click", myFunction);

// function myFunction() {
//   document.getElementById("demo").innerHTML = "Hello World";
// }

function createTable(anyArray) {
  tbody.innerHTML = "";
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
    if (arrayOfMembers[i].url != "") {
      // condition: property URL is not empty
      var membersURL = document.createElement("a");
      membersURL.setAttribute("href", arrayOfMembers[i].url);
      membersURL.setAttribute("target", "_blank"); /// open a new browser tab
      td_fullName.append(membersURL);
      membersURL.innerHTML = fullName; /// declare available URL and set equal with fullName...
    } else {
      td_fullName.innerHTML = fullName; /// ... show fullName if/ if no URL available
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

// create array by party; initialise
var partyDems = [];
var partyReps = [];
var partyIndies = [];

sorterFunction(arrayOfMembers);

// function to create array per party
function sorterFunction(anyArray) {
  for (var i = 0; i < anyArray.length; i++) {
    if (anyArray[i].party == "D") {
      partyDems.push(anyArray[i]);
    } else if (anyArray[i].party == "R") {
      partyReps.push(anyArray[i]);
    } else if (anyArray[i].party == "I") {
      partyIndies.push(anyArray[i]);
    }
  }
}

// access Elements in html and declare variables
dem = document.getElementById("Dems");
rep = document.getElementById("Reps");
ind = document.getElementById("Indies");

// add EventListeners to variables
rep.addEventListener("click", function() {
  combineArrays();
});
ind.addEventListener("click", function() {
  combineArrays();
});
dem.addEventListener("click", function() {
  combineArrays();
});

// declare combined arrays with different party combinations
var partyDemsInds = partyDems.concat(partyIndies);
var partyDemsReps = partyDems.concat(partyReps);
var partyIndReps = partyIndies.concat(partyReps);

// function that checks if chechbox is checked and invoke createTable function
function combineArrays() {
  for (i = 0; i < arrayOfMembers.length; i++) {
    if (rep.checked && dem.checked && ind.checked) {
      createTable(arrayOfMembers);
    } else if (dem.checked && ind.checked) {
      createTable(partyDemsInds);
    } else if (dem.checked && rep.checked) {
      createTable(partyDemsReps);
    } else if (ind.checked && rep.checked) {
      createTable(partyIndReps);
    } else if (ind.checked) {
      createTable(partyIndies);
    } else if (dem.checked) {
      createTable(partyDems);
    } else if (rep.checked) {
      createTable(partyReps);
    } else {
      createTable(arrayOfMembers);
    }
  }
}

// dem.addEventListener("click", function () {
//     createTable(partyDems);
// })
// rep.addEventListener("click", function () {
//     createTable(partyReps);
// })
// ind.addEventListener("click", function () {
//     createTable(partyIndies);
// })

// var coffee = document.forms[0];
// var txt = "";
// var i;
// for (i = 0; i < coffee.length; i++) {
//   if (coffee[i].checked) {
//     txt = txt + coffee[i].value + " ";
//   }
// }
// document.getElementById("order").value = "You ordered a coffee with: " + txt;

// x.addEventListener("click", myFunction);
// y.addEventListener("click", myFunction);
// z.addEventListener("click", myFunction);

// access IDs in HTML and define variables
// x = document.getElementById("Dems").addEventListener("click", myFunction);
// y = document.getElementById("Reps").addEventListener("click", myFunction);
// z = document.getElementById("Indies").addEventListener("click", myFunction);

// document.addEventListener("click", function () {
//     myFunction(p1, p2);
// });

// function myFunction() {
//     if (x.addEventListener("click", createTable(partyDems)) createTable(partyDems)
//     }
//     else if (z) {
//         createTable(partyIndie)
//     }
// }
// myFunction();

// function myFunction() {
//     if (x) {
//     } else if (y) {
//         createTable(partyDems)
//     } else if (z) {
//         createTable(partyIndie)
//     }
// }

// if (document.URL.includes("attendance")) {
//     mainArrayAsc(arrayOfMembers, "missed_votes_pct")
// } else {
//     mainArrayAsc(arrayOfMembers, "votes_with_party_pct")
// }

// document.getElementById("myBtn").addEventListener("click", myFunction);

// function myFunction() {
//   document.getElementById("demo").innerHTML = "Hello World";
//
