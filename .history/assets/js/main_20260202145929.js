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

function adicionarLinha() {
    var tabela = document.getElementById("tabelaOrcamento").getElementsByTagName('tbody')[0];
    var novaLinha = tabela.insertRow(tabela.rows.length);

    novaLinha.innerHTML = `
        <td><input type="text" class="input-box desc" placeholder="Item"></td>
        <td><input type="number" class="input-box qtd" value="0" oninput="calcularTabela()"></td>
        <td><input type="number" class="input-box valor" value="0.00" step="0.01" oninput="calcularTabela()"></td>
        <td class="total-item">0.00</td>
    `;
}

function calcularTabela() {
    var linhas = document.querySelectorAll("#tabelaOrcamento tbody tr");
    var totalGeral = 0;
  linhas.forEach(function(linha) {
                var qtd = parseFloat(linha.querySelector(".qtd").value) || 0;
                var valor = parseFloat(linha.querySelector(".valor").value) || 0;
                var totalItem = qtd * valor;

                // Atualiza o total da linha
                linha.querySelector(".total-item").innerText = toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                totalGeral += totalItem;
            });

            // Atualiza o total geral
            document.getElementById("totalGeral").innerText = toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

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