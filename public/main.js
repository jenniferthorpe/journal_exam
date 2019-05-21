(function(){
  console.log('Hello World!');
})();

const views = {
  login: ["#loginFormTemplate", "#registerFormTemplate"]
}

function renderView(view){
  // Definiera ett target
  const target = document.querySelector('main');
  target.innerHTML = ''

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

renderView(views.login)


const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(loginForm)
  fetch('/api/login', {
    method: 'POST',
    body: formData
  }).then(response => {
    if(!response.ok){
      // renderView(view.loginError)
      renderView(views.login)
      console.log("Ej inloggad");
      return Error(response.statusText)
    } else {
      // renderView(view.loggedIn)
      renderView(views.login)
      console.log("Inloggad");
      return response.json()
    }
  }).catch(error =>{
    console.error(error)
  })

})

function register(){

fetch('/api/register')
.then (response => response.json())
.then (data => {
  console.log(data);
})
}

function allUsers(){
fetch('/api/allusers')
.then (response => response.json())
.then (data => {
  console.log(data);
})
}

