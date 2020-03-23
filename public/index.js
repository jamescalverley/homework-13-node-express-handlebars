window.onload = function() {
  renderStart();
};




$('#submitBtn').click(function(ev){
  ev.preventDefault();
  console.log("Submit Btn CLICKED")
  const newBurger = $('#burgerForm').val();
  console.log("[Burger to add:]", newBurger );
});


async function getBurgerList(){
  // app.get('/api/burgerdisplay'
  let result = await $.get('/api/burgerdisplay');
  console.log("[Burger List]", result)
}

async function renderStart(){
  //add functions for on page load
  console.log("PAGE LOADED ---- START")
  getBurgerList()
};



