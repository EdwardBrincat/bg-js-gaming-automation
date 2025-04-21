class StoreModel {
    constructor(id, petId, quantity, shipDate, status, complete) {
        this.id = id;
        this.petId = petId;
        this.quantity = quantity;
        this.shipDate = shipDate;
        this.status = status;
        this.complete = complete;
    }   
}

class InventoryResponse {
    constructor(sold, The_Best_Dog_of_World, string, pending, available, invalid) {
        this.sold = sold;
        this.The_Best_Dog_of_World = The_Best_Dog_of_World;
        this.string = string;
        this.pending = pending;
        this.available = available;
        this.invalid = invalid;
    }   
}

class OrderRequest extends PetModel { }

class OrderResponse extends PetModel { }