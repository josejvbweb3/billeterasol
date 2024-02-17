import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ActivityWallet } from './shyft-api.services';

@Component({
    selector: 'billeterasol-transactions-section',
    template: `
        <section class="p-16">
        <p class="text-center text-3xl">Activity</p>
        </section>
        @if (account()) {
        <div 
          class=" flex justify-center items-center gap-2">
          <p class="text-xl">{{ account()?.timestamp }}</p>
          <p class="text-xl">{{ account()?.type }}</p>
          
        </div>

      }
    `,
    standalone: true,
})
export class TransactionsSectionComponent {
    private readonly _activityWallet3 = inject(ActivityWallet);
    private readonly _walletStore3 = inject(WalletStore);
    private readonly _publicKey3 = toSignal(this._walletStore3.publicKey$);

    readonly account = computedAsync(
        () => this._activityWallet3.getTransactionsHistory(this._publicKey3()?.toBase58()),
        { requireSync: true, initialValue: null},
    );

}