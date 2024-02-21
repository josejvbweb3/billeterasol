import { Component, OnInit, inject } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent} from '@heavy-duty/wallet-adapter-material';
import { ActivityWallet } from './shyft-api.services';
import { ConnectionStore } from '@heavy-duty/wallet-adapter';





@Component({
  imports: [RouterModule, HdWalletMultiButtonComponent, MatAnchor ],
  selector: 'billeterasol-root',
  standalone: true,

  template: `
    <header class="py-8">
      <h1 class="text-5xl text-center mb-4">Wallet</h1>

      <div class="flex justify-center mb-4">
      <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      

      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li>
            <a [routerLink]="['']" mat-raised-button>Balance</a>
          </li>
          <li>
            <a [routerLink]="['settings']" mat-raised-button>Settings</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent implements OnInit{
  private readonly _activityWallet = inject(ActivityWallet);
  private readonly _connectionStore = inject(ConnectionStore);
  
  ngOnInit() {
    this._connectionStore.setEndpoint(this._activityWallet.getEndpoint());
  }
}



