const API_URL = 'http://localhost:3000/api';  

function getToken() {  
    return localStorage.getItem('token');  
}  

function getUser() {  
    const userStr = localStorage.getItem('user');  
    return userStr ? JSON.parse(userStr) : null;  
}  

function isAuthenticated() {  
    return !!getToken();  
}  

function isAdmin() {  
    const user = getUser();  
    return user && user.IsAdmin === true;  
}  

function redirectIfNotAuth() {  
    if (!isAuthenticated()) {  
        window.location.href = './login.html';  
        return;  
    }  
}  

function redirectIfNotAdmin() {  
    if (!isAdmin()) {  
        alert('Acceso denegado. Solo administradores pueden acceder a esta sección.');  
        window.location.href = './conferences.html';  
        return;  
    }  
}  

function logout() {  
    localStorage.removeItem('token');  
    localStorage.removeItem('user');  
    window.location.href = "./login.html";  
}  

// Función para manejar errores de fetch  
async function handleFetchResponse(response) {  
        const data = await response.json();  
        if (!response.ok) {  
            if (response.status === 401) {  
                logout(); // Si el token es inválido o expiró, cerrar sesión  
                throw new Error('Sesión expirada. Por favor, inicie sesión nuevamente.');  
            }  
            throw new Error(data.message || 'Error en la operación');  
        }  
        return data;  
    }
  
        
    
