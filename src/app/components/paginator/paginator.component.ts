import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {debounceTime, Subject} from "rxjs";

type SearchParams = {
  query: string;
  page: number;
  pageSize: number;
  sort: string;
  desc: boolean;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Output() onSearchChange: EventEmitter<SearchParams> = new EventEmitter<SearchParams>();
  @Output() onPageChange: EventEmitter<SearchParams> = new EventEmitter<SearchParams>();
  @Output() onPageSizChange: EventEmitter<SearchParams> = new EventEmitter<SearchParams>();
  @Output() onFilterChange: EventEmitter<SearchParams> = new EventEmitter<SearchParams>();
  @Output() onUpdate: EventEmitter<SearchParams> = new EventEmitter<SearchParams>();
  @ViewChild('header') header: ElementRef;
  @ViewChild('content') content: ElementRef;
  @Input('totalItems') totalItems = 0;
  protected readonly Math = Math;

  private searchQuerySubject: Subject<string> = new Subject<string>();
  currentPage = 1;
  pageSize = 10;
  query = '';
  sortBy = '';
  desc = false;
  pageSizes = [
    10,
    20,
    50,
    100
  ]

  constructor() {
    this.searchQuerySubject.pipe(debounceTime(300)).subscribe(() => {
      this.search();
    });
  }

  ngAfterViewInit() {
    const sortableColumns = this.header.nativeElement.querySelectorAll('[data-sortable][data-sort-by]');
    [...sortableColumns].forEach((column) => {
      column.addEventListener('click', (event) => {
        // first reset all other columns
        [...sortableColumns].forEach((c) => {
          if (c !== column) {
            c.removeAttribute('data-desc');
          }
        });

        const target = event.target as HTMLElement;
        this.sortBy = target.getAttribute('data-sort-by');
        const oldSortingDirection = target.getAttribute('data-desc') === 'true';
        const newSortingDirection = !oldSortingDirection;
        this.desc = newSortingDirection;

        target.setAttribute('data-desc', String(newSortingDirection));

        this.onFilterChange.emit(this.searchParams);
        this.onUpdate.emit(this.searchParams);
      });
    });
  }

  pageSizeChange() {
    if(this.pageSize * this.currentPage > this.totalItems) {
      this.currentPage = 1;
    }

    console.log(this.searchParams)

    this.onPageSizChange.emit(this.searchParams);
    this.onUpdate.emit(this.searchParams);
  }

  nextPage() {
    this.pageChange(this.currentPage + 1)
  }

  previousPage() {
    this.pageChange(this.currentPage - 1)
  }

  pageChange(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
    this.onPageChange.emit(this.searchParams);
    this.onUpdate.emit(this.searchParams);
  }

  search() {
    const searchParamsWithPageOne = {...this.searchParams, page: 1}
    this.onSearchChange.emit(searchParamsWithPageOne);
    this.onUpdate.emit(searchParamsWithPageOne);
  }

  searchWithDebounce(query) {
    this.searchQuerySubject.next(query);
  }

  get availablePagesSizes() {
    if(this.totalPages < 10) {
      return Array.from({length: this.totalPages}, (_, i) => i + 1);
    }

    const maxPagesToShow = 9;
    const pages = [];

    // Always include the first page
    pages.push(1);

    // Determine range of previous pages to include
    let start = Math.max(2, this.currentPage - 3);
    let end = Math.min(this.totalPages - 1, start + maxPagesToShow - 3);

    // If not enough pages to fill maxPagesToShow, adjust start and end
    if (end - start < maxPagesToShow - 3) {
      start = Math.max(2, end - maxPagesToShow + 3);
    }

    // Add indicator if there are pages between the first and last
    if (start > 2) {
      pages.push('...');
      start++;
    }

    for (let i = start; i < this.currentPage; i++) {
      pages.push(i);
    }

    // Add current page
    if(this.currentPage !== 1 && this.currentPage !== this.totalPages) {
      pages.push(this.currentPage);
    }

    if (end < this.totalPages - 1) {
      end--
    }

    // Add next pages
    for (let i = this.currentPage + 1; i <= end; i++) {
      pages.push(i);
    }

    // Add indicator if there are pages between the first and last
    if (end < this.totalPages - 1) {
      pages.push('...');
    }

    // Always include the last page
    pages.push(this.totalPages);

    return pages;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get searchParams() {
    return {
      query: this.query,
      page: this.currentPage,
      pageSize: this.pageSize,
      sort: this.sortBy,
      desc: this.desc
    };
  }
}
