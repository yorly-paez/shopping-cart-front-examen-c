
tokenValidate();

function logOut(){
    location.href = '../index.html';
}

function tokenValidate(){
    const token = localStorage.getItem('token');
    if(token === null){
        location.href = '../index.html';
    }
}