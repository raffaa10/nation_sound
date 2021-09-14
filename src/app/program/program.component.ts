import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RequestDBService } from 'src/services/request-db.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  public events: any[];

  public artists: string[];
  public styles: string[];
  public dates: number[];
  public places: string[];

  public artistSelectControl = new FormControl();
  public placeSelectControl = new FormControl();
  public styleSelectControl = new FormControl();
  public dateSelectControl = new FormControl();

  public selectedEvent : number = 0;
  private overlayElement: HTMLElement | null = null;

  constructor(private requestDB: RequestDBService) {
    this.events =  [];
    this.artists = [];
    this.styles = [];
    this.dates = [];
    this.places = [];
  }

  ngOnInit(): void {
    this.overlayElement = document.getElementById("overlay");

    if (this.overlayElement) {
      this.overlayElement.style.visibility = "hidden";
    }

    this.requestDB.getArtists().then((artists) => {
      artists.forEach((artist) => {
        this.artists.push(artist);
      });

      this.requestDB.getPlaces().then((places) => {
        places.forEach((place) => {
          this.places.push(place.nomLieu);
        });

        this.requestDB.getDates().then((dates) => {
          dates.forEach((date) => {
            this.dates.push(date.getUTCDate());
          });

          this.requestDB.getStyles().then((styles) => {
            styles.forEach((style) => {
              this.styles.push(style);
            });
          });
        });
      });
    });

    this.artistSelectControl.valueChanges.subscribe((value) => this.sorting());
    this.dateSelectControl.valueChanges.subscribe((value) => this.sorting());
    this.placeSelectControl.valueChanges.subscribe((value) => this.sorting());
    this.styleSelectControl.valueChanges.subscribe((value) => this.sorting());
    this.sorting();
  }

  public selectEvent(id: number) {
    console.trace("select event n° " + id);

    this.selectedEvent = id;

    const programEvents = document.getElementsByTagName("app-program-event");

    for (let index = 0; index < programEvents.length; index++) {
      const element = programEvents[index];

      if (index == id) {
        element.className = "selected";
      } else {
        element.className = "";
      }
    }

    if (this.overlayElement) {
      this.overlayElement.style.visibility = "visible";
    }
  }

  private sorting(): void {
    console.trace("Sorting");

    this.requestDB.getEvents().then((events) => {
      this.events = [];

      for (let index = 0; index < events.length; index++) {
        const event = events[index];

        console.log(event);

        const newEvent = {
          id: index,
          title: event.nomEvenement,
          date: event.dateEvenement,
          place: event.lieu.nomLieu,
          style: event.style.nomStyle,
          artist: event.artiste.nomArtiste,
          price: event.prixEvenement
        };

        let check = true;

        if (this.artistSelectControl.value?.length > 0) {
          check = false;

          this.artistSelectControl.value.forEach((artist: string) => {
            if (newEvent.artist == artist) {
              check = true;
            }
          });
        }

        if (this.dateSelectControl.value?.length > 0) {
          check = false;

          this.dateSelectControl.value.forEach((date: number) => {
            if (new Date(newEvent.date).getUTCDate() == date) {
              check = true;
            }
          });
        }

        if (this.placeSelectControl.value?.length > 0) {
          check = false;

          this.placeSelectControl.value.forEach((place: string) => {
            if (newEvent.place == place) {
              check = true;
            }
          });
        }

        if (this.styleSelectControl.value?.length > 0) {
          check = false;

          this.styleSelectControl.value.forEach((style: string) => {
            if (newEvent.style == style) {
              check = true;
            }
          });
        }

        if (check) this.events.push(newEvent);
      }
    });
  }
}
