const errorPopup = document.getElementById("error-popup");
const popupErrorMessage = document.getElementById("popup-error-message");

function validarLogin(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.toLowerCase();
    const senha = document.getElementById("senha").value;

    popupErrorMessage.textContent = "";
    errorPopup.style.display = "none";
    errorPopup.style.opacity = "0";

    if (!nome || !senha) {
        setTimeout(function () {
            popupErrorMessage.textContent = "Por favor, preencha todos os campos.";
            errorPopup.style.display = "flex";
            setTimeout(() => {
                errorPopup.style.opacity = "1";
            }, 100);
            setTimeout(() => {
                errorPopup.style.opacity = "0";
                setTimeout(() => {
                    errorPopup.style.display = "none";
                }, 300);
            }, 3000);
        }, 100);
        return;
    }

    const usuariosValidos = {
        thales: { password: "1234", fullName: "Thales Bellé" },
        aryel: { password: "1234", fullName: "Aryel Curi" }
    };

    if (usuariosValidos[nome] && senha === usuariosValidos[nome].password) {
        localStorage.setItem("loggedInUser", nome);
        localStorage.setItem("fullName", usuariosValidos[nome].fullName);
        errorPopup.style.display = "none";
        window.location.href = "../pagina-inicial/htmls/pagina-inicial.html";
    } else {
        setTimeout(function () {
            popupErrorMessage.textContent = "Usuário ou senha inválidos.";
            errorPopup.style.display = "flex";
            setTimeout(() => {
                errorPopup.style.opacity = "1";
            }, 100);
            setTimeout(() => {
                errorPopup.style.opacity = "0";
                setTimeout(() => {
                    errorPopup.style.display = "none";
                }, 300);
            }, 5000);
        }, 100);
    }
}