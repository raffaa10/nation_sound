import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public headerMessage: string;

  public headerMessageId: number;
  private headerMessages: string[]; // mettre à jour à interval régulier

  private headerMessageTimeout: any;

  public modalStatus: ModalStatus = ModalStatus.Waiting;

  constructor(private httpClient: HttpClient) {
    this.headerMessageId = 0;
    this.headerMessages = [];
    this.headerMessage = this.headerMessages[this.headerMessageId];
  }

  public switchHeaderMessageToId(id: number) {
    this.headerMessageId = (id >= 0 && id <= 2) ? id : this.headerMessageId;
    this.headerMessage = this.headerMessages[this.headerMessageId];

    if (this.headerMessageTimeout) {
      clearTimeout(this.headerMessageTimeout);
      this.launchHeaderMessageTimeoutRecursive();
    }

    console.trace("switched to " + this.headerMessageId);
  }

  public switchHeaderMessageLeft(): void {
    this.headerMessage = this.headerMessages[this.headerMessageId-- > 0 ? this.headerMessageId : this.headerMessageId = 2];

    if (this.headerMessageTimeout) {
      clearTimeout(this.headerMessageTimeout);
      this.launchHeaderMessageTimeoutRecursive();
    }

    console.trace("switched left " + this.headerMessageId);
  }

  public switchHeaderMessageRight(): void {
    this.headerMessage = this.headerMessages[this.headerMessageId = (this.headerMessageId + 1) % 3];

    if (this.headerMessageTimeout) {
      clearTimeout(this.headerMessageTimeout);
      this.launchHeaderMessageTimeoutRecursive();
    }

    console.trace("switched right " + this.headerMessageId);
  }

  public ngOnInit(): void {
    this.httpClient.get("assets/data.json", {responseType: 'json'}).subscribe(data => {
      const json: any = data;
      this.headerMessages = json.messages;
      this.headerMessage = this.headerMessages[this.headerMessageId];
    }, (error) => {
      this.modalStatus = ModalStatus.Error;
    }, () => {
      this.modalStatus = ModalStatus.Complete;
    });

    this.launchHeaderMessageTimeoutRecursive();
  }

  private launchHeaderMessageTimeoutRecursive(): void {
    this.headerMessageTimeout = setTimeout(() => {
      this.headerMessage = this.headerMessages[this.headerMessageId = (this.headerMessageId + 1) % 3];
      this.launchHeaderMessageTimeoutRecursive();
    }, 5000);
  }
}

enum ModalStatus {
  Waiting,
  Error,
  Complete
};