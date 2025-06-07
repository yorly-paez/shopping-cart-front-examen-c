const loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    let name = document.getElementById('nameInput').value;
    let password = document.getElementById('passwordInput').value;
    signUp(name, password);
});

function signUp(name, password){
    localStorage.removeItem('token');
    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
    
            username: name,
            password: password,
            expiresInMins: 25, 
        }),
    
    })

    .then((res) => {
        if(res.status === 200){
            res.json().then((data) => {
                localStorage.setItem('token', data.accessToken);
                alertBuilder('success', "Inicio de seccion exitoso")
                console.log(data);
            })

            setTimeout(() =>{
                location.href = 'admin/dashboard.html'
            }, 2000)

        }else{
            alertBuilder('danger', "usuario o contraseña incorrectas" );
            
        }
    })

    .catch((error) =>{
        console.log('error en el servicio', error)
        
    })


    

}

function alertBuilder(alertType, message){
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.innerHTML = `
        <div class="alert alert-${alertType}"> ${message}</div>
    `
    


}
