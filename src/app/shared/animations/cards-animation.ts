import { trigger, transition, animate, style } from '@angular/animations';

export const cardAnimation = [
  trigger('slide', [
    transition(':enter', [
      style({ right: '-100%', opacity: 0 }),
      animate(
        '1s cubic-bezier(0.47, 0.13, 0.15, 0.89)',
        style({ right: 0, opacity: 1 })
      ),
    ]),
    transition(':leave', [
      style({ right: 0, opacity: 1 }),
      animate(
        '1s cubic-bezier(0.47, 0.13, 0.15, 0.89)',
        style({ left: '-100%', opacity: 0 })
      ),
    ]),
  ]),
];

export const TablesAnimation = [
  trigger('show', [
    transition(':enter', [
      style({ opacity: 0.5 }),
      animate('2s cubic-bezier(0.47, 0.13, 0.15, 0.89)', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('2s cubic-bezier(0.47, 0.13, 0.15, 0.89)', style({ opacity: 0.5 })),
    ]),
  ]),
];
