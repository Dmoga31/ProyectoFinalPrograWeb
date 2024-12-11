// places.js  
$(document).ready(function() {  
    redirectIfNotAuth(); // Solo verificamos que esté autenticado  
        
    // Cargar salones  
    function loadPlaces() {  
        fetch(`${API_URL}/places`, {  
            headers: {  
                'Authorization': `Bearer ${getToken()}`  
            }  
        })  
        .then(handleFetchResponse)  
        .then(places => {  
            const list = $('#placeList');  
            list.empty();  
            places.forEach(place => {  
                list.append(`  
                    <div class="card mb-3">  
                        <div class="card-body">  
                            <h5 class="card-title">${place.NamePlace}</h5>  
                            <p class="card-text">  
                                <strong>Piso:</strong> ${place.Floor}  
                            </p>  
                            <div class="btn-group" role="group">  
                                <button class="btn btn-primary" onclick="editPlace('${place._id}')">  
                                    <i class="fas fa-edit"></i> Editar  
                                </button>  
                                <button class="btn btn-danger" onclick="deletePlace('${place._id}')">  
                                    <i class="fas fa-trash"></i> Eliminar  
                                </button>  
                            </div>  
                        </div>  
                    </div>  
                `);  
            });  
        })  
        .catch(error => {  
            console.error('Error:', error);  
            alert(error.message);  
        });  
    }  

    // Crear salón  
    $('#placeForm').on('submit', function(e) {  
        e.preventDefault();  

        const data = {  
            NamePlace: $('#NamePlace').val().trim(),  
            Floor: $('#Floor').val()  
        };  

        fetch(`${API_URL}/places`, {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json',  
                'Authorization': `Bearer ${getToken()}`  
            },  
            body: JSON.stringify(data)  
        })  
        .then(handleFetchResponse)  
        .then(data => {  
            alert('Salón creado exitosamente');  
            this.reset();  
            loadPlaces();  
        })  
        .catch(error => {  
            console.error('Error:', error);  
            alert(error.message);  
        });  
    });  

    // Eliminar salón  
    window.deletePlace = function(id) {  
        if (confirm('¿Estás seguro de eliminar este salón?')) {  
            fetch(`${API_URL}/places/${id}`, {  
                method: 'DELETE',  
                headers: {  
                    'Authorization': `Bearer ${getToken()}`  
                }  
            })  
            .then(handleFetchResponse)  
            .then(() => {  
                alert('Salón eliminado exitosamente');  
                loadPlaces();  
            })  
            .catch(error => {  
                console.error('Error:', error);  
                alert(error.message);  
            });  
        }  
    };  

    // Editar salón  
    window.editPlace = function(placeId) {  
        fetch(`${API_URL}/places/${placeId}`, {  
            headers: {  
                'Authorization': `Bearer ${getToken()}`  
            }  
        })  
        .then(handleFetchResponse)  
        .then(place => {  
            $('#editPlaceId').val(place._id);  
            $('#editNamePlace').val(place.NamePlace);  
            $('#editFloor').val(place.Floor);  
            $('#editPlaceModal').modal('show');  
        })  
        .catch(error => {  
            console.error('Error:', error);  
            alert(error.message);  
        });  
    };  

    // Manejar formulario de edición  
    $('#editPlaceForm').on('submit', function(e) {  
        e.preventDefault();  

        const placeId = $('#editPlaceId').val();  
        const data = {  
            NamePlace: $('#editNamePlace').val().trim(),  
            Floor: $('#editFloor').val()  
        };  

        fetch(`${API_URL}/places/${placeId}`, {  
            method: 'PUT',  
            headers: {  
                'Content-Type': 'application/json',  
                'Authorization': `Bearer ${getToken()}`  
            },  
            body: JSON.stringify(data)  
        })  
        .then(handleFetchResponse)  
        .then(() => {  
            alert('Salón actualizado exitosamente');  
            $('#editPlaceModal').modal('hide');  
            loadPlaces();  
        })  
        .catch(error => {  
            console.error('Error:', error);  
            alert(error.message);  
        });  
    });  





    // Cerrar sesión  
    $('#logout').click(logout);  

    // Cargar datos iniciales  
    loadPlaces();  
});