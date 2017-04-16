import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'menu-item',
  templateUrl: 'menu-item.html'
})
export class MenuItemComponent implements OnInit {
  @Input() title: string
  @Input() icon: string
  @Input() isSelected: boolean
  @Input() newsIndex: number

  constructor() {}

  ngOnInit(): void {}
}
