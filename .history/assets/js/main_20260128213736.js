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
    const ano = new Date().getFullYear(); 

    let seq = localStorage.getItem("orcamento_seq")

    if (!seq) {
        seq = 1;
    } else {
        seq = parseInt(seq) +1;
    }

    localStorage.setItem("orcamento_seq", seq);

    return`${ano}.${seq.toString().padStart(6, '0')}`;
}

document.getElementById("numeroOrcamento").innerText = 
    "Orçamento nº " + gerarNumeroOrcamento();

//Calcular totais
//Validar dados
