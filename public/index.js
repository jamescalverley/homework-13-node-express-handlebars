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


async function getBurgerList(){
  // app.get('/api/burgerdisplay'
  console.log("getBurgerList API Call ----")
  let result = await $.get('/api/burgerdisplay');
  console.log("[Burger List]", result)
}

async function getDevourList(){
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

async function renderStart(){
  //add functions for on page load
  console.log("PAGE LOADED ---- START");
  getBurgerList();
  getDevourList();
};



