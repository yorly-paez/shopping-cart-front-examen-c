function users(page = 1) {
    const USERS_PER_PAGE = 10
    const skip = (page - 1) * USERS_PER_PAGE

    document.getElementById('cardHeader').innerHTML = '<h5><i class="bi bi-people"></i>  Usuarios Registrados</h5>'

    const DUMMYJSON_ENDPOINT = `https://dummyjson.com/users?limit=${USERS_PER_PAGE}&skip=${skip}`

    fetch(DUMMYJSON_ENDPOINT)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.users && data.users.length > 0) {
                let listUsers = `
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Imagen de Usuario</th>
                            <th scope="col">Ver Más</th>
                            </tr>
                        </thead>
                        <tbody>
                `

                data.users.forEach(user => {
                    listUsers += `
                        <tr>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td><img src="${user.image}" class="img-thumbnail" alt="avatar del usuario"></td>
                            <td>
                                <button type="button" class="btn btn-outline-info" onclick="getUser(${user.id})"><i class="bi bi-eye-fill"></i></button>
                            </td>
                        </tr>
                    `
                })

                listUsers += `
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#" onclick="users(${page - 1})" ${page <= 1 ? 'disabled' : ''}>&laquo;</a></li>
                            <li class="page-item"><a class="page-link" href="#" onclick="users(1)">1</a></li>
                            <li class="page-item"><a class="page-link" href="#" onclick="users(2)">2</a></li>
                            <li class="page-item"><a class="page-link" href="#" onclick="users(3)">3</a></li>
                            <li class="page-item"><a class="page-link" href="#" onclick="users(4)">4</a></li>
                            <li class="page-item"><a class="page-link" href="#" onclick="users(5)">5</a></li>
                            <li class="page-item"><a class="page-link" href="#" onclick="users(${page + 1})">&raquo;</a></li>
                        </ul>
                    </nav>
                `

                document.getElementById('info').innerHTML = listUsers
            } else {
                document.getElementById('info').innerHTML = 'No existen usuarios en la BD'
            }
        })
}

function getUser(idUser) {
    const DUMMYJSON_USER_ENDPOINT = `https://dummyjson.com/users/${idUser}`

    fetch(DUMMYJSON_USER_ENDPOINT)
        .then((response) => response.json())
        .then((user) => {
            if (user && user.id) {
                showModalUser(user)
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontró el usuario en la API</h3>'
            }
        })
}

function showModalUser(user) {
    const modalUser = `
    <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #0d6efd; color: white;">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Información de Usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card">
                <img src="${user.image}" class="card-img-top" alt="Avatar del usuario">
                <div class="card-body">
                    <p class="card-text">Correo: ${user.email}</p>
                    <p class="card-text">Nombre: ${user.firstName}</p>
                    <p class="card-text">Apellido: ${user.lastName}</p>
                    <p class="card-text">Telefono: ${user.phone}</p>
                    <p class="card-text">Ciudad: ${user.address.city}</p>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `

    document.getElementById('modalUser').innerHTML = modalUser

    const modal = new bootstrap.Modal(document.getElementById('showModalUser'))
    modal.show()
}

function addUser() {
    const modalUser = `
    <!-- Modal -->
    <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user-plus"></i> Agregar Usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card">
                <div class="card-body">
                    <form id="formAddUser">
                        <div class="row">
                            <div class="col">
                                <input type="text" id="first_name" class="form-control" placeholder="Primer nombre" aria-label="First name" required>
                            </div>
                            <div class="col">
                                <input type="text" id="last_name" class="form-control" placeholder="Apellidos" aria-label="Last name" required>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col">
                                <input type="email" id="email" class="form-control" placeholder="Correo" aria-label="First name" required>
                            </div>
                            <div class="col">
                                <input type="url" id="avatar" class="form-control" placeholder="Link del avatar" aria-label="Last name" required>
                            </div>
                        </div>

                        <div class="row mt-3 ">
                            <div class="col text-center">
                                <button type="button" class="btn btn-success" onclick="saveUser()">
                                    <i class="fa-solid fa-floppy-disk"></i> Guardar
                                </button>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `
    document.getElementById('modalUser').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('showModalUser'))
    modal.show()
}

function saveUser() {
    const form = document.getElementById('formAddUser')
    if (form.checkValidity()) {
        const first_name = document.getElementById('first_name').value
        const last_name = document.getElementById('last_name').value
        const email = document.getElementById('email').value
        const avatar = document.getElementById('avatar').value
        const user = { first_name, last_name, email, avatar }

        const REQRES_ENDPOINT = 'https://reqres.in/api/users'
        fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: 'Muhammad',
                lastName: 'Ovi',
                age: 251,
                /* other user data */
            })
        })

            .then((response) => {
                return response.json().then(
                    data => {
                        return {
                            status: response.status,
                            info: data
                        }
                    }
                )
            })
            .then((result) => {
                if (result.status === 201) {
                    document.getElementById('info').innerHTML =
                        '<h3 class="text-success">El usuario se guardo correctamente <i class="fa-solid fa-check"></i></h3>'
                }
                else {
                    document.getElementById('info').innerHTML =
                        '<h3 class="text-danger">No se guardo el usuario en la Api <i class="fa-solid fa-x"></i></h3>'
                }
                const modalId = document.getElementById('showModalUser')
                const modal = bootstrap.Modal.getInstance(modalId)
                modal.hide()
            })
    }
    else {
        form.reportValidity()
    }
}