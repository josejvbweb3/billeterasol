import { Component } from '@angular/core';
import { TokensSectionComponent } from './tokens-section.component';
import { TransactionsSectionComponent } from './transactions-section.component';

@Component({
    selector: 'billeterasol-balance-page',
    template: `
        <billeterasol-tokens-section></billeterasol-tokens-section>
        <billeterasol-transactions-section></billeterasol-transactions-section>
        `,
    standalone: true,
    imports: [TokensSectionComponent, TransactionsSectionComponent]
})

export class BalancePageComponent {}