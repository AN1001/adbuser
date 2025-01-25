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
    });
}

function clear(element) {
  while (element.firstChild) {
      element.removeChild(element.firstChild);
  }
}

export default generateHTML;
