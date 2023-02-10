function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}



async function delayedLoop() {
    while(true){
        await sleep(1000);
        //getSelection(first_p).modify();
    };
};



// #2

t_sides = [3, 2, 2];
if ((t_sides[0]+t_sides[1]>t_sides[2]) && (t_sides[1]+t_sides[2]>t_sides[0]) && (t_sides[2]+t_sides[0]>t_sides[1])){
    console.log('Не существует');
} else{
    console.log('Cуществует');
}

t_p = (t_sides[0] + t_sides[1] + t_sides[2])/3
console.log(`Периметр: ${t_p}`);
console.log(`dsd: ${ Math.sqrt( t_p * (t_p-t_sides[0]) * (t_p-t_sides[1]) * (t_p-t_sides[2]) )}`);
