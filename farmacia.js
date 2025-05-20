function validarLogin(event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;
    const errorMessage = document.getElementById("error-message");
    const errorPopup = document.getElementById("error-popup");

    // Limpar mensagem de erro anterior
    errorMessage.textContent = "";
    errorPopup.style.display = "none"; // Esconde o pop-up quando o formulário é validado

    if (!nome || !senha) {
        errorMessage.textContent = "Por favor, preencha todos os campos.";
        errorPopup.style.display = "flex"; // Exibe o pop-up
        errorPopup.style.opacity = "1"; // Torna o pop-up visível
        return;
    }

    const usuarioValido = "admigga";
    const senhaValida = "1234";

    if (nome === usuarioValido && senha === senhaValida) {
        errorPopup.style.display = "none"; // Esconde o pop-up ao ter sucesso no login
        window.location.href = "pagina-inicial.html"; // Redireciona para a página correta
    } else {
        errorMessage.textContent = "Usuário ou senha inválidos.";
        errorPopup.style.display = "flex"; // Exibe o pop-up
        errorPopup.style.opacity = "1";
    }}