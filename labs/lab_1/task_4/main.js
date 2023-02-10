tree_lenght = 10; // Длинна дерева

function GetMultipleChars(char, count){
    result = char;
    for(i = 0; i < count; i+=1){
        result += char;
    }
    return result;
}

function BuildTreeText(){
    tree_text = '';
    for(i = 0; i < tree_lenght; i+=1){
        if (i%2) {
            tree_text += GetMultipleChars('#', i);
        } else {
            tree_text += GetMultipleChars('*', i);
        }
        tree_text += '\n';
    }
    tree_text += '||';
    return tree_text;
}

console.log(BuildTreeText());