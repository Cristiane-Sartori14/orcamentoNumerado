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
        <td><input type="text" class="desc"></td>
        <td><input type="number" step="0.01" value="0" class="vl" oninput="calcularTotais()"></td>
        <td class="totalItem">0,00</td>
        <td><button onclick="removerItem(this)">X</button></td>
    `;

    tbody.appendChild(tr);

    calcularTotais();
}

function removerItem(botao) {
    botao.parentElement.parentElement.remove();
    calcularTotais();
}

function calcularTotais() {
    let totalGeral = 0;

    document.querySelectorAll("#itens tr").forEach(tr => {
        const qtd = parseFloat(tr.querySelector(".qt").value) || 0;
        const valor = parseFloat(tr.querySelector(".vl").value) || 0;

        const totalLinha = qtd * valor;

        tr.querySelector(".totalItem").innerText =
            "R$ " + totalLinha.toLocaleString('pt-BR', {
                minimumFractionDigits: 2
            });

        totalGeral += totalLinha;
    });

    document.getElementById("totalGeral").innerText =
        "R$ " + totalGeral.toLocaleString('pt-BR', {
            minimumFractionDigits: 2
        });
}

