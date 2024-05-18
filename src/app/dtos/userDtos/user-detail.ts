import {UserAddress} from "./user-address";
import {ShortOrderDtos} from "./ShortOrderDtos";

export class UserDetail {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public addressDto: UserAddress,
    public shortOrderDtos:ShortOrderDtos[],
    ) {}
}
