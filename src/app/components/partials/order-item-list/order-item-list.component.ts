import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-item-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './order-item-list.component.html',
  styleUrl: './order-item-list.component.css'
})
export class OrderItemListComponent {
  @Input() order!: Order;
}
