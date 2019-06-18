console.log(1);

let data;

fetch("info.json") // put in http
    .then(function (response) {
        return response.json();
    })
    .then(function (finalJson) {
        console.log(finalJson);
        data = finalJson;
        printData(); // function calls must be inserted here
    })
    .catch(function () {
        console.log("bad luck")
    });



function printData() {
    console.log(data);
}

console.log(3);

// link html, change something, remove script
// only function codes in the fetch, function calls must be inside
// at the end: fetch("http://......"), API key

// let fixed version of var
// call function inside the fetch to consider the timing (in ms) of the code run, synchronous

// promise: object that happens or not
// 3 states: pending, success, no success

// hoisting: all var, fn are moved to top of the file
// const: never changing variable

// next week: asynch, await