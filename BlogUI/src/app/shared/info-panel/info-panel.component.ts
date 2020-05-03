import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  @Input() errorMessage: string;

  @Input() isVisible: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
