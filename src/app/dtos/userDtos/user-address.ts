export class UserAddress {
  constructor(
    public streetAndNumber: string,
    public postCode: number,
    public city: string,
    // TODO: countries should be more than just a string, maybe an enum or something similar
    public country: string,
  ) {}
}
