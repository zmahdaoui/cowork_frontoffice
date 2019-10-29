export class ReservationReq {
    location: string;
    type: string;
    start: number;
    end: number;
    date_res: string;
    number: number;
    id_user: number;

    constructor(location: string, type: string, start: number, end: number, date_res: string, number: number, id_user: number){
      this.location = location;
      this.type = type;
      this.start = start;
      this.end = end;
      this.date_res = date_res;
      this.number = number;
      this.id_user = id_user;
    }
  }