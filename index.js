const sidebar = document.getElementById("sidebar");
const sidebar_el_title = document.getElementById("sidebar_sub_main");
const sidebar_el_sub = document.getElementById("sidebar_sub_el");

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

const setup_section = {
    header:"Setup Code",
    subsections:["Dependancies", "Quick Setups", "Examples"]
}

const demo_section = {
    header:"Demo Code",
    subsections:["Todo List", "Ticker"]
}

let contents = [setup_section, demo_section];

render(contents);
