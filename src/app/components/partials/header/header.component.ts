import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  user!: User;

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })

    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }
}
