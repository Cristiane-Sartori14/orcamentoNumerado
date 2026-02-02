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

function adicionarItem() {
    const tbody = document.getElementById("itens");

    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td><input type="number" min="1" value="1" class="qt" oninput="calcularTotais()"></td>
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

