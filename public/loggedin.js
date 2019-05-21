

const views = {
    loggedin: ["#allEntriesTemplate", "#createNewEntryTemplate"]
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