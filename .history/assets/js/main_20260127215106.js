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
