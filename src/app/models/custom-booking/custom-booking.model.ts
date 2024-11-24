export class CustomBooking {
    id?:string;
    customerId?:string | null;
    customerName?:string;
    breakfast?:string;
    lunch?:string;
    dinner?:string;
    days?:string;
    finalPrice?:string;
    // start?:Date;
    start?:string;
    // end?:Date;
    end?:string;
    createdAt?:Date;
    status?:boolean;
}
