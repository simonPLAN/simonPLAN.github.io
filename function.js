// Compteur de bonne réponse
let cpt_player=0;
// Compteur du nombre de question effectué
let cpt_tot=0;
// Question de manière aléatoire
let val = 0;
let img;

// Affiche si la réponse donné est bonne ou fausse
function printResponse(mode) {
    let rep = document.getElementById("reponseInput").value;
    if (mode === "Facile"){
        return strResponse(rep.localeCompare(data.Facile[val].reponse), mode);
    }
    else if (mode === "Normal"){
        return strResponse(rep.localeCompare(data.Moyen[val].reponse), mode);
    }
    else {
        return strResponse(rep.localeCompare(data.Difficile[val].reponse), mode);
    }
}
//Méthode de vérification pour lecture
function compareResponse(mode){
    let i;
    let v;
    if (mode === "Facile"){
        v = (data.Facile[val].reponse).length;
    }
    else if (mode === "Normal"){
        v = (data.Moyen[val].reponse).length;
    }
    else {
        v = (data.Difficile[val].reponse).length;
    }

    let rep = (document.getElementById("reponseInput").value).toUpperCase();
    let tmp = rep.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ");
    let repo = tmp.split(' ');

    if (mode === "Facile"){
        for(i = 0; i < v; i++){
            if (repo.indexOf(data.Facile[val].reponse[i]) < 0) {
                return strResponse(1, mode);
            }
        }
    }

    else if (mode === "Normal"){
        for(i = 0; i < v; i++){
            if (repo.indexOf(data.Moyen[val].reponse[i]) < 0) {
                return strResponse(1, mode);
            }
        }
    }

    else {
        for(i = 0; i < v; i++){
            if (repo.indexOf(data.Difficile[val].reponse[i]) < 0) {
                return strResponse(1, mode);
            }
        }
    }
    return strResponse(0, mode);
}

//Affichage de la réponse si elle est fausse
function strResponse(value, mode){
    document.getElementById("reponseInput").value = ""
    if(value){
        document.getElementById("printRes").innerHTML = "Réponse fausse";
        if (mode === "Facile"){
            document.getElementById("res").innerHTML = "La réponse à "+ data.Facile[val].question + data.Facile[val].reponse;
        }
        else if (mode === "Normal"){
            document.getElementById("res").innerHTML = "La réponse à "+ data.Moyen[val].question + data.Moyen[val].reponse;
        }
        else {
            document.getElementById("res").innerHTML = "La réponse à "+ data.Difficile[val].question + data.Difficile[val].reponse;
        }
    }
    else{
        document.getElementById("printRes").innerHTML = "Réponse bonne";
        document.getElementById("res").innerHTML = "";
        cpt_player++;
    }
    printScore(cpt_tot++);
}

// Affichage du score du joueur
function printScore(){
    document.getElementById("cpt").innerHTML = cpt_player + "/" + cpt_tot;
}


// Affichage des questions
function printQuestion(mode){
    if (mode === "Facile"){
        document.getElementById("question").innerHTML = data.Facile[val].question;
    }
    else if (mode === "Normal"){
        document.getElementById("question").innerHTML = data.Moyen[val].question;
    }
    else {
        document.getElementById("question").innerHTML = data.Difficile[val].question;
    }
}

// Affichage des aides
function printaideEcriture(mode){
    if (mode === "Facile"){
        document.getElementById("possibilite").innerHTML = data.Facile[val].aide;
    }
    else if (mode === "Normal"){
        document.getElementById("possibilite").innerHTML = data.Moyen[val].aide;
    }
    else {
        document.getElementById("possibilite").innerHTML = data.Difficile[val].aide;
    }
}




function majbouton(mode) {

    var elem = document.getElementById("b1");
    if (elem.value=="1") elem.value = "2";
    else elem.value = "1";


    let rep = document.getElementById("b1").value="Close Curtain";
    if (mode === "Facile"){
        return strResponse(rep.localeCompare(data.Facile[val].reponse), mode);
    }
    else if (mode === "Normal"){
        return strResponse(rep.localeCompare(data.Moyen[val].reponse), mode);
    }
    else {
        return strResponse(rep.localeCompare(data.Difficile[val].reponse), mode);
    }
}





// Mise a jour de la page après clic sur button validé
function update(mode){
    stopGame(10);
    printResponse(mode);
    val+=1;
    printQuestion(mode);
    deleteImage();
    printImage();
}
// Mise a jour de la page après clic sur button validé

function updateEcriture(mode,value){

    // document.write(document.getElementById("b1").valueOf());
    stopGame(10);
    printResponse(mode);
    printaideEcriture(mode);
    majbouton(mode);
    val+=1;
    printQuestion(mode);
    printaideEcriture(mode);
}

// Mise a jour de la page de lecture après clic sur button valider
function updateLecture(mode){
    stopGame(5);
    compareResponse(mode);
    val+=1;
    printQuestion(mode);
}

// Affichage d'une image
function printImage(){
    img = document.createElement("img");
    img.src = data.Facile[val].image;

    let div = document.getElementById("image");
    div.appendChild(img);
    img.setAttribute("style", "width: 240px;");
}

// Affichage d'un texte
function printTexte(mode){
    if (mode === "Facile"){
        document.getElementById("texte").innerHTML = data.Facile[val].texte;
    }
    else if (mode === "Normal"){
        document.getElementById("texte").innerHTML = data.Moyen[val].texte;
    }
    else {
        document.getElementById("texte").innerHTML = data.Difficile[val].texte;
    }
}

// Suppression de l'image
function deleteImage(){
    let div = document.getElementById("image");
    div.removeChild(img);
}

// Arrete le jeu lorsque un nombre de question est atteint et revient au menu principale
function stopGame(limite){
    if(limite === cpt_tot){
        alert("Votre score : " + cpt_player + "/" + cpt_tot);
        window.location.href = "index.html"
    }
}

//Forcer utilisateur entrer un nombre
function onlyNumberKey(evt) {

    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}
