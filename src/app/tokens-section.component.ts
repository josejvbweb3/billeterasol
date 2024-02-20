import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService, TokenUsdc, SolBalance } from './shyft-api.services';
import { MatDialog } from '@angular/material/dialog';
import { TransferModalComponent } from './transfer-modal.component';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'billeterasol-tokens-section',
    imports: [MatButton],
    template: `
        <section class="px-4 py-8 bg-white bg-opacity-5">
            <p class="text-center text-3xl mb-6">Balance</p>
        
       <section>
       @if (account1()) {
        <div 
          class=" flex justify-center items-center gap-2 mb-4">
          <img src="https://i.ibb.co/Wtb15V7/solana-sol-seeklogo.png" class="w-8 h-8" />
          <p class="text-xl">{{ account1()?.balance }} SOL</p>
        </div>
      }
       @if (account()) {
        <div 
          class=" flex justify-center items-center gap-2 mb-4">
          <img [src]="account()?.info?.image" class="w-8 h-8" />
          <p class="text-xl">{{ account()?.balance }} USDC</p>
        </div>
      }
      @if (account2()) {
        <div 
          class=" flex justify-center items-center gap-2 mb-6">
          <img [src]="account2()?.info?.image" class="w-8 h-8" />
          <p class="text-xl">{{ account2()?.balance }} SILLY</p>
        </div>
      }
      
      <footer class="flex justify-center">
        <button mat-raised-button color="primary" (click)="onTransfer()">Transfer funds</button>
      </footer>
    `,
    standalone: true
})

export class TokensSectionComponent {
    private readonly _matDialog = inject(MatDialog);
    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
    private readonly _solBalance = inject(SolBalance);
    private readonly _walletStore1 = inject(WalletStore);
    private readonly _publicKey1 = toSignal(this._walletStore1.publicKey$);
    private readonly _tokenUsdc = inject(TokenUsdc);
    private readonly _walletStore2 = inject(WalletStore);
    private readonly _publicKey2 = toSignal(this._walletStore2.publicKey$);

  
    readonly account = computedAsync(
      () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
      { requireSync: false, initialValue: null},
    );
    readonly account1 = computedAsync(
        () => this._solBalance.getAccount2(this._publicKey1()?.toBase58()),
        { requireSync: false, initialValue: null},
    );
    readonly account2 = computedAsync(
        () => this._tokenUsdc.getAccount1(this._publicKey2()?.toBase58()),
        { requireSync: false, initialValue: null},
      );

    onTransfer() {
      this._matDialog.open(TransferModalComponent);
    }



}