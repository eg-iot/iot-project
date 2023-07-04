import { trigger, transition, style, animate } from '@angular/animations';

export const open = trigger('open', [
  transition(':enter', [
    style({ top: '45%', opacity: '15%', visibility: 'visible' }),
    animate('200ms linear', style({ top: '50%', opacity: 1, visibility: 'visible' }))
  ]),
  transition(':leave', [
    style({ top: '50%', opacity: 1, visibility: 'visible' }),
    animate('200ms linear', style({ top: '45%', opacity: '15%', visibility: 'visible' }))
  ])
]);

export const overlay = trigger('overlay', [
  transition(':enter', [
    style({ opacity: '15%', visibility: 'visible' }),
    animate('200ms linear', style({ opacity: 1, visibility: 'visible' }))
  ]),
  transition(':leave', [
    style({ opacity: 1, visibility: 'visible' }),
    animate('200ms linear', style({ opacity: '15%', visibility: 'visible' }))
  ])
]);
