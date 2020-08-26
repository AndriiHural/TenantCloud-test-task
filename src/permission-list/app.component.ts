import './app.component.scss';

enum PermissionRule {
    view = 'view',
    edit = 'edit',
    remove = 'remove',
}
const StorageItem: string = 'Permissions';

interface Permissions {
    section: string;
    permission: PermissionRules;
}

interface PermissionRules {
    [PermissionRule.view]: boolean;
    [PermissionRule.edit]: boolean;
    [PermissionRule.remove]: boolean;
}

class AppController implements ng.IController {
    private headPermission: Permissions;
    private permissionList: Array<Permissions>;
    public PermissionRule = PermissionRule;

    constructor() {
        console.log(1);

        this.headPermission = this.createPermission('Permission');
        console.log(this.permissionList);
        console.log(2);

        this.permissionList = this.restoreDate();

        if (this.permissionList) {
            console.log('work');
            console.log(3);

            for (const key in this.PermissionRule) {
                console.log(PermissionRule[key]);

                this.setHeadCheckboxState(
                    this.PermissionRule[key as PermissionRule]
                );
            }
        } else {
            this.permissionList = [
                this.createPermission('Calendar'),
                this.createPermission('Profile'),
                this.createPermission('Property'),
                this.createPermission('Contact'),
            ];
            console.log(4);
        }
    }

    /**
     * Create permission object
     * @param title name of section
     */
    private createPermission(title: string): Permissions {
        return {
            section: title,
            permission: {
                [PermissionRule.view]: false,
                [PermissionRule.edit]: false,
                [PermissionRule.remove]: false,
            },
        };
    }

    /**
     * Set state of 'Check all' checkbox
     * @param target clicked checkbox
     * @param key name of permission object key which change
     */
    public setHeadCheckboxState(key: PermissionRule): void {
        let headCheckboxState = true;

        this.permissionList.forEach((item: Permissions) => {
            if (!item.permission[key]) {
                headCheckboxState = false;
            }
        });

        this.headPermission.permission[key] = headCheckboxState;
    }

    /**
     * Set state of  all checkbox under 'Check all' checkbox
     * @param key name of permission object key which change
     */
    public headCheckboxHandler(item: Permissions, key: PermissionRule): void {
        this.permissionList.forEach((item: Permissions) => {
            item.permission[key] = this.headPermission.permission[key];
            this.disableNextElement(item, key);
        });
    }

    public handlerChange(permission: Permissions, key: PermissionRule): void {
        this.disableNextElement(permission, key);
        this.setHeadCheckboxState(key);
    }

    public disableNextElement(item: Permissions, key: PermissionRule): void {
        if (key === PermissionRule.view && !item.permission.view) {
            item.permission.edit = false;
            item.permission.remove = false;
            this.setHeadCheckboxState(PermissionRule.edit);
            this.setHeadCheckboxState(PermissionRule.remove);
        }

        if (key === PermissionRule.edit && !item.permission.edit) {
            item.permission.remove = false;
            this.setHeadCheckboxState(PermissionRule.remove);
        }
    }

    public saveDate(): void {
        console.log('save');

        localStorage.setItem(StorageItem, JSON.stringify(this.permissionList));
    }

    public restoreDate(): boolean | any {
        let localStorageGetTask = localStorage.getItem(StorageItem);

        if (localStorageGetTask === null) {
            return;
        } else {
            return JSON.parse(localStorageGetTask);
        }
    }
}

export class AppComponent implements ng.IComponentOptions {
    public controller = AppController;
    public templateUrl = require('./app.component.html');
}
