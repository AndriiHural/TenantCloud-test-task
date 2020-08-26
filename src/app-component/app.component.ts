import "./app.component.scss";

enum PermissionRule {
  view = "view",
  edit = "edit",
  remove = "remove",
}
const StorageItemName: string = "Permissions";

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
    this.headPermission = this.createPermission("Permission");
    this.permissionList = this.restoreDate();

    if (this.permissionList) {
      for (const key in this.PermissionRule) {
        this.setHeadCheckboxState(this.PermissionRule[key as PermissionRule]);
      }
    } else {
      this.permissionList = [
        this.createPermission("Calendar"),
        this.createPermission("Profile"),
        this.createPermission("Property"),
        this.createPermission("Contact"),
      ];
    }
  }

  /**
   * Create permission object
   * @param title name of section
   */
  private createPermission(
    title: string,
    isView?: boolean,
    isEdit?: boolean,
    isRemove?: boolean
  ): Permissions {
    return {
      section: title,
      permission: {
        [PermissionRule.view]: isView || false,
        [PermissionRule.edit]: isEdit || false,
        [PermissionRule.remove]: isRemove || false,
      },
    };
  }

  /**
   * Set state of 'Check all' checkbox
   * @param key permission name
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
   * @param key permission name
   */
  public headCheckboxHandler(key: PermissionRule): void {
    this.permissionList.forEach((item: Permissions) => {
      item.permission[key] = this.headPermission.permission[key];
      this.disableElement(item, key);
    });
  }

  /**
   * control the behavior of the checkbox
   * @param item checkbox object
   * @param key permission name
   */
  public permissionCheckboxHandler(
    item: Permissions,
    key: PermissionRule
  ): void {
    this.disableElement(item, key);
    this.setHeadCheckboxState(key);
  }

  /**
   * Disables child elements
   * @param item checkbox object
   * @param key permission name
   */
  public disableElement(item: Permissions, key: PermissionRule): void {
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

  /**
   * Save your date in localstorege
   */
  public saveDate(): void {
    localStorage.setItem(StorageItemName, JSON.stringify(this.permissionList));
    alert("Your data is saved!");
  }

  /**
   * Restore your date from localstorege
   */
  public restoreDate(): boolean | any {
    let localStorageGetTask = localStorage.getItem(StorageItemName);

    if (localStorageGetTask === null) {
      return;
    } else {
      return JSON.parse(localStorageGetTask);
    }
  }
}

export class AppComponent implements ng.IComponentOptions {
  public controller = AppController;
  public templateUrl = require("./app.component.html");
}
