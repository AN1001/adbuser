import compile from "./sfl_compiler.js"
import generateHTML from "./sfl_generator.js"
import contents from "./sections.js";

const sidebar = document.getElementById("sidebar");
const sidebar_el_title = document.getElementById("sidebar_sub_main");
const sidebar_el_sub = document.getElementById("sidebar_sub_el");
const main_area = document.getElementById("main-area");

sidebar.addEventListener("click", function(e){
    if(e.target.id.includes("-")){
        set_active(e.target.id);
    }
})

function create_sidebar_el(el_data, index){
    let sidebarEl = document.createElement('div');
    sidebarEl.className = 'sidebar-el';
    let sidebar_clone = sidebar_el_title.content.cloneNode(true);
    sidebar_clone.querySelector(".main-title").innerHTML = el_data.header;
    sidebar_clone.querySelector(".mini-title").innerHTML = `Section ${index+1}`;
    sidebarEl.append(sidebar_clone);

    el_data.subsections.forEach((element, sub_index) => {
        let sidebar_sub_clone = sidebar_el_sub.content.cloneNode(true);
        sidebar_sub_clone.querySelector(".main-title").innerHTML = element;

        sidebar_sub_clone.querySelector(".sidebar-sub-el").id = `${index}-${sub_index}`;
        sidebarEl.append(sidebar_sub_clone);
    });

    sidebar.appendChild(sidebarEl);
}

function render(sections){
    sections.forEach((element,index) => {
        create_sidebar_el(element, index);
    });
}

function set_active(new_tab){
    document.getElementById(current_active_tab).classList.remove("active");
    current_active_tab = new_tab;
    updateHTML(current_active_tab);
    document.getElementById(new_tab).classList.add("active");
}

var current_active_tab = "0-0"

render(contents);
set_active(current_active_tab);

document.querySelectorAll('span').forEach(span => {
    span.addEventListener('click', function() {
        this.parentElement.parentElement.click();
    });
});

async function render_html(fname){
    try{
        const data = await compile(fname);
        console.log(data)
        generateHTML(data, main_area);
    }
    catch(e){
        console.log(e);
        const data = await compile("ERROR.sfl");
        generateHTML(data, main_area);
    }

}

function updateHTML(current_active_tab){
    let section_number = parseInt(current_active_tab.split("-")[0]);
    let tab_number = parseInt(current_active_tab.split("-")[1]);
    render_html(contents[section_number].subsection_file_names[tab_number]);
}

updateHTML(current_active_tab);