
const views = {
  start: ["#loginFormTemplate", "#registerFormTemplate", "#entriesTemplate"],
  loggedIn: ["#logoutFormTemplate", "#userEntriesTemplate", "#createNewEntryTemplate"]
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

    if (template === '#loginFormTemplate') { bindEvents() }

  })



}

//---------------------------//
//-------Förstasidan---------//
//---------------------------//

renderView(views.start);



function bindEvents() {
  const loginForm = document.querySelector('#loginForm')
  const messageLogin = document.querySelector('#messageLogin')


  //Logga in
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(loginForm)
    fetch('/api/login', {
      method: 'POST',
      body: formData
    }).then(response => {
      if (!response.ok) {
        messageLogin.innerHTML = "Ange användarnamn och lösenord."
        return Error(response.statusText)
      } else {
        renderView(views.loggedIn)
        userEntries();
      }
    })
      .catch(error => {
        console.error(error)
      })
  })
}




//Registrera användare
const registerForm = document.querySelector('#registerForm')
const messageRegister = document.querySelector('#messageRegister')

registerForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(registerForm)
  fetch('/api/register', {
    method: 'POST',
    body: formData
  }).then(response => {
    if (!response.ok) {
      messageRegister.innerHTML = "Ange ett användarnamn och lösenord."
      // return Error(response.statusText)
    } else {
      messageRegister.innerHTML = "Användare skapad."
    }
  })
    .catch(error => {
      console.error(error)
    })
})


//Visa 20 senaste inläggen
let entryElement = document.querySelector("#entries");

function allEntries() {
  const target = document.querySelector('#entries');

  fetch('/entries/last/20')
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

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
};

allEntries();



//------------------------------------//
//-------Inloggat läge----------------//
//------------------------------------//

fetch('/api/ping')
  .then(response => {
    console.log(response);
    if (response.ok) {
      renderView(views.loggedIn);
      userEntries();
    }
  })


const logoutForm = document.querySelector("#logoutForm")

//Logout
logoutForm.addEventListener('submit', event => {
  event.preventDefault();
  fetch('/api/logout', {
    method: 'GET',
  }).then(response => {
    if (!response.ok) {
      return Error(response.statusText)
    } else {
      renderView(views.start)
    }
  })
    .catch(error => {
      console.error(error)
    })
});


//Visa alla användarens inlägg
function userEntries() {
  const target = document.querySelector('#entriesUser');

  fetch('/api/entries/userid', {
    method: 'GET',
  }).then(response => {
    if (!response.ok) { throw Error(response.statusText); }

    return response.json();
  })
    .then(data => {

      for (let i = 0; i < data.length; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "entries");
        div.setAttribute("style", "padding: 15px 0px");
        div.innerHTML += data[i].title + "<br>" + data[i].content + "<br>" + "<form id='deleteEntry'> <button type='submit'>Radera inlägg</button><input class='hidden' value='" + data[i].entryID + "'" + ">" + "</form>";
        target.append(div);
      }

      bindDeleteEntry();
    })
    .catch(err => {
      console.log(err);
    });
}


//Skriv nytt inlägg
const addNewEntry = document.querySelector('#newEntryForm')
addNewEntry.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(addNewEntry);

  fetch('/api/new/entry', {
    method: 'POST',
    body: formData
  }).then(response => response.json())
    .then(response => console.log())
    .catch(error => console.error('Error:', error));
})

function bindDeleteEntry() {

  const deleteEntries = document.querySelector('[data-delete="deleteEntry"]')
  deleteEntries.forEach(deleteEntry => {

    deleteEntry.addEventListener('submit', event => {
      event.preventDefault();

      let entryID = document.querySelector('#entryID')

      fetch('/api/delete/' + entryID, {
        method: 'POST',
        body: formData
      }).then(response => response.json())
        .then(response => console.log(response.json()))
        .catch(error => console.error('Error:', error));
    })
  })
}



