import fs from "fs";
import chalk from "chalk";

function trataErro(erro) {
    throw new Error(erro)
}

function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8'

    fs.promises
    .readFile(caminhoDoArquivo, encoding)
    .then((texto) => console.log(chalk.green(texto)))
    .catch(trataErro)
}

/*
    function pegaArquivo(caminhoDoArquivo) {
        const encoding = 'utf-8'

        fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
            if (erro){
                console.log(erro);
                trataErro(chalk.red(erro.code, 'não há arquivo no diretório'))
            } else {
                console.log(chalk.green(texto));
            }
        })
    }
*/

pegaArquivo('./arquivos/texto.md')