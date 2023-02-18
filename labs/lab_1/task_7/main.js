var button = document.querySelector("button");

button.addEventListener("click", function() {
    month = prompt('Введите месяц (0-12)');
    if(month<=0 || month>12 || isNaN(month)) {
        document.body.insertAdjacentHTML(
            'beforeEnd',
            `<p>Месяц ${month} => Число должно быть от 0 до 12</p>`
        )
        console.log('Число должно быть от 0 до 12');
        return;
    };
    document.body.insertAdjacentHTML(
        'beforeEnd',
        `<p>Месяц ${month} => ${Math.ceil(month/3)} квартал</p>`
    )
    console.log(`Месяц ${month} => ${Math.ceil(month/3)} квартал`);
});
