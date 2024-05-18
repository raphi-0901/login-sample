export class ShortOrderDtos{
  constructor(
    public id:number,
    public orderDate:Date,
    public eventNames:String[],
    public numberOfTickets:number,
  ) {
  }
}
