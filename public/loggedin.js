

const views = {
    loggedin: ["#entriesTemplate", "#createNewEntryTemplate"]
  }
  
  function renderView(view){
    // Definiera ett target
    const target = document.querySelector('main');
   
  
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

  renderView(views.loggedin);
  userEntries(7);


  function userEntries(userID) {
    const target = document.querySelector('#entries');
    //OBS!! userID måste sättas till SESSION
   
    fetch('/api/entries/' + userID, {
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

  })
  .catch(err => {
    console.log(err);
  });
}

const addNewEntry = document.querySelector('#newEntryForm')
addNewEntry.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(addNewEntry);


    fetch('/api/new/entry', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
    .then(response => console.log(response.json()))
    .catch(error => console.error('Error:', error));
} )


const deleteEntry = document.querySelector('#deleteEntry')
deleteEntry.addEventListener('submit', event => {
    event.preventDefault();

    let entryID = document.querySelector('#entryID')

    fetch('/api/delete/' + entryID, {
        method: 'POST',
        body: formData
    }).then(response => response.json())
    .then(response => console.log(response.json()))
    .catch(error => console.error('Error:', error));
} )

