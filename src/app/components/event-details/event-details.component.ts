import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {EventService} from "../../services/event.service";
import {ActivatedRoute} from "@angular/router";
import {Auditorium, EventDetails, Seat, SeatStatus, SeatType} from "../../dtos/event";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit {
  constructor(private eventService: EventService, private toastr: ToastrService, private route: ActivatedRoute) {
  }

  event: EventDetails | null;
  selectedSeats: Seat[] = [];

  onSeatSelected(seat: Seat) {
    this.selectedSeats.push(seat)
  }

  onSeatUnselected(seat: Seat) {
    this.selectedSeats = this.selectedSeats.filter(selectedSeat => selectedSeat.id !== seat.id)
  }

  getRandomSeatStatus = (): SeatStatus => {
    const statuses = Object.values(SeatStatus).filter(status => status !== SeatStatus.SELECTED);
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex] as SeatStatus;
  }

  getRandomCategory = () => {
    return Math.floor(Math.random() * 3)
  }

  ngOnInit(): void {
    // this.eventService.getEventDetails(this.route.params['id']).subscribe((response: EventDetails) => {
    //   this.data = response;
    // });

    const seatCategories = [
      {
        id: 1,
        color: "#fff",
        name: "Premium",
        price: 2000,
      },
      {
        id: 2,
        color: "#cdcdcd",
        name: "Basic",
        price: 2000,
      },
      {
        id: 3,
        color: "#ae4dfe",
        name: "Karla",
        price: 2000,
      }
    ]

    this.event = {
      id: 1,
      name: 'Something',
      startTime: new Date(),
      description: 'Desc',
      seatCategories: [
        {
          id: 1,
          color: "#fff",
          name: "Premium",
          price: 2000,
        },
        {
          id: 2,
          color: "#cdcdcd",
          name: "Basic",
          price: 2000,
        },
        {
          id: 3,
          color: "#ae4dfe",
          name: "Karla",
          price: 2000,
        }
      ],
      auditorium: {
        id: 1,
        image: "",
        name: "Haupthalle",
        sectors: [
          {
            id: 1,
            type: SeatType.STANDING,
            name: "First",
            rows: Array.from({length: 5}, (_, rowIndex) => ({
              number: rowIndex + 1,
              seats: Array.from({length: 8}, (_, seatIndex) => ({
                id: seatIndex,
                number: seatIndex + 1,
                row: rowIndex + 1,
                label: `${seatIndex + 1}`,
                sector: "First",
                category: seatCategories[this.getRandomCategory()],
                type: SeatType.SEATING,
                status: this.getRandomSeatStatus()
              }))
            }))
          }
        ]
      }
    }
  }
}
