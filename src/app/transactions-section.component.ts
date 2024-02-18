import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ActivityWallet } from './shyft-api.services';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'billeterasol-transactions-section',
    imports: [MatTableModule, MatCard],
    standalone: true,
    template: `
    <mat-card class=" px-4 py-8">
      <h2 class="text-center justify text-3xl mb-4">Activity</h2>

      @if (!transactions()) {
        <p class="text-center">conect your wallet.</p>
      } @else if (transactions()?.length === 0) {
        <p class="text-center">no Activity.</p>
      } @else {
        <table mat-table [dataSource]="transactions() ?? []">
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let element">{{ element.type }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let element">{{ element.status }}</td>
          </ng-container>

          <ng-container matColumnDef="timestamp">
            <th mat-header-cell *matHeaderCellDef>Timestamp</th>
            <td mat-cell *matCellDef="let element">{{ element.timestamp }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      }
    </mat-card>
  `,
    
})
export class TransactionsSectionComponent {
    private readonly _activityWallet3 = inject(ActivityWallet);
    private readonly _walletStore3 = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore3.publicKey$);

    readonly transactions = computedAsync(
        () => this._activityWallet3.getTransactionsHistory(this._publicKey()?.toBase58()),
    
    );

    displayedColumns: string[] = ['type', 'status', 'timestamp'];

}