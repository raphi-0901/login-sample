export class UserSearchDto {
  searchString?: string;
  page: number;
  pageSize: number;
  sort?: string;
  orderAsc: boolean = true;
}

export class UserSearchPageDto {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  users: SimpleUserDto[];
}

export type SimpleUserDto = {
  id: number;
  email: string;
  name: string;
  blocked: boolean;
}

export type BlockUserRequest = {
  email: string
}

export type BlockUserResponse = SimpleUserDto
