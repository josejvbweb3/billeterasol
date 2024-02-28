import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { TokensList } from '../services/shyft-api.services';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TransferModalComponent } from '../transfer-modal.component';
import { MatButton } from '@angular/material/button';
import { DecimalPipe } from '@angular/common';
import { BuyModalComponent } from '../buy-modal.component';
import { ReceiveModalComponent } from '../receive-modal.component';
import { CommonModule } from '@angular/common';
import { PriceTokenSilly } from '../services/shyft-api.services';





@Component({
    selector: 'billeterasol-tokenslist-section',
    imports: [MatTableModule, MatCard, MatButton, DecimalPipe, CommonModule],
    standalone: true,
    styleUrls: ['../../styles.scss'],
    template: `
    <mat-card class="px-4 py-8 blur-background">
      @if (!allTokens()) {
          <p class="text-center text-white">Connect your wallet.</p>
      } @else if (allTokens()?.length === 0) {
          <p class="text-center text-white">No activity.</p>
      } @else  {
          <div class="my-button-row center">
              <button mat-raised-button color="primary" (click)="onTransfer()">SEND</button>
              <button mat-raised-button color="primary" (click)="onBuy()">BUY</button>
              <button mat-raised-button color="primary" (click)="onReceive()">RECEIVE</button>
          </div>
          <div style="border-top: 20px solid transparent;"></div> 
          <div *ngFor="let token of allTokens()">
              
              <div class="token-info">
                        <img class="circular-image" [src]="token.info.image" [width]="50"/>
                        <div class="token-name-balance">
                        <span class="text-white text-2xl">&nbsp;{{ token.info.name }}</span>
                        <span class="token-info-debajo text-1xl align-text-bottom">&nbsp;{{ token.balance | number }}&nbsp;<span class="token-info-debajo text-1xl">{{ token.info.symbol }}</span></span>
                        
                    </div>
                    <div>
                    <p class="text-right items-right text-2xl mb-6 text-white" style="padding-right: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ {{ tokenValueInUSD() | number }}</p>
                    </div>
                </div>
                </div>
            
      }  
    </mat-card>
    `,
})


export class TokensListSectionComponent {
  
    
    private readonly _tokensList = inject(TokensList);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
    private readonly _matDialog = inject(MatDialog);

    readonly allTokens = computedAsync(
        () => this._tokensList.getAllTokens(this._publicKey()?.toBase58()),
    
    );

    
    private readonly _pricetoken = inject(PriceTokenSilly);
    private readonly _walletStoreSilly = inject(WalletStore);
    private readonly _publicKeySilly = toSignal(this._walletStoreSilly.publicKey$);
 
    readonly tokenPrice = computedAsync(
      () => this._pricetoken.getPriceToken(this._publicKeySilly()?.toBase58()),
      { requireSync: false, initialValue: null},
    );
     
    

    onTransfer() {
      this._matDialog.open(TransferModalComponent);
    }

    onBuy(){
      this._matDialog.open(BuyModalComponent);
    }

    onReceive(){
      this._matDialog.open(ReceiveModalComponent);
    }

    tokenValueInUSD(): number {
      const balanceToken = 28;
      const price = this.tokenPrice()?.SOL?.price;
        if (balanceToken && price) {
          return (balanceToken * (111/price));
        }
        return 0;
      }

    

    
}