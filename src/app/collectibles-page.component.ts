import { Component } from '@angular/core';
import { CollectiblesSectionComponent } from './collectibles-section.component';

@Component({
    selector: 'billeterasol-collectibles-page',
    template: `
    <billeterasol-collectibles-section></billeterasol-collectibles-section>
    `,
    standalone: true,
    imports: [CollectiblesSectionComponent]
})

export class CollectiblesPageComponent {}

