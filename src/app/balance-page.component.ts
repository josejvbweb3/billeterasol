import { Component } from '@angular/core';
import { TokensSectionComponent } from './tokens-section.component';
import { TransactionsSectionComponent } from './transactions-section.component';
import { TokensListSectionComponent } from './tokenslist-section.component';


@Component({
    selector: 'billeterasol-balance-page',
    template: `
        <billeterasol-tokens-section></billeterasol-tokens-section>
        <billeterasol-tokenslist-section></billeterasol-tokenslist-section> 
        <billeterasol-transactions-section></billeterasol-transactions-section>
        `,
    standalone: true,
    imports: [ TokensSectionComponent, TransactionsSectionComponent, TokensListSectionComponent ]
})

export class BalancePageComponent {}