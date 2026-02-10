//data atual
function dataPorExtenso() {
  const hoje = new Date();
  return hoje.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

document.getElementById("diaSemana").innerText = dataPorExtenso();

function gerarNumeroOrcamento() {
  const ano = new Date().getFullYear();
  let seq = localStorage.getItem("orcamento_seq");

  seq = seq ? parseInt(seq) + 1 : 1;
  localStorage.setItem("orcamento_seq", seq);

  return `${ano}.${seq.toString().padStart(6, "0")}`;
}

document.getElementById("numeroOrcamento").innerText =
  "Orçamento nº " + gerarNumeroOrcamento();

function adicionarLinha() {
  const tbody = document.querySelector("#tabelaOrcamento tbody");

  const tr = document.createElement("tr");

  tr.innerHTML = `
        <td><input type="text" class="desc"></td>
        <td><input type="number" class="qtd" value="0"></td>
        <td><input type="number" class="valor" value="0" step="0.01"></td>
        <td class="totalItem">R$ 0,00</td>
        <td class="acao"><button class="remover">✖</button></td>
    `;

  tbody.appendChild(tr);

  tr.querySelector(".qtd").addEventListener("input", calcularTabela);
  tr.querySelector(".valor").addEventListener("input", calcularTabela);

  tr.querySelector(".remover").addEventListener("click", () => {
    tr.remove();
    calcularTabela();
  });
}
function calcularTabela() {
  const linhas = document.querySelectorAll("#tabelaOrcamento tbody tr");
  let totalGeral = 0;

  linhas.forEach((linha) => {
    const qtd = parseFloat(linha.querySelector(".qtd")?.value) || 0;

    const valor = parseFloat(
      linha.querySelector(".valor")?.value.replace(",", ".")
    ) || 0;

    const totalItem = qtd * valor;

    linha.querySelector(".totalItem").innerText =
      totalItem.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

    totalGeral += totalItem;
  });

  document.getElementById("totalGeral").innerText =
    totalGeral.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
}

document.querySelectorAll(".qtd, .valor").forEach((input) => {
  input.addEventListener("input", calcularTabela);
});

const vendedores =  {
  Cristiane: {
    nome: "Cristiane",
    whats: "51 99534-1198",
    email: "cristiane@bellenzier.com.br"
  },

  Allan: {
    nome: "Allan",
    whats: "51 99997-6993",
    email: "allan@bellenzier.com.br"
  },

  Gabriel: {
    nome: "Gabriel",
    whats: "51 99893-7118",
    email: "gabriel@bellenzier.com.br"
  },

   Bernardo: {
    nome: "Bernardo",
    whats: "51 99568-9158",
    email: "bernardo.padoin@bellenzier.com.br"
  },
}

function gerarPDF() {
  window.print();
}
