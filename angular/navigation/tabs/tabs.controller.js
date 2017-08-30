class TabsController {
  constructor() {
    if (!this.active && this.tabs.length) {
      this.active = this.tabs[0].type;
    }
  }

  switchTab(tab) {
    $ctrl.active = tab;
    if (this.onChange) {
      this.onChange(tab);
    }
  }
}

export default TabsController;
