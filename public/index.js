$('#submitBtn').click(function(ev){
  ev.preventDefault();
  console.log("Submit Btn CLICKED")
  const newBurger = $('#burgerForm').val();
  console.log("[Burger to add:]", newBurger );
});

