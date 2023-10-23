import chalk from "chalk";
import fs from 'fs';
import pegaArquivo from "./index.js";

const caminho = process.argv

async function imprimeLista(valida, resultado, identificador = '') {

    if(valida){
        console.log(
            chalk.yellow('Lista de Links:'),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));
    } else {
        console.log(
            chalk.yellow('Lista de Links:'),
            chalk.black.bgGreen(identificador),
            resultado);
    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida'
    console.log(valida);

    try{
        fs.lstatSync(caminho)
    } catch (erro){
        if (erro.code === "ENOENT") {
            console.log(chalk.red('arquivo ou diretório não existe'));
            return
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(argumentos[2])
        imprimeLista(valida, resultado)
    } else if(fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDoArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`)
            imprimeLista(valida, lista, nomeDoArquivo)
        })  
    }
}

processaTexto(caminho)