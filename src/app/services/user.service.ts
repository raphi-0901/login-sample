import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Globals} from '../global/globals';
import {BlockUserRequest, BlockUserResponse, UserSearchDto, UserSearchPageDto} from "../dtos/user";
import {Message} from "../dtos/message";
import {Order} from "../dtos/userDtos/order";
import {UserDetail} from "../dtos/userDtos/user-detail";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUri: string = this.globals.backendUri + '/users';
  private userBaseUri: string = this.globals.backendUri + '/profile';

  constructor(private httpClient: HttpClient, private globals: Globals) {

  }

  search(searchParams: UserSearchDto): Observable<UserSearchPageDto> {
    let params = new HttpParams();

    if (searchParams.searchString) {
      params = params.append('searchString', searchParams.searchString);
    }

    if (searchParams.sort) {
      params = params.append('sort', searchParams.sort);
    }

    params = params.append('page', searchParams.page);
    params = params.append('pageSize', searchParams.pageSize);
    params = params.append('orderAsc', searchParams.orderAsc);


    return this.httpClient.get<UserSearchPageDto>(this.baseUri, { params });
  }

  getProfile(): Observable<UserDetail>{
    console.log('Load user profile')
    return this.httpClient.get<UserDetail>(this.userBaseUri);
  }
  getOrder(): Observable<Order[]> {
    console.log('Load orders for user');
    return this.httpClient.get<Order[]>(this.userBaseUri + '/order');
  }
  getUserData(): Observable<UserDetail>{
    console.log('Load user data');
    return this.httpClient.get<UserDetail>(this.userBaseUri + '/details');
  }

  deleteUser(): Observable<Object> {
    console.log('Delete user');
    return this.httpClient.delete(this.userBaseUri);
  }

  /**
   * Blocks a user.
   *
   * @param blockUserRequest User data
   */
  blockUser(blockUserRequest: BlockUserRequest): Observable<BlockUserResponse> {
    return this.httpClient.put<BlockUserResponse>(`${this.baseUri}/block`, blockUserRequest, {responseType: 'json'});
  }

  /**
   * Unblocks a user.
   *
   * @param blockUserRequest User data
   */
  unblockUser(blockUserRequest: BlockUserRequest): Observable<BlockUserResponse> {
    return this.httpClient.put<BlockUserResponse>(`${this.baseUri}/unblock`, blockUserRequest, {responseType: 'json'});
  }
}
