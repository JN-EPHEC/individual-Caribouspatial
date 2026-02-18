const form = document.getElementById('form-ajout');
const inputNom = document.getElementById('input-nom');
const inputPrenom = document.getElementById('input-prenom');
const listeUtilisateurs = document.getElementById('liste-utilisateurs');
const btnTriNom = document.getElementById('tri-nom');
const btnTriPrenom = document.getElementById('tri-prenom');

let listeComplete = [];
//##########################################################################
function afficherUtilisateurs(users) {
    listeUtilisateurs.innerHTML = '';
    users.forEach(creerElementUtilisateur);
}
//##########################################################################
async function getUtilisateurs() {
    const response = await fetch('/api/users');
    listeComplete = await response.json();
    afficherUtilisateurs(listeComplete);
}
//##########################################################################
function creerElementUtilisateur(user) {
    const nom = document.createElement('span');
    nom.textContent = `${user.prenom} ${user.nom}`;
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'X';
    btnDelete.classList.add('btn-delete');
    btnDelete.dataset.id = user.id;
    btnDelete.addEventListener('click', supprimerUtilisateur);
    const li = document.createElement('li');
    li.appendChild(nom);
    li.appendChild(btnDelete);
    listeUtilisateurs.appendChild(li);
}
//##########################################################################
async function supprimerUtilisateur(event) {
    const id = event.target.dataset.id;
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    getUtilisateurs();
}
//##########################################################################
async function soumettreFormulaire(event) {
    event.preventDefault();
    let nom = inputNom.value.trim();
    let prenom = inputPrenom.value.trim();

    if (!nom || !prenom){
     alert("Champs nom ou prénom vide !")
    }
    await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, prenom })
    });
    inputNom.value = '';
    inputPrenom.value = '';
    getUtilisateurs();
}
//##########################################################################
function comparerParChamp(champ, a, b) {
    let valA = a[champ];
    let valB = b[champ];
    return valA.localeCompare(valB, 'fr', { sensitivity: 'base' });
}

//##########################################################################
function trierUtilisateurs(users, champ) {
    return [...users].sort(comparerParChamp.bind(null, champ));
}
//##########################################################################
function trierParNom() {
    let triee = trierUtilisateurs(listeComplete, 'nom');
    afficherUtilisateurs(triee);
}
//##########################################################################
function trierParPrenom() {
    let triee = trierUtilisateurs(listeComplete, 'prenom');
    afficherUtilisateurs(triee);
}
//##########################################################################
form.addEventListener('submit', soumettreFormulaire);
btnTriNom.addEventListener('click', trierParNom);
btnTriPrenom.addEventListener('click', trierParPrenom);

getUtilisateurs();