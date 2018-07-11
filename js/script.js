//Mascara nos inputs
$('.telefone').mask('(00) 0 0000-0000');
$('.week-value').mask('#.##0,00', {reverse: true});
$('#cep').mask('00000-000');


//Modal para formulario de cadastro completo
$('.bs-example-modal-lg', '.modal-notification').on('shown.bs.modal', function () {
    $('#myInput').focus()
    document.getElementById('name2').value=(nome.value);
})

/*Função para o formato de data
function formatarData(data) {
    var d = new Date(data),
        mes = '' + (d.getMonth() + 1),
        dia = '' + (d.getDate() + 1),
        ano = d.getFullYear();

    if (mes.length < 2) mes = '0' + mes;
    if (dia.length < 2) dia = '0' + dia;

    return [dia, mes, ano].join('-');
}*/


//Preencher o cadastro no formulário do modal
var nome = document.getElementById('name')
var email = document.getElementById('email')
var telefone = document.getElementById('telefone')
var nascimento = document.getElementById('nascimento')
var genero = document.getElementById('genero')
document.getElementById("btn-click-modal").addEventListener("click", function(){
    document.getElementById('name2').value = (nome.value);
    document.getElementById('email2').value = (email.value);
    document.getElementById('telefone2').value = (telefone.value);
    document.getElementById('nascimento2').value = (nascimento.value);
    document.getElementById('genero2').value = (genero.value);
});


//Autocomplete através do CEP
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('logradouro').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouro').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('estado').value=(conteudo.uf);
    } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
}

function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouro').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('estado').value="...";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
    } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
};

//Função para o deadline antes de confirmar
function changeSelect(valor){
    console.log(valor);
    if (valor === "preReserva"){
        $('#deadline-form').attr('style', 'display: block');
        $('#reserva-form').removeClass('col-md-offset-3').addClass('col-md-offset-1');
    }else{
        $('#deadline-form').attr('style', 'display: none');
        $('#reserva-form').removeClass('col-md-offset-1').addClass('col-md-offset-3');
    }
}