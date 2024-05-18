import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Seat, SeatCategory, SeatStatus, Sector} from "../../dtos/event";
import {EventService} from "../../services/event.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.scss'
})
export class SeatSelectionComponent implements OnInit {
  @Input() sectors: Sector[];
  @Input() seatCategories: SeatCategory[];
  @Output() onSeatUnselected: EventEmitter<Seat> = new EventEmitter<Seat>();
  @Output() onSeatSelected: EventEmitter<Seat> = new EventEmitter<Seat>();

  availableSectorNames: string[] | null;
  selectedSector: Sector | null;

  constructor(private eventService: EventService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.availableSectorNames = this.sectors.map(auditorium => auditorium.name);
    this.selectedSector = this.sectors[0];
  }

  get seatsPerRow() {
    return this.selectedSector.rows[0].seats.length
  }

  get gridTemplateColumn() {
    return `150px repeat(${this.seatsPerRow}, 1rem)`
  }

  get flattenedSeats(): (Seat | string)[] {
    const flattenedArray: (Seat | string)[] = []

    this.selectedSector.rows.forEach(row => {
      flattenedArray.push(`Row ${row.number}`);
      flattenedArray.push(...row.seats)
    })

    return flattenedArray
  }

  onSectorChange(event: Event) {
    this.selectedSector = this.sectors.find(sector => sector.name === (event.target as HTMLSelectElement).value);
  }

  seatClick(seat: Seat) {
    if(seat.status === SeatStatus.SELECTED) {
      seat.status = SeatStatus.OPEN
      console.log('seat unselect :>>', seat)
      this.onSeatUnselected.emit(seat);
      return;
    }

    if(seat.status === SeatStatus.OPEN) {
      console.log('seat select :>>', seat)
      seat.status = SeatStatus.SELECTED
      this.onSeatSelected.emit(seat);
      return;
    }
  }

  protected readonly SeatStatus = SeatStatus;
}
