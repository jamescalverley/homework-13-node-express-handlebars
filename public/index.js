window.onload = function() {
  renderStart();
};

$('#submitBtn').click(function(event){
  event.preventDefault();
  console.log("Submit Btn CLICKED")
  const newBurger = $('#burgerForm').val();
  console.log("[Burger to add:]", newBurger );
  if( newBurger ){
    addBurger();
  } else {
    alert("Please enter a burger name!")
  }
});

$('#resetBtn').click(function(event){
  event.preventDefault();
  console.log("--RESET button clicked--")
    if(confirm("Are you sure you want to reset ALL BURGERS?")){
      console.log("reset");
      reset();
    } else {
      return
    }
})

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
        <a href="" onclick="devourBurger(event)" class="btn btn-primary btn-sm devourBtn" data-burgerID="${element.id}">Devour</a>
        </div>
      </div>`
    })
    $('.burger-list').html(card)
  })
}

async function displayDevourList(){
  $.get('/api/burgerdevourlist')
  .then( result => {
    console.log("[DEVOUR LIST]", result)
    let card = '';
    result.forEach(element => {
      card +=
      `<div class="card">
        <div class="card-body">
        <h5 class="card-title">${element.burger_name}</h5>
        <a href="" class="btn btn-primary btn-sm" data-burgerID="${element.id}" style="display:none">Devour</a>
        </div>
      </div>`
    })
    $('.burger-list-devoured').html(card)  
  })
}

async function addBurger(){
  let data = { 
    burger_name: $('#burgerForm').val(),
    devoured: false
  };
  console.log("adding burger: ", data)
  const result = await $.post('/api/addburger', data)
  console.log(result);
  $('#burgerForm').val('');
  displayBurgerList();
}

async function devourBurger(){
  event.preventDefault();
  let burgerID = event.target.dataset.burgerid;
  let data = {
    id: burgerID
  }
  console.log("burger devour button clicked")
  console.log("[Burger ID]", burgerID)
  console.log("[Data]", data)

  const result = await $.post('/api/devour', data)
  console.log("[Devour Burger]", result)
  displayBurgerList();
  displayDevourList();
}

async function reset(){

  let deleteData = {}
  let result = await $.ajax({
    url:'/api/reset',
    type:'DELETE',
    data:deleteData});
  console.log("[SERVER - resetFunction]")
  displayBurgerList();
  displayDevourList();
}

async function renderStart(){
  //add functions for on page load
  console.log("PAGE LOADED ---- START");
  displayBurgerList();
  displayDevourList();
};




