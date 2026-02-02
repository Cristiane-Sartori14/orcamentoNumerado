//data atual
function dataPorExtenso() {
    const hoje = new Date();

    return hoje.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

document.getElementById("diaSemana").innerText = dataPorExtenso();

//gerar numero sequencial
function gerarNumeroOrcamento() {
    const anoAtual = new Date().getFullYear();

    const dados = JSON.parse(localStorage.getItem("orcamento_data")) || {
        ano: anoAtual,
        sequencial: 0
    };

    if (dados.ano !== anoAtual) {
        dados.ano = anoAtual;
        dados.sequencial = 0;
    }

    dados.sequencial++;

    localStorage.setItem("orcamento_data", JSON.stringify(dados));

    const numeroFormatado = dados.sequencial.toString().padStart(6, "0");

    return `${anoAtual}.${numeroFormatado}`;
}

// Exemplo:
console.log(gerarNumeroOrcamento());

//Calcular totais
//Validar dados
