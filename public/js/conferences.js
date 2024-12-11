
$(document).ready(function() {  
    redirectIfNotAuth();  

    // Cargar lugares  
    function loadPlaces() {  
        fetch(`${API_URL}/places`, {  
            headers: {  
                'Authorization': `Bearer ${getToken()}`  
            }  
        })  
        .then(response => response.json())  
        .then(places => {  
            const select = $('#place');  
            select.empty();  
            places.forEach(place => {  
                select.append(`<option value="${place._id}">${place.NamePlace} - Piso ${place.Floor}</option>`);  
            });  
        });  
    }  

    // Cargar conferencias  
    function loadConferences() {  
        fetch(`${API_URL}/conferences`, {  
            headers: {  
                'Authorization': `Bearer ${getToken()}`  
            }  
        })  
        .then(response => response.json())  
        .then(conferences => {  
            const list = $('#conferenceList');  
            list.empty();  
            conferences.forEach(conference => {  
                const creatorName = conference.CreatedBy ?   
                `${conference.CreatedBy.FirstName} ${conference.CreatedBy.LastName}`.trim() :  
                'Usuario Desconocido'; 
                list.append(`  
                    <div class="card mb-3">  
                        <div class="card-body">  
                            <h5 class="card-title">${conference.Name}</h5>  
                            <p class="card-text">  
                                <strong>Lugar:</strong> ${conference.Place.NamePlace}<br>  
                                <strong>Nivel:</strong> ${conference.Place.Floor}<br>  
                                <strong>Fecha:</strong> ${new Date(conference.Date).toLocaleDateString()}<br>  
                                <strong>Horario:</strong> ${conference.StartHour} - ${conference.EndHour}<br>
                                <strong>Creado por: </strong>${creatorName}</p>
                            </p>  
                            <div class="btn-group" role="group">  
                                <button class="btn btn-primary" onclick="editConference('${conference._id}')">  
                                    <i class="fas fa-edit"></i> Editar  
                                </button>  
                                <button class="btn btn-danger" onclick="deleteConference('${conference._id}')">  
                                    <i class="fas fa-trash"></i> Eliminar  
                                </button>  
                            </div>  
                        </div>  
                    </div>  
                `);  
            });  
        });  
    }  

    // Crear conferencia  
    $('#conferenceForm').on('submit', function(e) {  
        e.preventDefault();  

        const data = {  
            Name: $('#name').val(),  
            Place: $('#place').val(),  
            Date: $('#date').val(),  
            StartHour: $('#startHour').val(),  
            EndHour: $('#endHour').val()  
        }; 
        
        if (data.StartHour >= data.EndHour) {  
                    alert('La hora de inicio debe ser anterior a la hora de fin');  
                    return;  
        }  

        fetch(`${API_URL}/conferences`, {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json',  
                'Authorization': `Bearer ${getToken()}`  
            },  
            body: JSON.stringify(data)  
        })  
        .then(response => response.json())  
        .then(data => {  
            if (data._id) {  
                alert('Conferencia creada exitosamente');  
                loadConferences();  
                this.reset();  
            } else {  
                alert('Error al crear la conferencia');  
            }  
        })  
        .catch(error => {  
            console.error('Error:', error);  
            alert('Error al crear la conferencia');  
        });  
    });  

    // Eliminar conferencia  
    window.deleteConference = function(id) {  
        if (confirm('¿Estás seguro de eliminar esta conferencia?')) {  
            fetch(`${API_URL}/conferences/${id}`, {  
                method: 'DELETE',  
                headers: {  
                    'Authorization': `Bearer ${getToken()}`  
                }  
            })  
            .then(response => response.json())  
            .then(data => {  
                alert('Conferencia eliminada exitosamente');  
                loadConferences();  
            })  
            .catch(error => {  
                console.error('Error:', error);  
                alert('Error al eliminar la conferencia');  
            });  
        }  
    };  

    // Función para cargar los datos de la conferencia en el modal  
    window.editConference = function(conferenceId) {    
            fetch(`${API_URL}/conferences/${conferenceId}`, {    
                headers: {    
                    'Authorization': `Bearer ${getToken()}`    
                }    
            })    
            .then(async response => {    
                if (!response.ok) {    
                    const errorData = await response.json();    
                    throw new Error(errorData.message || 'Error al cargar la conferencia');    
                }    
                return response.json();    
            })    
            .then(conference => {    
                $('#editConferenceId').val(conference._id);    
                // Mostrar información del creador  
                const creatorName = conference.CreatedBy ?   
                    `${conference.CreatedBy.FirstName} ${conference.CreatedBy.LastName}` :   
                    'Usuario Desconocido';  
                $('#editCreator').val(creatorName);  
                $('#editName').val(conference.Name);    
                $('#editPlace').val(conference.Place._id);    
                $('#editDate').val(conference.Date.split('T')[0]);    
                $('#editStartHour').val(conference.StartHour);    
                $('#editEndHour').val(conference.EndHour);    
                $('#editConferenceModal').modal('show');    
            })    
            .catch(error => {    
                console.error('Error detallado:', error);    
                alert(`Error al cargar los datos de la conferencia: ${error.message}`);    
            }); 
        };  
        
        // Manejar el envío del formulario de edición  
        $('#editConferenceForm').on('submit', function(e) {    
            e.preventDefault();    
        
            const conferenceId = $('#editConferenceId').val();    
            const selectedPlace = $('#editPlace').val();    
        
            if (!selectedPlace) {    
                alert('Debe seleccionar un lugar');    
                return;    
            }    
        
            const data = {    
                Name: $('#editName').val().trim(),    
                Place: selectedPlace,    
                Date: new Date($('#editDate').val()).toISOString(),    
                StartHour: $('#editStartHour').val(),    
                EndHour: $('#editEndHour').val()    
            };    
        
            fetch(`${API_URL}/conferences/${conferenceId}`, {    
                method: 'PUT',    
                headers: {    
                    'Content-Type': 'application/json',    
                    'Authorization': `Bearer ${getToken()}`    
                },    
                body: JSON.stringify(data)    
            })    
            .then(async response => {    
                const responseData = await response.json();    
                console.log('Estado de la respuesta:', response.status);  
                console.log('Datos devueltos por el servidor:', responseData);  
                if (!response.ok) {    
                    throw new Error(responseData.message || 'Error en el servidor');    
                }    
                return responseData;    
            })    
            .then(responseData => {    
                // Verificamos que exista conference y su _id en la respuesta  
                if (responseData && responseData.conference && responseData.conference._id) {    
                    alert('Conferencia actualizada exitosamente');    
                    $('#editConferenceModal').modal('hide');    
                    loadConferences();    
                } else {    
                    throw new Error('No se recibió confirmación del servidor');    
                }    
            })    
            .catch(error => {    
                console.error('Error detallado:', error);    
                alert(`Error al actualizar la conferencia: ${error.message}`);    
            });    
        });  

    // Cargar los lugares en el select del modal de edición  
    function loadPlacesForEdit() {  
        fetch(`${API_URL}/places`, {  
            headers: {  
                'Authorization': `Bearer ${getToken()}`  
            }  
        })  
        .then(response => response.json())  
        .then(places => {  
            const select = $('#editPlace');  
            select.empty();  
            places.forEach(place => {  
                select.append(`<option value="${place._id}">${place.NamePlace} - Piso ${place.Floor}</option>`);  
            });  
        });  
    }  

    // Cargar los lugares cuando se abre el modal  
    $('#editConferenceModal').on('show.bs.modal', function () {  
        loadPlacesForEdit();  
    });  

    // Cerrar sesión  
    $('#logout').click(function() {  
        logout();  
    });  

    // Cargar datos iniciales  
    loadPlaces();  
    loadConferences();  
});  