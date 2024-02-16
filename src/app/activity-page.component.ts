import  { Component } from '@angular/core';
import { ActivitySectionComponent } from './activity-section.component';

@Component({
    selector: 'billeterasol-activity-page',
    template: `
        <billeterasol-activity-section></billeterasol-activity-section>
    `,
    standalone: true,
    imports: [ActivitySectionComponent]
})
export class ActivityPageComponent {}