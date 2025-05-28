export default function tratarErro (erro){
    if(erro.code === 'ENOENT'){
        throw new Error ('Arquivo não encontrado.');
    } else {
        return 'Erro não esperado.'
    }
}

//jeito antigo de exportar
//module.exports = tratarErro; 

