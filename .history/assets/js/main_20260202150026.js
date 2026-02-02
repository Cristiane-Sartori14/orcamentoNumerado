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
    let seq = localStorage.getItem("orcamento_seq");

    seq = seq ? parseInt(seq) + 1 : 1;
    localStorage.setItem("orcamento_seq", seq);

    return `${ano}.${seq.toString().padStart(6, '0')}`;
}

document.getElementById("numeroOrcamento").innerText =
    "Orçamento nº " + gerarNumeroOrcamento();


function adicionarLinha() {
    const tbody = document.querySelector("#tabelaOrcamento tbody");
    const linha = tbody.insertRow();

    linha.innerHTML = `
        <td><input type="number" class="qtd" min="0" oninput="calcularTabela()"></td>
        <td><input type="text" class="desc"></td>
        <td><input type="number" class="valor" step="0.01" min="0" oninput="calcularTabela()"></td>
        <td class="total-item">R$ 0,00</td>
    `;
}

function calcularTabela() {
    const linhas = document.querySelectorAll("#tabelaOrcamento tbody tr");
    let totalGeral = 0;

    linhas.forEach(linha => {
        const qtd = parseFloat(linha.querySelector(".qtd").value) || 0;
        const valor = parseFloat(linha.querySelector(".valor").value) || 0;

        const totalItem = qtd * valor;

        linha.querySelector(".total-item").innerText =
            "R$ " + totalItem.toLocaleString('pt-BR', {
                minimumFractionDigits: 2
            });

        totalGeral += totalItem;
    });

function salvarOrcamento() {
    var linhas = document.querySelectorAll("#tabelaOrcamento tbody tr");
    var dados = [];
    
    linhas.forEach(function(linha) {
        dados.push({
            desc: linha.querySelector(".desc").value,
            qtd: linha.querySelector(".qtd").value,
            valor: linha.querySelector(".valor").value
        });
    });
    console.log(JSON.stringify(dados)); 
}