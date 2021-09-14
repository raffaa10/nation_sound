import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Get data from database
 */
@Injectable({
  providedIn: 'root'
})
export class RequestDBService {

  private static artists: string[];
  private static styles: string[];
  private static dates: Date[];
  private static places: Place[];
  private static events: Event[];
  private static messages: string[];

  constructor(private httpClient: HttpClient) { }

  /**
   * Update data from database
   */
  private async updateDatas() {
    let events = await this.httpClient.get("https://nation-sound-web-api.herokuapp.com/api/evenements", { responseType: 'json' }).toPromise() as Event[];

    RequestDBService.dates = [];
    RequestDBService.artists = [];
    RequestDBService.places = [];
    RequestDBService.styles = [];

    events.forEach((event: Event) => {
      this.addToArrayWithoutDuplicata(new Date(event.dateEvenement), RequestDBService.dates);
      console.log(RequestDBService.dates);
      this.addToArrayWithoutDuplicata(event.artiste.nomArtiste, RequestDBService.artists);
      console.log(RequestDBService.artists);
      this.addToArrayWithoutDuplicata(event.lieu, RequestDBService.places);
      console.log(RequestDBService.places);
      this.addToArrayWithoutDuplicata(event.style.nomStyle, RequestDBService.styles);
      console.log(RequestDBService.styles);
    });

    RequestDBService.events = events;
    console.log(RequestDBService.events);
  }

  /**
   * @param value Value to add
   * @param array Array to fill
   */
  private addToArrayWithoutDuplicata(value: any, array: any[]) {
    if (value) {
      var check = true;

      array.forEach((currentValue) => {
        if (value == currentValue) {
          check = false;
        }
      });

      if (check) array.push(value);
    }
  }

  /**
   * @returns Artists from database
   */
  public async getArtists() {
    if (!RequestDBService.artists) {
      await this.updateDatas();
    }

    return RequestDBService.artists;
  }

  /**
   * @returns Styles from database
   */
  public async getStyles() {
    if (!RequestDBService.styles) {
      await this.updateDatas();
    }

    return RequestDBService.styles;
  }

  /**
   * @returns Dates from database
   */
  public async getDates() {
    if (!RequestDBService.dates) {
      await this.updateDatas();
    }

    return RequestDBService.dates;
  }

  /**
   * @returns Places from database
   */
  public async getPlaces() {
    if (!RequestDBService.places) {
      await this.updateDatas();
    }

    return RequestDBService.places;
  }

  /**
   * @returns Events from database
   */
  public async getEvents() {
    if (!RequestDBService.events) {
      await this.updateDatas();
    }

    return RequestDBService.events;
  }

  /**
   * @returns Messages from database
   */
  public async getMessages() {
    if (!RequestDBService.events) {
      await this.updateDatas();
    }

    return RequestDBService.messages;
  }
}

interface Place {
  adresseLieu: string,
  capaciteLieu: number,
  coordLat: number,
  coordLng: number,
  iconeLieu: string,
  idLieu: number,
  nomLieu: string,
  typeLieu: string,
}

interface Event {
  artiste: {
    idArtiste: number,
    nomArtiste: string,
  },
  dateEvenement: string,
  descriptionEvenement: string,
  dureeEvenement: number,
  idEvenement: number,
  lieu: {
    adresseLieu: string,
    capaciteLieu: number,
    coordLat: number,
    coordLng: number,
    iconeLieu: string,
    idLieu: number,
    nomLieu: string,
    typeLieu: string,
  }
  messageSecurite: string,
  nomEvenement: string,
  partenaire: {
    idPartenaire: number
    logoPartenaire: string,
    nomCategoriePartenaire: string,
    nomPartenaire: string
  }
  prixEvenement: number
  style: {
    idStyle: number,
    nomStyle: string
  }
}
