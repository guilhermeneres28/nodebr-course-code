function obterUsuario(id, callback) {
    setTimeout(() =>  {
        return callback(null, {
            id: 1,
            nome: 'Guilherme',
            dataNascimento: new Date()
        });
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(function() {
        return callback(null, {
            telefone: '119990032',
            ddd: 11
        });
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(function() {
        return callback(null, {
            rua: 'Rua qualquer',
            numero: '1234'
        });
    }, 2000);
}

obterUsuario(1, function resolverUsuario(error, usuario) {
    
    if(error) {
        console.log('Deu erro', error);
        return;
    }

        obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
            if(error1) {
                console.log('Deu erro no telefone');
                return;
            }

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error2) {
                console.log('Deu ruim no endereco', error2);
                return;
            }
        console.log(`
            Nome usuario: ${usuario.nome}
            Telefone usuario: (${telefone.ddd}), ${telefone.telefone}
        `);

        })
    })
});