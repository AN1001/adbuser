contents = {
    header:"Setup Code",
    subsections:["Extra Dependancies", "Quick Setups", "Examples"]
}

sidebar = document.getElementById("sidebar");
sidebar_el_title = document.getElementById("sidebar_sub_main");
sidebar_el_sub = document.getElementById("sidebar_sub_el");

create_sidebar_el(contents);


function create_sidebar_el(el_data){
    let sidebarEl = document.createElement('div');
    sidebarEl.className = 'sidebar-el';
    let sidebar_clone = sidebar_el_title.content.cloneNode(true);
    sidebar_clone.querySelector(".main-title").innerHTML = el_data.header;
    sidebarEl.append(sidebar_clone);

    contents.subsections.forEach(element => {
        let sidebar_sub_clone = sidebar_el_sub.content.cloneNode(true);
        sidebar_sub_clone.querySelector(".main-title").innerHTML = element;
        sidebarEl.append(sidebar_sub_clone);
    });

    sidebar.appendChild(sidebarEl);
}