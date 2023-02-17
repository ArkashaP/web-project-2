function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}



async function delayedLoop() {
    while(true){
        await sleep(1000);
        //getSelection(first_p).modify();
    };
};
