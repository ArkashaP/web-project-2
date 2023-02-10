function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

num_random = Math.floor(getRandomFloat(0, 100));

while(true){
    num_input = prompt('Угадайте число');
    console.log(`Ваше число ${num_input}`);
    if(num_input>num_random){
        console.log('Ваше число больше');
    }else if(num_input < num_random) {
        console.log('Ваше число меньше');
    } else{
        console.log('Вы угадали!');
        break;
    }
}