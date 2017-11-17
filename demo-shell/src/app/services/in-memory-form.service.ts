/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
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

import { Injectable } from '@angular/core';
import { AppConfigService, AlfrescoApiService, EcmModelService, LogService, FormFieldOption, FormService } from '@alfresco/adf-core';
import { Observable } from 'rxjs/Observable';

interface ActivitiData {
    rest: {
        fields: Array<{
            processId?: string,
            taskId?: string,
            fieldId?: string,
            values?: Array<{
                id: string,
                name: string
            }>
        }>
    };
}
//
@Injectable()
export class InMemoryFormService extends FormService {

    private data: ActivitiData;

    constructor(appConfig: AppConfigService,
                ecmModelService: EcmModelService,
                apiService: AlfrescoApiService,
                protected logService: LogService) {
        super(ecmModelService, apiService, logService);
        this.data = appConfig.get<ActivitiData>('activiti');
    }

    /** @override */
    getRestFieldValues(taskId: string, field: string): Observable<any> {
        // Uncomment this to use original call
        // return super.getRestFieldValues(taskId, fieldId);

        this.logService.log(`getRestFieldValues: ${taskId} => ${field}`);
        return new Observable<FormFieldOption[]>(observer => {
            let field = this.data.rest.fields.find(
                f => f.taskId === taskId && f.fieldId === field
            );
            let values: FormFieldOption[] = field.values || [];
            this.logService.log(values);
            observer.next(values);
        });
    }

    /** @override */
    getRestFieldValuesByProcessId(processDefinitionId: string, fieldId: string): Observable<any> {
        //  Uncomment this to use original call
        //  return super.getRestFieldValuesByProcessId(processDefinitionId, fieldId);

        this.logService.log(`getRestFieldValuesByProcessId: ${processDefinitionId} => ${fieldId}`);
        return new Observable<FormFieldOption[]>(observer => {
            let field = this.data.rest.fields.find(
                f => f.processId === processDefinitionId && f.fieldId === fieldId
            );
            let values: FormFieldOption[] = field.values || [];
            this.logService.log(values);
            observer.next(values);
        });
    }
}
