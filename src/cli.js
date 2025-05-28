//jeito antigo de importar
//const tratarErro = require('./erro/funcoesErro.js');

import fs from 'fs';
import tratarErro from './erro/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaArquivo } from './helpers.js';
import { Command } from 'commander';
import path from 'path';
import chalk from 'chalk';

// const caminhoArquivo = process.argv;
// const link = caminhoArquivo[2];
// const endereco = caminhoArquivo[3];

// //para chamar o arquivo, preciso passar o comando node, o arquivo js e o link do outro arquivo a ser lido.

// fs.readFile(link, 'utf-8', (erro, texto) => {
//     try{
//         if(erro) throw erro;
//         const resultado = contaPalavras(texto);
//         criaSalvaArquivo(resultado, endereco);
//     } catch(erro){
//         tratarErro(erro);       
//     }
// });

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --textoLink <string>', 'Caminho do texto a ser processado.')
    .option('-d, --destinoLink <string>','Caminho da pasta onde salvar o arquivo de resultados.')
    .action((options) =>{
        const { textoLink, destinoLink } = options;

        if (!textoLink){
            console.error(chalk.red('erro: favor inserir caminho de origem'));
            program.help();
            return;
        }

          if (!destinoLink){
            console.error(chalk.red('erro: favor inserir caminho de destino'));
            program.help();
            return;
        }

        const nomeArquivo = textoLink.split('/')[1];
        
        const caminhoTexto = path.resolve(textoLink);
        const caminhoDestino = path.resolve(destinoLink);

        try{
            processaArquivo(caminhoTexto,caminhoDestino, nomeArquivo);
            console.log(chalk.green('Texto processado com sucesso.'));
            
        } catch(erro){
            console.log(chalk.red('ocorreu um erro no processamento'), erro);
        }

    });

program.parse();

function processaArquivo(textoLink, destinoLink, nomeArquivo){
    fs.readFile(textoLink, 'utf-8', (erro, texto) => {
        try{
            if(erro) throw erro;          
            const resultado = contaPalavras(texto);
            criaSalvaArquivo(resultado, destinoLink, nomeArquivo);
        } catch(erro){
            tratarErro(erro);       
        }
    });
}

// async function criaSalvaArquivo (listaPalavras, endereco){
//     const arquivoNovo = `${endereco}/resultado.txt`;
//     const textoPalavras = JSON.stringify(listaPalavras);
//     try{
//         await fs.promises.writeFile(arquivoNovo, textoPalavras);
//         console.log('Arquivo criado.');
//     } catch (erro){
//         throw erro;
//     }
// }

function criaSalvaArquivo (listaPalavras, endereco, nomeArquivo){
    const arquivoNovo = `${endereco}/resultado_${nomeArquivo}`;
    const textoPalavras = montaArquivo(listaPalavras);
    
    fs.promises.writeFile(arquivoNovo, textoPalavras).then(()=>{
        //processamento feito com o resultado da promessa
        console.log(chalk.green('Arquivo criado.'));        
    }).catch((erro) => {
        throw erro
    }).finally(() => console.log(chalk.blue('Operação finalizada.')))
}

