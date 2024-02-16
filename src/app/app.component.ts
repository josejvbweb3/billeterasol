import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAnchor } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent} from '@heavy-duty/wallet-adapter-material';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.services';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, MatAnchor ],
  selector: 'billeterasol-root',
  template: `
    <header class="py-8">
      <h1 class="text-5xl text-center mb-4">Wallet</h1>

      <div class="flex justify-center mb-4">
      <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      @if (account()) {
        <div 
          class="absolute top-4 left-4 flex justify-center items-center gap-2">
          <img [src]="account()?.info?.image" class="w-8 h-8" />
          <p class="text-xl">{{ account()?.balance }}</p>
        </div>
      }

      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li>
            <a [routerLink]="['']" mat-raised-button>Tokens</a>
          </li>
          <li>
            <a [routerLink]="['activity']" mat-raised-button>Activity</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true },
  );
}
