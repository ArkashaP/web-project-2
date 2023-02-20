const numList = document.getElementById('numList');
const outputNum = document.getElementById('outputValue');
const somekk = document.getElementById('listEl0');



function getRandArray(min, max) {
    min = Number(min);
    max = Number(max);
    return isNaN(min) && isNaN(max) ? NaN : Math.random() * (max - min) + min;
}

let numArray = [0];

function delElement(){
    document.getElementById(`listEl${numArray.length-1}`).remove();
    numArray.pop();
}
function addElement(){
    numArray.push(0);
    numList.insertAdjacentHTML('beforeEnd',
    `<li id="num${numArray.length-1}"><input type="number"></li>`);
}

function onSubmit() {
    somekk.remove();
}; 