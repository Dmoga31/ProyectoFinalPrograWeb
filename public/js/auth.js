const API_URL = 'http://localhost:3000/api';  

$(document).ready(function() {  
        // Login  
        $('#loginForm').on('submit', function(e) {  
            e.preventDefault();  
    
            const data = {  
                Email: $('#email').val(),  
                Password: $('#password').val()  
            };  
    
            fetch(`${API_URL}/users/login`, {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json'  
                },  
                body: JSON.stringify(data)  
            })  
            .then(async response => {  
                const responseData = await response.json();  
                if (!response.ok) {  
                    throw new Error(responseData.message || 'Error en el inicio de sesión');  
                }  
                return responseData;  
            })  
            .then(data => {  
                if (data.token) {  
                    // Guardar token  
                    localStorage.setItem('token', data.token);  

                    // Obtener información completa del usuario  
                    return fetch(`${API_URL}/users/me`, {  
                        headers: {  
                            'Authorization': `Bearer ${data.token}`  
                        }  
                    }).then(response => response.json());  
                } else {  
                    throw new Error('No se recibió el token');  
                }  
            })  
            .then(userData => {  
                // Guardar datos del usuario  
                localStorage.setItem('user', JSON.stringify(userData));  
                window.location.href = './conferences.html';  
            })  
            .catch(error => {  
                console.error('Error:', error);  
                alert(error.message || 'Error en el inicio de sesión');  
            });  
        });  

    // Register  
    $('#registerForm').on('submit', function(e) {  
        e.preventDefault();  

        const data = {  
            FirstName: $('#firstName').val(),  
            LastName: $('#lastName').val(),  
            Email: $('#email').val(),  
            Password: $('#password').val()  
        };  

        fetch(`${API_URL}/users/register`, {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify(data)  
        })  
        .then(response => response.json())  
        .then(data => {  
            if (data._id) {  
                alert('Registro exitoso');  
                window.location.href = '/login.html';  
            } else {  
                alert(data.message || 'Error en el registro');  
            }  
        })  
        .catch(error => {  
            console.error('Error:', error);  
            alert('Error en el registro. Intenta nuevamente.');  
        });  
    });  
});  
