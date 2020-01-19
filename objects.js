var empty_object = {};

// object literal example
var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard",
    "nick-name": "poes"
};

// OBJECT-LITERALS:
// objects can nest
var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-18",
        city: "Cape Town"
    },
    arrival: {
        IATA: "SYD",
        time: "2004-09-19",
        city: "London"
    }
}

// retrieving object values:
flight.departure.city // "Cape Town"
flight["status"] // undefined

// || can be used to fill in defaults:
var middle = stooge["middle-name"] || "(none)";

// PROTOTYPING
if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}
var another_stooge = Object.create(stooge)
another_stooge["first-name"] = "Mary";

console.log(another_stooge);
console.log(typeof another_stooge.first_name);

console.log(flight.hasOwnProperty('arrival'));
console.log(flight.hasOwnProperty('constructor'));

var name;
for (name in another_stooge) {
    if (typeof another_stooge[name] !== 'function') {
        console.log(name + ': ' + another_stooge[name]);
    }
}

another_stooge['nick-name'] = "Your";

console.log(another_stooge['nick-name']);
delete another_stooge['nick-name'];
console.log(another_stooge['nick-name']);
