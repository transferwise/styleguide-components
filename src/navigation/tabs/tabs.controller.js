class TabsController {
  constructor() {
    if (!this.active && this.tabs && this.tabs.length) {
      this.active = 0;
    }
  }

  switchTab(tab) {
    this.active = tab;
    if (this.onChange) {
      this.onChange({ tab });
    }
  }
}

export default TabsController;
