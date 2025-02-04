function saveToLocalStorage(data) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para adicionar um usuário
function addUser(event) {
    event.preventDefault();

    const userName = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;
    const userPassword = document.getElementById('password').value;

    if (userName && userEmail && userPassword) {
        const userData = {
            date: new Date().toLocaleString(),
            name: userName,
            email: userEmail,
            password: userPassword
        };

        saveToLocalStorage(userData);
    } else {
        alert('Preencha todos os campos!');
    }
}