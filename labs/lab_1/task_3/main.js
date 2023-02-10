num = prompt('Введите число');
for(i = 0; i <= num; i += 1){
    document.body.insertAdjacentHTML("beforeEnd", "<p>")
    if(i % 5 || i == 0){
        if(i % 2){
            console.log(`${i} fizz`);
            document.body.insertAdjacentText('beforeEnd',`${i} fizz`);
        }else{
            console.log(`${i} buzz`);
            document.body.insertAdjacentText('beforeEnd',`${i} buzz`);
        }
    }else{
        console.log(`${i} fizz buzz`);
        document.body.insertAdjacentText('beforeEnd',`${i} fizz buzz`);
    }
    
}