import { Component, OnInit } from '@angular/core';
import { MessagesServiceService } from '../messages-service.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messagesService : MessagesServiceService) { }

  ngOnInit(): void {
  }

}
