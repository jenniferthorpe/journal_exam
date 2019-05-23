const views = {
    allUsers: ["#allUsers"]
}

function renderView(view) {
    // Definiera ett target
    const target = document.querySelector('main');
    target.innerHTML = '';

    // Loopa igenom våran "view"
    view.forEach(template => {
        const templateMarkup = document.querySelector(template).innerHTML;

        //Skapa en div

        const div = document.createElement("div");

        // Fyll diven med innehåll

        div.innerHTML = templateMarkup;

        // Lägg in diven i target (main-element)

        target.append(div);

    })

};

renderView(views.allUsers);


let entryElement = document.querySelector("#users");

(function showAllUsers() {
    const target = document.querySelector('#users');

    fetch('/api/allusers')
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response.json();
        })
        .then(data => {
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                const p = document.createElement("p");
                p.setAttribute("class", "entries");
                p.setAttribute("href", "länken");
                p.setAttribute("style", "padding: 15px 0px");
                p.innerHTML += data[i].username + "<br>";
                target.append(p);
            }
        })
        .catch(err => {
            console.log(err);
        });
})();

