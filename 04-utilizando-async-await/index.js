
const util = require('util')

const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() =>  {
            return resolve({
                id: 1,
                nome: 'Guilherme',
                dataNascimento: new Date()
            });
        }, 1000);
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
            return resolve({
                telefone: '99999999',
                ddd: 61
            });
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(function() {
        return callback(null, {
            rua: 'Endereço Guilherme',
            numero: '175'
        });
    }, 2000);
}

main();
async function main() {
    try {
        const usuario = await obterUsuario();
        const telefone = await obterTelefone(usuario.id);
        const endereco = await obterEnderecoAsync(usuario.id);

        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereco: ${endereco.numero}, ${endereco.rua}
        `);
    } catch(error) {
        console.error('Deu erro', error);
    }

}


// const usuarioPromise = obterUsuario();
// usuarioPromise
//     .then(function(usuario) {
//         return obterTelefone(usuario.id)
//             .then(function resolverTElefone(result) {
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                         id: usuario.id
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function resolverEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         })
//     })
//     .then(function(resultado) {
//         console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//         `);
//     })
//     .catch(function(error) {
//         console.error('Deu ruim', error);
//     })