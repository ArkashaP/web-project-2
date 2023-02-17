var button = document.querySelector("button");

button.addEventListener("click", function() {
    n = prompt('Значение n');
    x = prompt('Значение x');
    y = prompt('Значение y');
    
    document.body.insertAdjacentHTML(
        'beforeEnd',
        `<p>
            n = ${n}, x = ${x}, y = ${y} => ${(n%x || n%y) ? false : true}
        </p>`
    )
    console.log(`n = ${n}, x = ${x}, y = ${y} => ${(n%x || n%y) ? false : true}`);
});
