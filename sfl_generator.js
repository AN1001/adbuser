function generateHTML(data, append_to_element) {
    const mainBody = append_to_element;
    clear(mainBody);
    
    // Style definitions
    const style = document.createElement('style');
    style.textContent = `
        .genText { font-size: 16px; margin-bottom: 10px; }
        .genTitle { font-size: 34px; font-weight: bold; margin-bottom: 15px; }
        .genCode { font-family: monospace; background-color: #1e1e1e; padding: 10px; border-radius: 5px; margin-bottom: 10px; white-space: pre-wrap; }
        .bold { font-weight: bold; }
        .italics { font-style: italic; }
        .genLink { color: blue; text-decoration: underline; cursor: pointer; margin-bottom: 10px; }
        .genPicture { display: block; max-width: 100%; margin-bottom: 10px; }
    `;
    document.head.appendChild(style);

    // Generate elements
    data.forEach((entry) => {
        const [type, content, spans] = entry;

        if (type === "title") {
            const title = document.createElement('h1');
            title.className = 'genTitle';
            title.textContent = content;
            mainBody.appendChild(title);
        }

        if (type === "text") {
            const textDiv = document.createElement('div');
            textDiv.className = 'genText';

            // Merge spans into the text
            let combinedHTML = "";
            content.forEach((textSegment, index) => {
              combinedHTML += textSegment.replace(/\n/g, "<br>"); // Preserve line breaks
              if (spans && spans[index]) {
                const { content: spanContent, styles } = spans[index];
                combinedHTML += `<span class="${styles.join(
                  " "
                )}">${spanContent}</span>`;
              }
            });

            textDiv.innerHTML = combinedHTML;
            mainBody.appendChild(textDiv);
        }

        if (type === "code") {
            const codeDiv = document.createElement('pre');
            codeDiv.className = 'genCode';
            codeDiv.innerHTML = content.join('<br>');  // Replace line breaks with <br> tags

            mainBody.appendChild(codeDiv);
        }

        if (type === "link") {
            const link = document.createElement('a');
            link.className = 'genLink';
            link.href = content;
            link.textContent = content;
            link.target = '_blank'; // Opens in a new tab
            mainBody.appendChild(link);
        }

        if (type === "picture") {
            const img = document.createElement('img');
            img.className = 'genPicture';
            img.src = content;
            img.alt = 'Image';
            mainBody.appendChild(img);
        }

        if (type === "blank") {
            const blankDiv = document.createElement('div');
            blankDiv.innerHTML = '&nbsp;'; // Add a blank space
            blankDiv.style.marginBottom = '10px';
            mainBody.appendChild(blankDiv);
        }

        if (type === "list") {
            const list = document.createElement(content.type === "ordered" ? "ol" : "ul");
            list.className = 'genList';
            content.items.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item;
                list.appendChild(li);
            });
            mainBody.appendChild(list);
        }

        if (type === "table") {
            const table = document.createElement("table");
            table.className = 'genTable';
            content.forEach((row, rowIndex) => {
                const tr = document.createElement("tr");
                row.forEach((cell) => {
                    const cellElement = rowIndex === 0 ? document.createElement("th") : document.createElement("td");
                    cellElement.textContent = cell;
                    tr.appendChild(cellElement);
                });
                table.appendChild(tr);
            });
            mainBody.appendChild(table);
        }

        if (type === "blockquote") {
            const blockquote = document.createElement("blockquote");
            blockquote.className = 'genBlockquote';
            blockquote.textContent = content;
            mainBody.appendChild(blockquote);
        }



    });
}

function clear(element) {
  while (element.firstChild) {
      element.removeChild(element.firstChild);
  }
}

export default generateHTML;
