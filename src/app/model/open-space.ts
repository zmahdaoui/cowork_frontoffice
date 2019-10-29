export class OpenSpace {
    id: number;
    location: string;
    wifi: boolean;
    drink: boolean;
    plateau_repas: boolean;
    conf_room: number;
    call_room: number;
    cosy_room: number;
    printers: number;
    laptops: number;
    schedule_mt: string;
    schedule_f: string;
    schedule_we: string;
    adresse: string;

    constructor(id: number, location: string, wifi: boolean, drink: boolean, plateau_repas: boolean, conf_room: number, call_room: number, cosy_room: number, printers: number, laptops: number, schedule_mt: string, schedule_f: string, schedule_we: string, adresse: string){
        this.id = id;
        this.location = location;
        this.wifi = wifi;
        this.drink = drink;
        this.plateau_repas = plateau_repas;
        this.conf_room = conf_room;
        this.call_room = call_room;
        this.cosy_room = cosy_room;
        this.printers = printers;
        this.laptops = laptops;
        this.schedule_mt = schedule_mt;
        this.schedule_f = schedule_f;
        this.schedule_we = schedule_we;
        this.adresse = adresse;
    }
  }
