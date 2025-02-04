// Função para salvar dados no Local Storage
function saveToLocalStorage(data) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para carregar dados do Local Storage
function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Função para renderizar a lista de usuários
function renderUserList(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Limpa a lista antes de renderizar

    users.forEach((user, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${user.date} - ${user.name} - ${user.email}</span>
            <button onclick="deleteUser(${index})">Excluir</button>
        `;
        userList.appendChild(listItem);
    });
}

// Função para adicionar um usuário
function addUser(event) {
    event.preventDefault();

    const userName = document.getElementById('user-name').value;
    const userEmail = document.getElementById('user-email').value;
    const userPassword = document.getElementById('user-password').value;

    if (userName && userEmail && userPassword) {
        const userData = {
            date: new Date().toLocaleString(),
            name: userName,
            email: userEmail,
            password: userPassword
        };

        saveToLocalStorage(userData);
        renderUserList(loadFromLocalStorage());
        clearForm();
    } else {
        alert('Preencha todos os campos!');
    }
}

// Função para excluir um usuário
function deleteUser(index) {
    const users = loadFromLocalStorage();
    users.splice(index, 1); // Remove o usuário do array
    localStorage.setItem('users', JSON.stringify(users));
    renderUserList(users);
}

// Função para excluir todos os usuários
function clearAllUsers() {
    localStorage.removeItem('users');
    renderUserList([]);
}

// Função para pesquisar usuários
function searchUsers() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const users = loadFromLocalStorage();

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );

    renderUserList(filteredUsers);
}

// Função para limpar os campos do formulário
function clearForm() {
    document.getElementById('user-name').value = '';
    document.getElementById('user-email').value = '';
    document.getElementById('user-password').value = '';
}

// Event Listeners
document.getElementById('admin-register').addEventListener('submit', addUser);
document.getElementById('clear-form').addEventListener('click', clearForm);
document.getElementById('clear-all').addEventListener('click', clearAllUsers);
document.getElementById('search-input').addEventListener('input', searchUsers);

// Carrega a lista de usuários ao carregar a página
window.onload = () => {
    renderUserList(loadFromLocalStorage());
};