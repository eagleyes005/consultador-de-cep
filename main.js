const campoCEP = document.getElementById('cep');

const campoCidade = document.getElementById('cidade');
const campoLogradouro = document.getElementById('endereco');
const campoEstado = document.getElementById('estado');
const campoBairro = document.getElementById('bairro');
const campoDDD = document.getElementById('ddd');
const campoIBGE = document.getElementById('ibge');
const campoSIAFI = document.getElementById('siafi');

const campoErro = document.getElementById('erro');

async function buscaEndereco(CEP) {
    resetaCampos();
    
    try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${CEP}/json/`);  
    var consultaCEPJson = await consultaCEP.json();
    if (consultaCEPJson.erro) {
        throw Error('CEP não existente!');
    }

    prencheCampos(consultaCEPJson);

    return consultaCEPJson;
} catch (erro) {
    campoErro.innerHTML = `<p>CEP inválido!</p>`
    console.log(erro);
}
}

function prencheCampos(dados) {
    campoCidade.innerText = "Cidade: " + dados.localidade;
    campoLogradouro.innerText = "Logradouro: " + dados.logradouro;
    campoEstado.innerText = "Estado: " + dados.uf;
    campoBairro.innerText = "Bairro: " + dados.bairro;
    campoDDD.innerText = "DDD: " + dados.ddd;
    campoIBGE.innerText = "Código no IBGE: " + dados.ibge;
    campoSIAFI.innerText = "Código no SIAFI: " + dados.siafi;
}

function resetaCampos() {
    campoErro.innerHTML = "";
    campoCidade.innerText = "";
    campoLogradouro.innerText = "";
    campoEstado.innerText = "";
    campoBairro.innerText = "";
    campoDDD.innerText = "";
    campoIBGE.innerText = "";
    campoSIAFI.innerText = "";
}

campoCEP.addEventListener('focusout', () => buscaEndereco(cep.value));