export default class FotoService {

  constructor(resource) {

    this._resource = resource('v1/fotos{/id}');
  }

  lista() {

    return this._resource
      .query()
      .then(res => res.json());
      // Essa linha retorna uma promisse, quando a lista() for chamada, essa promisse 
      //estará pronta para ser usada, sem precisar transformar em json.
  }

  apaga(id) {

    return this._resource.delete({ id });
    // o 'id' é o mesmo instanciado no construtor, e como chave e valor tem mesmo nome, não 
    //é necessário manter id: id.
  }

  cadastra(foto) {

    return this._resource
      .save(foto);
  }
}