class PetModel {
    constructor(id, category, name, photoUrls, tags, status) {
      this.id = id;
      this.category = category;
      this.name = name;
      this.photoUrls = photoUrls;
      this.tags = tags;          
      this.status = status;
    }
}

class Category {
    constructor(id, name) {
      this.id = id;
      this.name = name;
    }
  }
  
class Tag {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class GeneralResponse {
  constructor(code, type, message) {
    this.code = code;
    this.type = type;
    this.message = message;
  }
}


class AddPetRequest extends PetModel { }

class AddPetResponse extends PetModel { }
  