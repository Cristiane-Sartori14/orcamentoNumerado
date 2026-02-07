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

    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td><input type="text" class="desc"></td>
        <td><input type="number" class="qtd" value="0" oninput="calcularTabela()"></td>
        <td><input type="number" class="valor" value="0" step="0.01" oninput="calcularTabela()"></td>
        <td class="totalItem">R$ 0,00</td>
    `;

    tbody.appendChild(tr);
}

function calcularTabela() {
const linhas = document.querySelectorAll("#tabelaOrcamento tbody tr");
    let totalGeral = 0;

    linhas.forEach(linha => {
        const qtd = parseFloat(linha.querySelector(".qtd")?.value) || 0;
        const valor = parseFloat(linha.querySelector(".valor")?.value) || 0;

        const totalItem = qtd * valor;

        linha.querySelector(".totalItem").innerText =
            totalItem.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

        totalGeral += totalItem;
    });

    document.getElementById("totalGeral").innerText =
        totalGeral.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
}

// function salvarOrcamento() {

//     const numero = document.getElementById("numeroOrcamento").innerText;
//     const cliente = document.getElementById("clienteNome").value;
//     const cpf = document.getElementById("clienteCpf").value;
//     const total = document.getElementById("totalGeral").innerText;

//     const linhas = document.querySelectorAll("#tabelaOrcamento tbody tr");

//     const itens = [];

//     linhas.forEach(linha => {
//         itens.push({
//             descricao: linha.querySelector(".desc").value,
//             quantidade: linha.querySelector(".qtd").value,
//             valorUnitario: linha.querySelector(".valor").value
//         });
//     });

//     const orcamento = {
//         numero,
//         data: dataPorExtenso(),
//         cliente,
//         cpf,
//         total,
//         itens
//     };
// }

//     // salva no localStorage
//     localStorage.setItem("ultimo_orcamento", JSON.stringify(orcamento));

//     console.log("Orçamento salvo:", orcamento);

//     alert("Orçamento salvo com sucesso!");
// }

function gerarPDF() {
    window.print();
}
