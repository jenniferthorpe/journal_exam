
const views = {
  start: ["#loginFormTemplate", "#registerFormTemplate", "#entriesTemplate"],
  loggedIn: ["#logoutFormTemplate", "#userEntriesTemplate", "#createNewEntryTemplate", "#newCommentTemplate"]
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
        otherEntries();
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
        div.innerHTML += data[i].title + "<br>" + data[i].content + "<br>" + "<form data-delete='deleteEntry'><input class='hidden' name='entryID' value='" + data[i].entryID + "'" + ">" + "<button type='submit'>Radera inlägg</button>" + "</form>";
        target.append(div);
      }
      bindEventListeners()

    })
    .catch(err => {
      console.log(err);
    });
}


//Skriv nytt inlägg

fetch('/api/ping')
  .then(response => {
    console.log(response);
    if (response.ok) {
      renderView(views.loggedIn);
      userEntries();
      otherEntries();

    }
  })



function otherEntries() {
  const target = document.querySelector('.otherEntries');

  fetch('/api/entries/users/other', {
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
        div.innerHTML += data[i].title + "<br>" + data[i].content
          + "<br>" + "<form data-comment='commentEntry'><input class='hidden' name='entryIDComment' value='" + data[i].entryID + "'" + ">" +
          "<textarea name='newComment'></textarea><br>" +
          "<button type='submit'>Kommentera</button>" + "</form>";
        target.append(div);
        otherEntriesComments(data[i].entryID, div);
      }
      bindEventListenersComment();

    })
    .catch(err => {
      console.log(err);
    });

}


function otherEntriesComments(entryID, div) {

  fetch('/api/entries/users/other/comments', {
    method: 'GET',
  }).then(response => {
    if (!response.ok) { throw Error(response.statusText); }

    return response.json();
  })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].entryID === entryID) {
          const divComment = document.createElement("div");
          divComment.innerHTML = data[i].content + "<form data-deleteComment='deleteComment'><input class='hidden' name='commentIDDelete' value='" + data[i].commentID + "'" +
            ">" + "<input class='hidden' name='commentUserIDDelete' value='" + data[i].createdBy + "'" + ">" + "<button type='submit'>Radera kommentar</button>" + "</form>";
          div.append(divComment)
          bindEventDeleteComment();
        }
      };
      
    })
    .catch(err => {
      console.log(err);
    });


};



function bindEventListeners() {

  const deleteEntry = document.querySelectorAll('[data-delete="deleteEntry"]');
  const addNewEntry = document.querySelector('#newEntryForm');
  const logoutForm = document.querySelector("#logoutForm")

  // Ta bort inlägg

  deleteEntry.forEach(function (deleteEntryForm) {
    deleteEntryForm.addEventListener('submit', event => {
      event.preventDefault();

      let entryIDDelete = deleteEntryForm.querySelector('[name="entryID"]').value;
      console.log(entryIDDelete);


      fetch('/api/delete/' + entryIDDelete, {
        method: 'DELETE',
        
      }).then(response => {
        if (!response.ok) {

        } else {
          renderView(views.loggedIn);
          otherEntries();
        }
      })
        .catch(error => {
          console.error(error)
        })
    })

  })
/*
  deleteEntry.addEventListener('submit', event => {
    event.preventDefault();
    let entryID = document.querySelector('[name="entryID"]').value;

    fetch('/api/delete/' + entryID, {
      method: 'POST',
    })
    // Lägg in felhantering
  })
*/

  // Nytt inlägg
  addNewEntry.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(addNewEntry);
    console.log(formData);

    fetch('/api/new/entry', {
      method: 'POST',
      body: formData
    }).then(response => {
      if (!response.ok) {
        messageRegisterEntry.innerHTML = "Ange titel och innehåll."
      } else {
        renderView(views.loggedIn);
        userEntries();
      }
    })
      .catch(error => {
        console.error(error)
      })

  })


  //Logout
  logoutForm.addEventListener('submit', event => {
    event.preventDefault();
    fetch('/api/logout', {
      method: 'GET',
    }).then(response => {
      if (!response.ok) {
        return Error(response.statusText)
      } else {
        renderView(views.start);
        allEntries();
      }
    })
      .catch(error => {
        console.error(error)
      })
  });

}; //Stänger bindEventListeners





function bindEventListenersComment() {

 

  const addComment = document.querySelectorAll('[data-comment="commentEntry"]');
  

  // Ny kommentar
  addComment.forEach(function (addCommentForm) {
    addCommentForm.addEventListener('submit', event => {
      event.preventDefault();

      const formData = new FormData(addCommentForm);
      let entryIDComment = addCommentForm.querySelector('[name="entryIDComment"]').value;

      fetch('/api/comment/' + entryIDComment, {
        method: 'POST',
        body: formData
      }).then(response => {
        if (!response.ok) {
          messageRegisterEntry.innerHTML = "Kommentarsfält tomt"
        } else {
          renderView(views.loggedIn);
          otherEntries();
        }
      })
        .catch(error => {
          console.error(error)
        })

    });
  });
}

  //Radera kommentar
  function bindEventDeleteComment() {

    const deleteComment = document.querySelectorAll('[data-deletecomment="deleteComment"]');
    console.log(deleteComment);

  deleteComment.forEach(function (deleteCommentForm) {
    deleteCommentForm.addEventListener('submit', event => {
      event.preventDefault();

      let commentIDDelete = deleteCommentForm.querySelector('[name="commentIDDelete"]').value;
      let commentUserIDDelete = deleteCommentForm.querySelector('[name="commentUserIDDelete"]').value;
      console.log(commentIDDelete);
      console.log(commentUserIDDelete);


      fetch('/api/comment/' + commentIDDelete + "/" + commentUserIDDelete, {
        method: 'DELETE',
        
      }).then(response => {
        if (!response.ok) {

        } else {
          renderView(views.loggedIn);
          otherEntries();
        }
      })
        .catch(error => {
          console.error(error)
        })
    })

  })
  
};


