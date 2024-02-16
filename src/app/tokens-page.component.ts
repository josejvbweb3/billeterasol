import { Component } from '@angular/core';
import { TokensSectionComponent } from './tokens-section.component';
import { FeaturesSectionComponent } from './features-section.component';

@Component({
    selector: 'billeterasol-tokens-page',
    template: `
        <billeterasol-tokens-section></billeterasol-tokens-section>
        <billeterasol-features-section></billeterasol-features-section>
        `,
    standalone: true,
    imports: [TokensSectionComponent, FeaturesSectionComponent]
})

export class TokensPageComponent {}