import { Component, OnInit } from '@angular/core';
import { cardAnimation } from 'src/app/shared/animations/cards-animation';
interface ICard {
  title: string;
  images: { url: string; isActive: boolean }[];
  activeIndex?: number;
}
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [cardAnimation],
})
export class LandingComponent implements OnInit {
  currentActiveImgIndex: number = 0;

  cards: ICard[] = [
    {
      title: 'EnvironQuality </br> mental EQ',
      images: [
        { url: 'assets/images/E1.jpg', isActive: true },
        { url: 'assets/images/E2.jpg', isActive: false },
        { url: 'assets/images/E3.jpg', isActive: false },
        { url: 'assets/images/E4.jpg', isActive: false },
        { url: 'assets/images/E5.jpg', isActive: false },
        { url: 'assets/images/E6.jpg', isActive: false },
      ],
    },
    {
      title: 'Destination </br>  Quality DQ',
      images: [
        { url: 'assets/images/D1.jpg', isActive: true },
        { url: 'assets/images/D2.png', isActive: false },
        { url: 'assets/images/D3.png', isActive: false },
        { url: 'assets/images/D4.jpg', isActive: false },
        { url: 'assets/images/D5.jpg', isActive: false },
        { url: 'assets/images/D6.png', isActive: false },
      ],
    },
    {
      title: 'Tourists’ Experience </br>  Quality TQ',
      images: [
        { url: 'assets/images/T1.jpg', isActive: true },
        { url: 'assets/images/T2.jpg', isActive: false },
        { url: 'assets/images/T3.jpg', isActive: false },
        { url: 'assets/images/T4.jpg', isActive: false },
        { url: 'assets/images/T5.jpg', isActive: false },
        { url: 'assets/images/T6.jpg', isActive: false },
      ],
    },
  ];

  ngOnInit(): void {
    this.cards.forEach((card) => (card.activeIndex = 0));
    this.cards.forEach((card) => (card.images[0].isActive = true));

    setInterval(() => {
      this.cards.forEach((card) => {
        card.images[card.activeIndex as number].isActive = false;
        (card.activeIndex as number)++;
        if ((card.activeIndex as number) >= card.images.length) {
          card.activeIndex = 0;
        }

        card.images[card.activeIndex as number].isActive = true;
      });
    }, 4000);
  }
}
