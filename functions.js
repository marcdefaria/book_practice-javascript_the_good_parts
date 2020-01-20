// FUNCTION LITERAL
// Create a variable called add and store a function
// in it that adds 2 numbers.
// this function is given no name, therefore its name is anonymous
var add = function(a, b){
    return a + b;
}

// function object create by a function literal contains a link to that outer context (known as closure)
// Craete myobject It has a value and an increment method. The increment method takes an optional
// parameter. If the argument is not a number, then 1 is used as the default

var myObject = {
    value : 0,
    increment: function(inc) {
        this.value = typeof inc === 'number' ? inc : 1;
    }
}

myObject.increment();
console.log(myObject.value)

myObject.increment(3);
console.log(myObject.value);

myObject.double = function() {

    var that = this;

    var helper = function() {
        that.value = add(that.value, that.value);
    };

    helper();
}


// invoke double as a method

myObject.double();
console.log(myObject.value)

// create a function called Quo
// It makes an object with a status property
var Quo = function(string) {
    this.status = string;
}

// give all instances of Quo a public method called get_status
Quo.prototype.get_status = function() {
    return this.status;
}

// Make an instance of Quo
var myQuo = new Quo("confused")

console.log(myQuo.get_status()); // confused

// make a array of 2 numbers and add them
var array = [3,4];

var sum = add.apply(null, array); // sum is 7

// make an object with a status member
var statusObject = {
    status: 'A-OK'
};

// statusObject does not inherit from Quo.prototype
// but we can invoke the get_status method on statusObject even though statusObject does not have a get_status method

var status = Quo.prototype.get_status.apply(statusObject); // status is A-OK
console.log(status);

// ARGUMENTS:

// make a function that adds a lot of stuff

// note that defining the variables sum inside of the function does not interfere with the sum defined outside
// of the function. The function only sees the inner one
var sum = function() {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
}

console.log("The sum: " + sum(4,5,6,7,7,3));

// EXCEPTIONS
var add = function(a,b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers yo'
        }
    }
}

// call the new add function with invalid arguments
var try_it = function() {
    try {
        add("seven");
    } catch(e) {
        console.error(e.name + ": " + e.message);
    }
}

try_it();

// AUGMENTATION
// augmenting safety: only add a method if the method is not defined
Function.prototype.method = function(name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    }
}

// create my own version of javascripts integer() function:
Number.method('integer', function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});

console.log((10/3).integer());

// javascript lacks a trim method, lets make one:
String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '');
})

console.log('"' + "   neat   ".trim()+'"');

// RECURSION

// trivial recursive solution to the Towers of Hanoi problem:
var hanoi = function hanoi(disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc-1, src, dst, aux);
        console.log('Move disc ' + disc + ' from ' + src + ' to ' + dst);
        hanoi(disc - 1, aux, src, dst);
    }
};

hanoi(3, 'Src', 'Aux', 'Dst');
// define a walk_the_DOM function that visits every node of the tree in HTML source order, starting from some given node.
// It invokes a function, passing it each node in turn. walk_the_DOM calls itself to process each of the child nodes.

var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
}; // the rest of this function could not be implemented as I am using console not htm document to outut :(

// javascript does not optimize tail-recursion well :( as can be seen by this example:
var factorial = function factorial(i, a) {
    a = a || 1;
    if (i < 2) {
        return a;
    }
    return factorial(i - 1, a * i);
};

console.log(factorial(50));

// EXAMPLE OF JAVASCRIPTS FUNCTION SCOPE:
var foo = function() {
    var a = 3, b = 5;

    var bar = function () {
        var b = 7, c = 11;
        // At this point, a is 3, b is 7 and c is 11
        a += b + c;
        // At this point, a is 21, b is 7 and c is 11
    };
    // At this point, a is 3, b is 5 and c is not defined

    bar();
    // at this point, a is 21 and b is 5 and c is undefined as its scope is in the inner function
    console.log(a + " " + b);
}

foo();

// CLOSURE
// create a myojbect instantiated by a object literal return of a function.
// This methodology allows the variable to always be available to increment and getValue functions, but the
// function's scope is hidden from the rest of the program:
var myObject = (function() {
    var value = 0;
    return {
        increment: function (inc) {
            value += typeof inc === 'number'? inc : 1
        },
        getValue: function() {
            return value;
        }
    }
}());

// lets create a function called quo. It makes an object with a get_status method and a private status property
function quo(status) {
    return {
        getStatus: function(){
            return status;
        }
    };
};

// Make an instance of quo.
var myQuo = quo("amazed");
console.log(myQuo.getStatus()); // amazed
console.log(myQuo.status); // undefined, as the status property has function scope in the getStatus function associated with
// the quo object






