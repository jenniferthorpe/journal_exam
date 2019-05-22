
const views = {
  start: ["#loginFormTemplate", "#registerFormTemplate", "#entriesTemplate"]
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

}


renderView(views.start)


const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(loginForm)
  fetch('/api/login', {
    method: 'POST',
    body: formData
  }).then(response => {
    if (!response.ok) {
      return Error(response.statusText)
    } else {
      renderView(view.loggedIn)
      //renderView(views.login)
      //console.log("Inloggad");
      // return response.json()
    }
  })
    .catch(error => {
      console.error(error)
    })
})


let entryElement = document.querySelector("#entries");

function allEntries() {
  const target = document.querySelector('#entries');

  fetch('/entries/last/20')
    .then(response => {
      if (!response.ok) { throw Error(response.statusText); }

      return response.json();
    })
    .then(data => {
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        const a = document.createElement("a");
        a.setAttribute("class", "entries");
        a.setAttribute("href", "länken");
        a.setAttribute("style", "padding: 15px 0px");
        a.innerHTML += data[i].title + "<br>";
        target.append(a);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

allEntries();

