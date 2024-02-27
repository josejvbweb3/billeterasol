import { Component } from '@angular/core';
import { ActivitySectionComponent } from '../sections/activity-section.component';

@Component({
    selector: 'billeterasol-activity-page',
    template: `
    <billeterasol-activity-section></billeterasol-activity-section>
    `,
    standalone: true,
    imports: [ActivitySectionComponent]
})

export class ActivityPageComponent {}