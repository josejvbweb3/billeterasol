import { Component } from "@angular/core";


@Component ({
    selector: 'billeterasol-buy-modal',
    template: `
        <div class="px-8 pt-16 pb-8 bg-blue-950">
            <h2 class="text-3xl text-center mb-8 text-white">Buy tokens</h2>
            <a href="https://changelly.com/buy/sol" target="_blank">
            <img src="https://i.ibb.co/C5xS541/Screenshot-347.png"/>
            </a>
        `,
    standalone: true,
    
})
export class BuyModalComponent {
    
}