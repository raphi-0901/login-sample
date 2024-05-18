import {Ticket} from "./Ticket";

export class Order{
  constructor(
    public orderNumber:string,
    public purchaseDate: Date,
    public tickets: Ticket[],
  ) {
  }
}
