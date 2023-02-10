a = 3;
b = 4;
c = 6;

if ((a+b<c) || (b+c<a) || (c+a<b)){
    console.log('Не существует');
} else{
    console.log('Cуществует');
}

ph = (a + b + c)/2;
console.log(`Периметр: ${ph}`);
console.log(`Площадь: ${ Math.sqrt( ph * (ph-a) * (ph-b) * (ph-c) ) }`);
