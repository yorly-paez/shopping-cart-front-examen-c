function getProducts(){
    const cardHeader = document.getElementById('cardHeader');
    cardHeader.innerHTML = '<h5><i class="fa-solid fa-users"></i> Productos</h5>'
    const info = document.getElementById('info');
    info.className = "row d-flex justify-content-center";

    fetch('https://dummyjson.com/products')
    .then((response) =>{
        return response.json();
    })


    .then((data => {
        data.products.forEach(producto => {
            
            showProducts(producto.images, producto.title, producto.price, producto.category);

        });
    }))
    
}

function showProducts(images, title, price, category){
    
    const lista = document.createElement('div');
    lista.className = "col"
    lista.innerHTML = ` 
        
            <div class="card" style="width: 18rem;">
                <img src="${images}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${category}</p>
                    <p class="card-text">${price}</p>
                    <a href="#" class="btn btn-primary"> Ver detalles </a>
                </div>
            </div>
        
        
    `

    info.appendChild(lista);

    
}