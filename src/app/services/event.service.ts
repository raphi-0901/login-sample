import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import {Globals} from '../global/globals';
import {Event, EventDetails, Seat} from '../dtos/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventBaseUri: string = this.globals.backendUri + '/events';

  constructor(private httpClient: HttpClient, private globals: Globals) {
  }


  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.eventBaseUri);
  }

  getEventDetails(id: number): Observable<EventDetails> {
    return this.httpClient.get<EventDetails>(`${this.eventBaseUri}/${id}`);
  }

  updateSeatStatus(eventId: number, seat: Seat) {
    return null;
    // return this.httpClient.get<EventDetails>(`${this.eventBaseUri}/${id}`);
  }
}
