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

import { NgModule, ModuleWithProviders } from '@angular/core';
import { TRANSLATION_PROVIDER, CoreModule, FormRenderingService } from '@alfresco/adf-core';
import { AppListCloudModule } from './app/app-list-cloud.module';
import { TaskCloudModule } from './task/task-cloud.module';
import { ProcessCloudModule } from './process/process-cloud.module';
import { GroupCloudModule } from './group/group-cloud.module';
import { FormCloudModule } from './form/form-cloud.module';
import { TaskFormModule } from './task/task-form/task-form.module';
import {
    LocalPreferenceCloudService,
    PROCESS_FILTERS_SERVICE_TOKEN,
    TASK_FILTERS_SERVICE_TOKEN
} from './services/public-api';
import { PeopleCloudModule } from './people/people-cloud.module';
import { CloudFormRenderingService } from './form/components/cloud-form-rendering.service';
import { ProcessServicesCloudPipeModule } from './pipes/process-services-cloud-pipe.module';

@NgModule({
    imports: [
        CoreModule,
        AppListCloudModule,
        ProcessCloudModule,
        TaskCloudModule,
        GroupCloudModule,
        PeopleCloudModule,
        FormCloudModule,
        TaskFormModule,
        ProcessServicesCloudPipeModule
    ],
    providers: [
        {
            provide: TRANSLATION_PROVIDER,
            multi: true,
            useValue: {
                name: 'adf-process-services-cloud',
                source: 'assets/adf-process-services-cloud'
            }
        },
        { provide: PROCESS_FILTERS_SERVICE_TOKEN, useClass: LocalPreferenceCloudService },
        { provide: TASK_FILTERS_SERVICE_TOKEN, useClass: LocalPreferenceCloudService }
    ],
    exports: [
        AppListCloudModule,
        ProcessCloudModule,
        TaskCloudModule,
        GroupCloudModule,
        FormCloudModule,
        TaskFormModule,
        PeopleCloudModule,
        ProcessServicesCloudPipeModule
    ]
})
export class ProcessServicesCloudModule {
    static forRoot(): ModuleWithProviders<ProcessServicesCloudModule> {
        return {
            ngModule: ProcessServicesCloudModule,
            providers: [
                {
                    provide: TRANSLATION_PROVIDER,
                    multi: true,
                    useValue: {
                        name: 'adf-process-services-cloud',
                        source: 'assets/adf-process-services-cloud'
                    }
                },
                { provide: PROCESS_FILTERS_SERVICE_TOKEN, useClass: LocalPreferenceCloudService },
                { provide: TASK_FILTERS_SERVICE_TOKEN, useClass: LocalPreferenceCloudService },
                FormRenderingService,
                { provide: FormRenderingService, useClass: CloudFormRenderingService }
            ]
        };
    }

    static forChild(): ModuleWithProviders<ProcessServicesCloudModule> {
        return {
            ngModule: ProcessServicesCloudModule
        };
    }
}
