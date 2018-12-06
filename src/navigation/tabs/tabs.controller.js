class TabsController {
  constructor() {
    if (!this.active && this.tabs && this.tabs.length) {
      this.active = 0;
    }
  }

  switchTab(index) {
    this.active = index;
    if (this.onChange) {
      this.onChange({ index });
    }
  }
}

export default TabsController;
