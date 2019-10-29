export class Abonnement {
    id: number;
    name: string;
    price: number;
    commitment: boolean;

    constructor(id: number, name: string, price: number, commitment: boolean){
        this.id = id;
        this.name = name;
        this.price = price;
        this.commitment = commitment;
    }
  }