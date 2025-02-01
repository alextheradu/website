let name = "hi";
console.log(name);


let minusButton = document.getElementById("minus-button");

let counter = document.getElementById("number-counter");

let plusButton = document.getElementById("plus-button");

let count = 0;

function minusClick(){
    count--;
    console.log(count);
    updateText();
}
function plusClick(){
    count++;
    console.log(count);
    updateText();
}
function updateText(){
    counter.innerHTML = count;
}