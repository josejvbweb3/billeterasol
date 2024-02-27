import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { SolBalance } from '../shyft-api.services';
import { MatButton } from '@angular/material/button';
import { PriceTokenJupex } from '../shyft-api.services';
import { DecimalPipe } from '@angular/common';


  @Component({
    selector: 'billeterasol-tokens-section',
    imports: [MatButton, DecimalPipe ],
    template: `
      <section class="px-4 py-8 bg-black ">
      <p class="text-center text-3xl mb-6 text-blue-700">$ {{ calculateValueInUSD() | number }}</p>
      @if (account1()) {
        <div 
          class=" flex justify-center items-center gap-2 mb-4">
          <img src="https://i.ibb.co/Wtb15V7/solana-sol-seeklogo.png" class="w-12 h-12"/>
          <p class="text-3xl">SOLANA</p>
          <p class="text-2xl">{{ account1()?.balance | number }} SOL</p>
        </div>
        }  
        <section>
        
        <!-- <div class=" flex justify-center items-center">
          <p class="text-1xl">1 SOL ____ </p>
          <p class="text-1xl">{{ tokenPrice()?.SOL?.price | number }} $</p>
        </div> -->

      
        <!-- <div class=" flex justify-center items-center">
          <p class="text-1xl">Value in USD: </p>
          <p class="text-1xl">{{ calculateValueInUSD() | number }} $</p>
        </div> -->
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
      
    private readonly _pricetoken = inject(PriceTokenJupex);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
 
    readonly tokenPrice = computedAsync(
      () => this._pricetoken.getPriceToken(this._publicKey()?.toBase58()),
      { requireSync: false, initialValue: null},
    );
    
    calculateValueInUSD(): number {
      const balance = this.account1()?.balance;
      const price = this.tokenPrice()?.SOL?.price;
        if (balance && price) {
          return balance * price;
        }
        return 0;
      }

  }






       
//        <ng-container *ngIf="account1()">
//         <div 
//           class=" flex justify-center items-center gap-2 mb-4">
//           <img src="https://i.ibb.co/Wtb15V7/solana-sol-seeklogo.png" class="w-12 h-12"/>
//           <p class="text-3xl">SOLANA</p>
//           <p class="text-2xl">{{ account1()?.balance | number }} SOL</p>
          
//         </div>
//         <div class=" flex justify-center items-center">
//           <p class="text-1xl">1 SOL --> </p>
//         <p class="text-1xl">{{ tokenPrice()?.SOL?.price | number }} $</p>
//         </div>

//         <div class=" flex justify-center items-center">
//           <p class="text-1xl">Value in USD: </p>
//           <p class="text-1xl">{{ calculateValueInUSD() | number }} $</p>
//         </div>
//       </ng-container>
//       <section>
//     `,
//     standalone: true
    
// })

// export class TokensSectionComponent {

//     private readonly _solBalance = inject(SolBalance);
//     private readonly _walletStore1 = inject(WalletStore);
//     private readonly _publicKey1 = toSignal(this._walletStore1.publicKey$);
    
//     readonly account1 = computedAsync(
//       () => this._solBalance.getAccount2(this._publicKey1()?.toBase58()),
//       { requireSync: false, initialValue: null},
//     );
      
//     private readonly _pricetoken = inject(PriceTokenJupex);
//     private readonly _walletStore = inject(WalletStore);
//     private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  
//     readonly tokenPrice = computedAsync(
//       () => this._pricetoken.getPriceToken(this._publicKey()?.toBase58()),
//       { requireSync: false, initialValue: null},
//     );

//     calculateValueInUSD(): number {
//       const balance = this.account1()?.balance;
//       const price = this.tokenPrice()?.SOL?.price;
//       if (balance && price) {
//         return balance * price;
//       }
//       return 0;
//     }
// }
