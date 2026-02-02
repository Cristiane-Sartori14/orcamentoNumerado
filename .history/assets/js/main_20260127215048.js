function gerarNumeroOrcamento() {
    const ano = new Date().getFullYear();

    let sequencial = localStorage.getItem("orcamento_sequencial");

    if (!sequencial) {
        sequencial = 1;
    } else {
        sequencial = parseInt(sequencial) + 1;
    }

    localStorage.setItem("orcamento_sequencial", sequencial);

    const sequencialFormatado = sequencial.toString().padStart(6, "0");

    return `${ano}.${sequencialFormatado}`;
}

// Exemplo de uso:
const numeroOrcamento = gerarNumeroOrcamento();
console.log(numeroOrcamento);
