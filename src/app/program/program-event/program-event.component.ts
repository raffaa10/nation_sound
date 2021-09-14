import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-program-event',
  templateUrl: './program-event.component.html',
  styleUrls: ['./program-event.component.scss']
})
export class ProgramEventComponent {
  @Input() public title: string;
  @Input() public date: string | null;
  @Input() public place: string;
  @Input() public style: string;
  @Input() public artist: string;
  @Input() public price: string;

  constructor() {
    this.title = "Sans titre";
    this.date = "";
    this.place = "";
    this.style = "";
    this.artist = "";
    this.price = "";
  }

}
