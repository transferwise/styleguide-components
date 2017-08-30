
function TwTabsController() {
  var $ctrl = this;
  $ctrl.switchTab = switchTab;

  if (!$ctrl.active && $ctrl.tabs.length) {
    $ctrl.active = $ctrl.tabs[0].type;
  }

  function switchTab(tab) {
    $ctrl.active = tab;
    if ($ctrl.onChange) {
      $ctrl.onChange(tab);
    }
  }
}

export default TwTabsController;
