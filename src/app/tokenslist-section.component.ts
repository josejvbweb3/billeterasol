import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { TokensList } from './shyft-api.services';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@Component({
    selector: 'billeterasol-tokenslist-section',
    imports: [MatTableModule, MatCard],
    standalone: true,
    template: `
    <mat-card class=" px-4 py-8">
      <h2 class="text-center justify text-3xl mb-4">List Tokens</h2>

      @if (!allTokens()) {
        <p class="text-center">conect your wallet.</p>
      } @else if (allTokens()?.length === 0) {
        <p class="text-center">no Activity.</p>
      } @else {
        <table mat-table [dataSource]="allTokens() ?? []">
          <ng-container matColumnDef="image">
            <th mat-header-cell *matHeaderCellDef>image</th>
            <td mat-cell *matCellDef="let element">{{ element.image }}</td>
          </ng-container>

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>name</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>

          <ng-container matColumnDef="balance">
            <th mat-header-cell *matHeaderCellDef>balance</th>
            <td mat-cell *matCellDef="let element">{{ element.balance }}</td>
          </ng-container>

          <ng-container matColumnDef="symbol">
            <th mat-header-cell *matHeaderCellDef>symbol</th>
            <td mat-cell *matCellDef="let element">{{ element.symbol }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      }
    </mat-card>
  `,
    
})

export class TokensListSectionComponent {
    private readonly _tokensList = inject(TokensList);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);

    readonly allTokens = computedAsync(
        () => this._tokensList.getAllTokens(this._publicKey()?.toBase58()),
    
    );

    displayedColumns: string[] = ['image', 'name', 'balance', 'symbol' ];
}