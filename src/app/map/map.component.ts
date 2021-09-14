import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestDBService } from 'src/services/request-db.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  public currentMarkerName: string = "";
  public currentMarkerType: string = "";

  public options: google.maps.MapOptions = {
    center: { lat: 43.64275256548461, lng: 3.838176727294922 },
    zoom: 16
  };

  public markers: { lat: number, lng: number, name: string, type: string, options: google.maps.MarkerOptions,  }[] = [];
  public directionsResults$: Observable<google.maps.DirectionsResult | undefined> | undefined;

  constructor(private requestDBService: RequestDBService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.requestDBService.getPlaces().then((places) => {
      places.forEach((place) => {
        this.markers.push({
          lat: place.coordLat,
          lng: place.coordLng,
          name: place.nomLieu,
          type: place.typeLieu,
          options: { label: place.nomLieu, clickable: true, icon: place.iconeLieu } });
      });

      this.activatedRoute.fragment.subscribe((fragment) => {
        if (fragment != null) {
          this.options.center = { lat: this.markers[+fragment].lat, lng: this.markers[+fragment].lng };
        }
      });
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.markers.push({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: "Votre position actuelle",
          type: "Géolocalisation",
          options: { label: "Vous êtes ici", icon: "/assets/gps.png" } });
      });
    } else {
      console.log("User not allow")
    }
  }

  openInfoWindow(mapMarker: MapMarker) {
    this.markers.forEach((marker) => {
      if (marker.lat == mapMarker.getPosition()?.lat() && marker.lng == mapMarker.getPosition()?.lng()) {
        this.currentMarkerName = marker.name;
        this.currentMarkerType = marker.type;
      }
    });

    if (this.infoWindow)
      this.infoWindow.open(mapMarker);
  }
}
