import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[] {
    return sample_foods;
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter(food => food.name.toLowerCase().includes(
      searchTerm.toLowerCase()
    ));
  }

  getFoodById(foodId: string): Food {
    const food = this.getAll().find(food => food.id === foodId);
    if (!food) {
      throw new Error(`Food with id ${foodId} not found`);
    }
    return food;  
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllFoodsByTag(tag: string): Food[] {
    if (tag === 'All') {
      return this.getAll();
    } 
    return this.getAll().filter(food => food.tags?.includes(tag));
  }
}
