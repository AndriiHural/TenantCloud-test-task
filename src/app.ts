import { module, element, bootstrap, ILogService } from 'angular';

import { AppComponent } from './permission-list/app.component';

import './app.scss';

export let app = module('app', []).component(
    'appPermission',
    new AppComponent()
);

element(document).ready(() => {
    bootstrap(document, ['app']);
});
