window.onload = function() {
  renderStart();
};

$('#submitBtn').click(function(ev){
  ev.preventDefault();
  console.log("Submit Btn CLICKED")
  const newBurger = $('#burgerForm').val();
  console.log("[Burger to add:]", newBurger );
  addBurger();
});


async function displayBurgerList(){
  $.get('/api/burgerlist')
  .then( result => {
    console.log("[BURGER LIST]", result)
    let card = '';
    result.forEach(element => {
      card += 
      `<div class="card">
      <div class="card-body">
        <h5 class="card-title">${element.burger_name}</h5>
        <a href="#" class="btn btn-primary btn-sm" data-burgerID="${element.id}">Devour</a>
      </div>
    </div>`
    })
    $('.burger-menu').html(card)
  })
  
  
}

async function displayDevourList(){
  console.log("getDevourList API Call ----")
  let result = await $.get('/api/burgerdevour');
  console.log("[Devour List]", result)
}

async function addBurger(){
  let data = { 
    burger_name: $('#burgerForm').val(),
    devoured: false
  };
  console.log("adding burger: ", data)
  const result = await $.post('/api/addburger', data)
  console.log(result)
}

// issue with for each function. result is not a array. for each needs to run through an array to work 

// async function renderBurgerMenu(){
//   const result = await $.get('/api/burgerdisplay')
//   .then( result => {
//     console.log("BURGER MENU", result)
//     const burgers = []
//     result.forEach(( element) => {
//       burgers.push(element.burger_name)
//       console.log("BURGER LIST", burgers);
//     })
//   } )
// }




async function renderStart(){
  //add functions for on page load
  console.log("PAGE LOADED ---- START");
  displayBurgerList();
  displayDevourList();
};




