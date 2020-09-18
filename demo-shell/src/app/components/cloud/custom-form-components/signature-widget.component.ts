/*!
 * @license
 * Copyright 2019 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { FormService, WidgetComponent } from '@alfresco/adf-core';

@Component({
    selector: 'app-sample-widget',
    template: `
        <label class="adf-label" [attr.for]="field.id">{{field.name | translate }}<span
            *ngIf="isRequired()">*</span></label>
        <app-signature-field [signData]="field.value" (signed)="updateField($event)"></app-signature-field>
    `
})
export class SignatureWidgetComponent extends WidgetComponent  implements OnInit {

    displayValue: string;

    constructor(public formService: FormService) {
        super(formService);
    }

    ngOnInit() {
        this.displayValue = this.field.value;
    }

    updateField (signature) {
        this.field.value = signature;
    }
}
