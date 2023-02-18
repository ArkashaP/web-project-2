function getMultipleChars(char, count){
    let result = char;
    for(i = 0; i < count; i+=1){
        result += char;
    }
    return result;
}
function BuildTreeText(tree_lenght){
    let tree_text = '';
    for(i = 0; i < tree_lenght; i+=1){
        if (i%2) {
            tree_text += getMultipleChars('#', i);
        } else {
            tree_text += getMultipleChars('*', i);
        }
        tree_text += '\n';
    }
    tree_text += '||';
    return tree_text;
}
const button = document.querySelector("button");
button.addEventListener("click", function() {
    num = prompt('Длинна дерева'); // Длинна дерева
    console.log(BuildTreeText(num));
});