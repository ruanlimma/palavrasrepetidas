export function contaPalavras(texto){
    const paragrafoLista = extraiParagrafo(texto)
    const contagem = paragrafoLista.flatMap((paragrafo)=>{
        if (!paragrafo) return [];
        return verifiPalavraDuplicada(paragrafo);
    })
    return contagem; 
}

function extraiParagrafo (texto){
    return texto.toLowerCase().split('\n');
}

function verifiPalavraDuplicada(texto){
    const resultado ={};
    const palavras = texto.split(' ');
    palavras.forEach(palavra => {
        const palavraLimpa = limpaPalavras(palavra);
        if (palavraLimpa.length >= 3){
            //criando com zero ou puxando o valor existente e depois, somando +1
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) +1;
        }
    });
    return resultado;
}

function limpaPalavras(palavra){
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}



    // O flatMap retorna um novo array modificando um existente, igual o map, mas também possui a funciolidade do flat, que pega o array de dentro de outro array e faz uma espécie de concatenação, juntando os valores do array externo e interno. No caso, ele também concatena os arrays vazios.