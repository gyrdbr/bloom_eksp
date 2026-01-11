"use strict";
// 1. Primitive Types
let age = 25;
let nameId = "Alice";
let isActive = true;
let emptyValue = null;
let unassignedValue = undefined;
// 2. Special Types
let dynamicValue = 10;
dynamicValue = "Hello";
let unknownValue = "Hello";
function logMessage() {
    console.log("This is a log message.");
}
function throwError(message) {
    throw new Error(message);
}
// 3. Object Types
let user = { name: "Alice", age: 25 };
// 4. Array Types
let numbers = [1, 2, 3, 4];
let names = ["Alice", "Bob", "Charlie"];
// 5. Tuple Types
let person = ["Alice", 25];
let p1 = { x: 10, y: 20 };
let user2 = { name: "Bob", age: 30 };
// 7. Union and Intersection Types
let id = "123";
id = 456;
let employee = { name: "Alice", id: 123 };
// 8. Literal Types
let direction = "left";
// 9. Enum Types
var Color;
(function (Color) {
    Color["Red"] = "RED";
    Color["Green"] = "GREEN";
    Color["Blue"] = "BLUE";
})(Color || (Color = {}));
let color = Color.Green;
// Output
console.log(age, nameId, isActive, emptyValue, unassignedValue);
console.log(dynamicValue);
console.log(unknownValue);
logMessage();
// throwError("Something went wrong!");
console.log(user);
console.log(numbers, names);
console.log(person);
console.log(p1);
console.log(user2);
console.log(id);
console.log(employee);
console.log(direction);
console.log(color);
console.log("hello");
