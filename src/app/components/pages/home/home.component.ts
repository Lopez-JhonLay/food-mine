import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule, 
    StarRatingComponent, 
    CommonModule, 
    SearchComponent, 
    TagsComponent,
    NotFoundComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  
  constructor(
    private foodService: FoodService, 
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let foodsObservable: Observable<Food[]>;
    this.activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      }
      else if (params.tag) {
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag);
      }
      else {
        foodsObservable = this.foodService.getAll();
      }

      foodsObservable.subscribe(serverFoods => this.foods = serverFoods);
    })
  }
}
