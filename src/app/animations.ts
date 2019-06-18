import { AnimationTriggerMetadata, animate, state, style, transition, trigger } from '@angular/animations';

// fade animations
export const FadeAnimation: AnimationTriggerMetadata =
  trigger('fade', [
    state('*', style({opacity: 1})),
    transition(':enter', [
      style({opacity: 0}),
      animate('250ms 250ms', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate(250, style({opacity: 0}))
    ])
  ]);

// top down animations
export const TopDownAnimation: AnimationTriggerMetadata =
  trigger('topDown', [
    state('*', style({height: '*', opacity: 1})),
    transition(':enter', [
      style({height: 0, opacity: 0}),
      animate(250, style({height: '*', opacity: 1}))
    ]),
    transition(':leave', [
      style({height: '*', opacity: 1}),
      animate(250, style({height: 0, opacity: 0}))
    ])
  ]);
