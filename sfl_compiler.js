function compile(file_name) {
    return fetch("files/" + file_name)
        .then((res) => {
            if (!res.ok) {
                console.error('Error: ' + res.statusText);
                return undefined; // Return undefined if fetch fails
            }
            return res.text();
        })
        .then((text) => {
            if (text === undefined) return undefined; // If text is undefined, return undefined
            return compile_text(text);
        })
        .catch((e) => {
            console.error(e);
            return undefined; // Return undefined on any other error
        });
}

function compile_text(text){
    let compiled_text = [];
    // Tokenise
    text.split("\n").forEach(line => {
        if (line[0]==="<"){
            const tag = line.substring(1, line.indexOf('>'));
            let element = [
                tag,
                line.substring(line.indexOf('>') + 1)
            ]
            compiled_text.push(element);
        } else if(line=="~"){
            //do nothing
        }else if(line=="") {
            compiled_text[compiled_text.length-1][1]+="\n";
        }else {
            compiled_text[compiled_text.length-1][1]+=line;
        }
    });

    //Compile
    compiled_text.forEach((element,index) => {
        switch(element[0]){
            case "title":
                break;
            case "text":
                let data = seperate_spans(element[1]);
                compiled_text[index][1] = data[0];
                compiled_text[index].push(data[1]);
                break;
            case "code":
                compiled_text[index][1]=(element[1]+'').split("\n")
                break;
            case "link":
                let link_data = element[1].split(",")
                compiled_text[index][1] = link_data[0];
                compiled_text[index].push(link_data[1]);
                break;
            case "table":
                let arr = element[1].slice(1, -1).split('],[').map(inner => inner.split(',').map(String));
                compiled_text[index][1] = arr;
                break;
        }
    });
    return compiled_text;
}

function seperate_spans(text) {
  const words = text.split(/\[[^\]]+\]\[[^\]]+\]/).map((part) => part.trim());
  const spans = Array.from(
    text.matchAll(/\[([^\]]+)\]\[([^\]]+)\]/g),
    (match) => ({
      content: match[1],
      styles: match[2].split(","),
    })
  );
  return [words, spans];
}

export default compile;