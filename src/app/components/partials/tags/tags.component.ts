import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../shared/models/tag';
import { FoodService } from '../../../services/food.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {
  tags!: Tag[];

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags
    });
  }
}
