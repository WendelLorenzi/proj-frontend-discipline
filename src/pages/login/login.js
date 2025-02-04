function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Função para pesquisar usuários
function searchUsers() {
    const email = document.getElementById('email').value.toLowerCase();
    const senha = document.getElementById('password').value.toLowerCase();
    const users = loadFromLocalStorage();

    const userFound = users.filter(user =>
        user.password.toLowerCase().includes(senha) &&
        user.email.toLowerCase().includes(email)
    );

    console.log(userFound)

    if (userFound) {
        window.location.href = 'src\pages\home\index.html';
    } else {
        alert('E-mail ou senha incorretos. Tente novamente.');
    }
}