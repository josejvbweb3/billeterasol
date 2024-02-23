import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { SolBalance } from './shyft-api.services';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'billeterasol-tokens-section',
    imports: [MatButton],
    template: `
        <section class="px-4 py-8 bg-black">
            <p class="text-center text-3xl mb-6">Balance</p>
        
       <section>
       @if (account1()) {
        <div 
          class=" flex justify-center items-center gap-2 mb-4">
          <img src="https://i.ibb.co/Wtb15V7/solana-sol-seeklogo.png" class="w-8 h-8" />
          <p class="text-xl">{{ account1()?.balance }} SOL</p>
        </div>
      }
     
      
    `,
    standalone: true
})

export class TokensSectionComponent {

    private readonly _solBalance = inject(SolBalance);
    private readonly _walletStore1 = inject(WalletStore);
    private readonly _publicKey1 = toSignal(this._walletStore1.publicKey$);
    
 
    readonly account1 = computedAsync(
        () => this._solBalance.getAccount2(this._publicKey1()?.toBase58()),
        { requireSync: false, initialValue: null},
    );



}