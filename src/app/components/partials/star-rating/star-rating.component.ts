import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() stars!: number;
  @Input() size: number = 1;
  
  get styles() {
    return {
      'width.rem': this.size,
      'height.rem': this.size,
      'marginRight': this.size/6
    }
  }

  getStartImage(current: number): string {
    const previousHalf = current - 0.5;
    const imageName = this.stars >= current ? 'star-full' : 
      this.stars >= previousHalf ? 'star-half' : 'star-empty';
    
    return `/assets/stars/${imageName}.svg`;
  }
}
