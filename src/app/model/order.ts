export class Order {
    id: number;
    location: string;
    date_order: string;
    user_id: number;
    count: number;
    time: string;

    constructor(id: number, location: string, date_order: string, user_id: number, count: number, time: string){
        this.id = id;
        this.location = location;
        this.date_order = date_order;
        this.user_id = user_id;
        this.count = count;
        this.time = time;
    }
  }