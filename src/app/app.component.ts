import { Component, inject } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent} from '@heavy-duty/wallet-adapter-material';
import { TransferModalComponent } from './transfer-modal.component';




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
            <a [routerLink]="['']" mat-raised-button (click)="onTransfer">Transfer</a>
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
export class AppComponent {
  
  private readonly _matDialog = inject(MatDialog);

  onTransfer() {

    this._matDialog.open(TransferModalComponent);
  }
}


