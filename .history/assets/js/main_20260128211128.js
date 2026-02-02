//data atual
function getDiaSemanaTexto (diaSemana) {
    let diaSemanaTexto;

    switch (diaSemana) {
    case 0:
        diaSemanaTexto = 'Domingo';
        return diaSemanaTexto;
    case 1:
        diaSemanaTexto = 'Segunda-feira';
        return diaSemanaTexto;
    case 2:
        diaSemanaTexto = 'Terça-feira';
       return diaSemanaTexto;  
    case 3:
        diaSemanaTexto = 'Quarta-feira';
        return diaSemanaTexto;
    case 4:
        diaSemanaTexto = 'Quinta-feira';
        return diaSemanaTexto;
    case 5:
        diaSemanaTexto = 'Sexta-feira';
       return diaSemanaTexto;
    case 6:
        diaSemanaTexto = 'Sábado';
        return diaSemanaTexto;
    default:
        diaSemanaTexto = '';              
    }
}

const data = new Date();
const diaSemana = data.getDay();
const diaSemanaTexto = getDiaSemanaTexto(diaSemana);
console.log(diaSemana, diaSemanaTexto);


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
