function compile(file_name){
    fetch(file_name)
    .then((res) => res.text())
    .then((text) => {
        compile_text(text);
     })
    .catch((e) => console.error(e));
}

function compile_text(text){
    let compiled_text = [];
    text.split("\n").forEach(line => {
        if (line[0]==="<"){
            const tag = line.substring(1, line.indexOf('>'));
            let element = [
                tag,
                line.substring(line.indexOf('>') + 1)
            ]
            compiled_text.push(element);
        } else if(line=="") {
            compiled_text[compiled_text.length-1][1]+="\n";
        }else {
            compiled_text[compiled_text.length-1][1]+=line;
        }
    });
    console.table(compiled_text);
}

export default compile;