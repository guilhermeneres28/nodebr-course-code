
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

const usuarioPromise = obterUsuario();
usuarioPromise
    .then(function(usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTElefone(result) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function(resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `);
    })
    .catch(function(error) {
        console.error('Deu ruim', error);
    })


// obterUsuario(1, function resolverUsuario(error, usuario) {
    
//     if(error) {
//         console.log('Deu erro', error);
//         return;
//     }

//         obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//             if(error1) {
//                 console.log('Deu erro no telefone');
//                 return;
//             }

//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if(error2) {
//                 console.log('Deu ruim no endereco', error2);
//                 return;
//             }
//         console.log(`
//             Nome usuario: ${usuario.nome}
//             Telefone usuario: (${telefone.ddd}), ${telefone.telefone}
//         `);

//         })
//     })
// });