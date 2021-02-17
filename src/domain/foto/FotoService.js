export default class FotoService {

  constructor(resource) {

    this._resource = resource('v1/fotos{/id}');
  }

  lista() {

    return this._resource
      .query()
      .then(res => res.json(), err => { 
        console.log(err);
        throw new Error('Não foi possível obter as fotos');
      });
      // Essa linha retorna uma promisse, quando a lista() for chamada, essa promisse 
      //estará pronta para ser usada, sem precisar transformar em json.
  }

  apaga(id) {

    return this._resource
      .delete({ id })
      .then(null, err => {
        console.log(err);
        throw new Error('Não foi possível remover a foto');
      })
      // o 'id' é o mesmo instanciado no construtor, e como chave e valor tem mesmo nome, não 
      //é necessário manter id: id.
  }

  cadastra(foto) {

    if(foto._id) {

      return this._resource
        .update({ id: foto._id}, foto);

    } else {

      return this._resource
        .save(foto);
    }

  }

  busca(id) {
    
    return this._resource
    .get({ id })
    .then(res => res.json());
  }
}