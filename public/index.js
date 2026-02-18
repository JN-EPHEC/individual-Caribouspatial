const form = document.getElementById('form-ajout');
const inputNom = document.getElementById('input-nom');
const inputPrenom = document.getElementById('input-prenom');
const listeUtilisateurs = document.getElementById('liste-utilisateurs');
//##########################################################################
async function getUtilisateurs() {
    const response = await fetch('/api/users');
    const users = await response.json();
    afficherUtilisateurs(users);
}
//##########################################################################
function afficherUtilisateurs(users) {
    listeUtilisateurs.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');

        const nom = document.createElement('span');
        nom.textContent = `${user.prenom} ${user.nom}`;

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'X';
        btnDelete.classList.add('btn-delete');
        btnDelete.addEventListener('click', () => supprimerUtilisateur(user.id));

        li.appendChild(nom);
        li.appendChild(btnDelete);
        listeUtilisateurs.appendChild(li);
    });
}
//##########################################################################
async function supprimerUtilisateur(id) {
    await fetch(`/api/users/${id}`, {
        method: 'DELETE'
    });
    getUtilisateurs();
}
//##########################################################################
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = inputNom.value.trim();
    const prenom = inputPrenom.value.trim();

    if (!nom || !prenom) return;

    await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, prenom })
    });

    inputNom.value = '';
    inputPrenom.value = '';
    getUtilisateurs();
});
//##########################################################################
getUtilisateurs();