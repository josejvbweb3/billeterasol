import { Component } from '@angular/core';

@Component({
    selector: 'billeterasol-transactions-section',
    template: `
        <section class="p-16">
            <ul class="flex justify-center items-center gap-4">
                <li>Activity</li>
            </ul>
        </section>
    `,
    standalone: true,
})
export class TransactionsSectionComponent {}