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

import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SignaturePad } from 'ngx-signaturepad';

@Component({
    selector: 'app-signature-field',
    template: `
        <div fxLayout="column" fxLayoutGap="15px">
            <signature-pad [options]="options" (onBeginEvent)="drawBegin()" (onEndEvent)="drawComplete()"></signature-pad>
            <button mat-raised-button (click)="clear()">Clear</button>
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SignatureFieldComponent),
            multi: true
        }
    ],
    styles: [
        `canvas {
            border: 1px solid;
        }`
    ]
})
export class SignatureFieldComponent implements ControlValueAccessor, AfterViewInit, OnChanges {
    @Input() signData: string = '';

    @Output()
    signed = new EventEmitter();

    @ViewChild(SignaturePad) public signaturePad: SignaturePad;

    public options: Object = {};

    public _signature: any = null;

    get signature(): any {
        return this._signature;
    }

    set signature(value: any) {
        this._signature = value;
    }

    ngOnChanges(): void {
        if (this.signData) {
            setTimeout(() => {
                this.writeValue(this.signData);
            }, 1000);
        }
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.signaturePad.set('penColor', 'rgb(255, 0, 0)');
            this.signaturePad.clear();
        }, 300);
    }

    public writeValue(value: any): void {
        if (!value) {
            return;
        }
        this._signature = value;
        this.signaturePad.fromDataURL(this.signature);
    }

    public drawBegin(): void {
        console.log('Begin Drawing');
    }

    public drawComplete(): void {
        this.signature = this.signaturePad.toDataURL('image/jpeg', 0.5);
        this.signed.emit(this.signature);
    }

    public clear(): void {
        this.signaturePad.clear();
        this.signature = '';
        this.signed.emit(this.signature);
    }

    public registerOnChange(): void {
    }

    public registerOnTouched(): void {
        // no-op
    }
}
