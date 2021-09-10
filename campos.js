function formatarCampo(campoTexto) {
    if (campoTexto.value.length <= 11) {
        campoTexto.value = mascaraCpf(campoTexto.value);
        console.log("É CPF.");
        var numeroInputCPF = $("input[name='numeroDocumento']").val();
        $("input[name='cpf']").val(numeroInputCPF);
        $(".nomeCPF").toggleClass("hide");
        $(".tipoCadastro span").html("Pessoa Física");
        $(".campoGeral").toggleClass("hide");
    }
    
    
    
    else {
        campoTexto.value = mascaraCnpj(campoTexto.value);
        console.log("É CNPJ.");
        var numeroInputcnpj = $("input[name='numeroDocumento']").val();
        $("input[name='cnpj']").val(numeroInputcnpj);
        $(".nomeCNPJ").toggleClass("hide");
        var CNPJpreenchido = $("input[name='cnpj']").val();
        $(".tipoCadastro span").html("Pessoa Jurídica");
        $(".campoGeral").toggleClass("hide");

        // O CNPJ pode ou não conter caracteres não númericos (como pontos, barra e traço)
        consultaCNPJ(CNPJpreenchido).then((json) => {
            console.log(json);
            $("input[name='razaoSocial']").val(json.nome);
            $("input[name='cep']").val(json.cep);

        }, (erro) => {
            console.log('ERRO:', erro);
        });

        }




}
function retirarFormatacao(campoTexto) {
    campoTexto.value = campoTexto.value.replace(/(\.|\/|\-)/g,"");
}
function mascaraCpf(valor) {
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
}
function mascaraCnpj(valor) {
    return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
}