// sessão
function validarSessao() {
    let fktipoUsuario = sessionStorage.FK_TIPOUSUARIO;
    let usuario = sessionStorage.NOME_USUARIO

    if(fktipoUsuario == 1){
        console.log(`${usuario} é Gerente`)
    }
    else if(fkTipoUsuario == 2){
        console.log(`${usuario} é Analista`)
    }
    else{
        console.log(`${usuario} é Adimin`)
    }    
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}


