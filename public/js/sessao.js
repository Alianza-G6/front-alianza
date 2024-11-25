// sessão
function validarSessao() {
    let fktipoUsuario = sessionStorage.FK_TIPOUSUARIO;
    let usuario = sessionStorage.NOME_USUARIO
    const permissaoCadastrarFuncionario = document.getElementById("PermissaoCadastrarFuncionario");


    if (fktipoUsuario != 1) {
        permissaoCadastrarFuncionario.style.display = "none";
    }
}

    function limparSessao() {
        sessionStorage.clear();
        window.location = "../login.html";
    }


