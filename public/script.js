// const { post } = require("../routes/userRoutes");

let form = document.getElementById('registerForm');
form.addEventListener('submit',async (event)=>{

  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userData = {name,email,password};


  try {
    console.log(userData)
    const res = await fetch('/api/auth/registerUser',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    console.log();
    
    if(res.ok){
      alert(data.message || "User Registered Successfully.")
      form.reset();
    }else{
      alert(data.message || "User Resgistration Failed.");
    }
  } catch (error) {
    console.error('Error:',error);
    alert("failed to connect to server");
  }
})