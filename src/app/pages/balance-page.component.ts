import { Component } from '@angular/core';
import { TokensSectionComponent } from '../sections/tokens-section.component';
import { TokensListSectionComponent } from '../sections/tokenslist-section.component';


@Component({
    selector: 'billeterasol-balance-page',
    template: `
        <billeterasol-tokens-section></billeterasol-tokens-section>
        <billeterasol-tokenslist-section></billeterasol-tokenslist-section> 
        `,
    standalone: true,
    imports: [ TokensSectionComponent, TokensListSectionComponent ]
})

export class BalancePageComponent {}