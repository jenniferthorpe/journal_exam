
const views = {
  start: ["#loginFormTemplate", "#registerFormTemplate", "#entriesTemplate"],
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
loginForm.addEventListener('submit', e => {
  event.preventDefault();
  const formData = new formData(loginForm)
  fetch('/api/login', {
    method: 'POST',
    body: formData
  }).then(response => {
    if (!response.ok) {
      renderView(view.loginError)
      return Error(response.statusText)
    } else {
      renderView(view.loggedIn)
      return response.json()
    }
  }).catch(error => {
    console.error(error)
  })
})

function register() {

  fetch('/api/register')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
}

function allUsers() {
  fetch('/api/allusers')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
}

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
        const div = document.createElement("div");
        div.setAttribute("class", "entries");
        div.setAttribute("style", "padding: 15px 0px");
        div.innerHTML += data[i].title + "<br>" + data[i].content + "<br>";
        target.append(div);
      }

    })
    .catch(err => {
      console.log(err);
    });
}

allEntries();

