import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService, BalanceSol, TokenSilly } from './shyft-api.services';


@Component({
    selector: 'billeterasol-tokens-section',
    template: `
        <section class="px-24 py-32 bg-white bg-opacity-5">
            <p class="text-center text-3xl">Balance</p>
        
       <section>
       @if (account1()) {
        <div 
          class=" flex justify-center items-center gap-2">
          <img src="https://i.ibb.co/Wtb15V7/solana-sol-seeklogo.png" class="w-8 h-8" />
          <p class="text-xl">{{ account1()?.balance }} SOL</p>
        </div>

      }
       @if (account()) {
        <div 
          class=" flex justify-center items-center gap-2">
          <img [src]="account()?.info?.image" class="w-8 h-8" />
          <p class="text-xl">{{ account()?.balance }} USDC</p>
        </div>

      }
      @if (account2()) {
        <div 
          class=" flex justify-center items-center gap-2">
          <img [src]="account2()?.info?.image" class="w-8 h-8" />
          <p class="text-xl">{{ account2()?.balance }} SILLY</p>
        </div>

      }
      
    `,
    standalone: true
})

export class TokensSectionComponent {
    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
    private readonly _balanceSol = inject(BalanceSol);
    private readonly _walletStore1 = inject(WalletStore);
    private readonly _publicKey1 = toSignal(this._walletStore1.publicKey$);
    private readonly _tokenSilly = inject(TokenSilly);
    private readonly _walletStore2 = inject(WalletStore);
    private readonly _publicKey2 = toSignal(this._walletStore2.publicKey$);

  
    readonly account = computedAsync(
      () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
      { requireSync: false },
    );
    readonly account1 = computedAsync(
        () => this._balanceSol.getAccount1(this._publicKey1()?.toBase58()),
        { requireSync: false },
    );
    readonly account2 = computedAsync(
        () => this._tokenSilly.getAccount2(this._publicKey2()?.toBase58()),
        { requireSync: false },
      );



}