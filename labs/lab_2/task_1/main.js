const button = document.querySelector("button");

function convertSpeed(speedNum, speedType){
    switch(speedType){
        case 'KMHtoMS': 
            return speedNum * 1000 / 3600;
        case 'MStoKMH': 
            return speedNum / 1000 * 3600;
            break;
        default:
            return 'Реализации такого типа не существует';
    }
}


button.addEventListener("click", function() {
    
});
