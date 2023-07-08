import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cardAnimation } from 'src/app/shared/animations/cards-animation';
import { HttpErrorResponse } from '@angular/common/http';
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

  emailForm!: FormGroup;
  constructor(
    private DataService: DataService,
    private ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.emailForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [
        Validators.email,
        Validators.required,
      ]),
      message: new FormControl<string>('', Validators.required),
    });
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

  onEmailSent() {
    if (this.emailForm.invalid) {
      this.ToastrService.warning('Please fill the required fields!');
      this.emailForm.markAllAsTouched();
      return;
    }
    const formValue = this.emailForm.value;
    this.DataService.setLoading(true);
    this.DataService.sendEmail(formValue).subscribe({
      next: (res: any) => {
        this.ToastrService.success(res.data.getInTouch);
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse)
          this.ToastrService.error(err.error.message);
        else this.ToastrService.error(err);
      },
      complete: () => {
        this.DataService.setLoading(false);
        this.emailForm.reset();
      },
    });
  }
}
