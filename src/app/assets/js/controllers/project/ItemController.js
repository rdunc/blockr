angular.module('blockrApp').controller('ItemController', function ($log, $routeParams, $timeout, ProjectService, ProjectService, ItemService, UtilService, IOService, UIService) {
  'ngInject';

  let dialogShowing = null;
  let projectName = $routeParams.name;

  this.oldProjectItemName = null;

  this.project = ProjectService.loadProject(projectName);
  this.projectItems = this.project[0].items;
  this.rootItemType = null;
  this.itemSlug = null;
  this.projectItem = null;
  this.supportedItemTypes = ItemService.getSupportedItemTypes();
  this.itemMaterials = null;
  this.itemEnchantments = null;

  this.newItem = function (itemType) {
    let self = this;

    // Reset our item to default variables
    self.resetItem();

    // Get item types and materials
    self.rootItemType = itemType;
    self.itemTypes = ItemService.getItemTypes(itemType);
    self.itemMaterials = ItemService.getItemMaterials(itemType);
    self.itemAttributes = ItemService.getItemAttributes(itemType);
  }

  this.removeItem = function (itemId) {
    let self = this;
    let projectItem = ProjectService.loadProjectItem(projectName, itemId);

    let dialogTitle = 'Delete Item';
    let dialogButtons = ['Yes', 'No'];
    let dialogMessage = 'Are you sure you want to delete ' + projectItem.item.name + '? This cannot be reversed!';

    if (!dialogShowing) {
      dialogShowing = true;
      dialog.showMessageBox({type: 'question', buttons: dialogButtons, title: dialogTitle, message: dialogMessage}, function (buttonIndex) {
        if (buttonIndex === 0) {
          let promise = IOService.removeFile(APPDATA_PATH + '\\projects\\' + projectName + '\\items\\' + itemId + '.json');

          promise.then(function (response) {
            let itemIndex = UtilService.getArrayIndexByValue(self.projectItems, 'id', itemId);
            self.project[0].items.splice(itemIndex, 1);

            let promise = IOService.createFile(APPDATA_PATH + '\\projects\\' + projectName + '\\manifest.json', self.project);
            promise.then(function (response) {
              ProjectService.resetEdit();
            }, function (reason) {
              $log.error('[Promise] - Rejected ', reason);

              UIService.showErrorModal(reason);
            })
          }, function (reason) {
            $log.error('[Promise] - Rejected ', reason);

            UIService.showErrorModal(reason);
          })
        } else {
          dialogShowing = false;
        }
      });
    }
  }

  this.loadItem = function (itemId) {
    let self = this;
    let projectItem = ProjectService.loadProjectItem(projectName, itemId);

    switch (projectItem.hideFlags) {
      case 1:
        self.flagEnchantments = true;
        break;
      case 2:
        self.flagAttributes = true;
        break;
      case 3:
        self.flagEnchantments = true;
        self.flagAttributes = true;
        break;
      case 4:
        self.flagUnbreakable = true;
        break;
      case 5:
        self.flagEnchantments = true;
        self.flagUnbreakable = true;
        break;
      case 6:
        self.flagAttributes = true;
        self.flagUnbreakable = true;
        break;
      case 7:
        self.flagEnchantments = true;
        self.flagAttributes = true;
        self.flagUnbreakable = true;
        break;
    }

    self.itemSlug           = projectItem.id;
    self.rootItemType       = projectItem.rootItemType;
    self.itemTypes          = ItemService.getItemTypes(projectItem.rootItemType);
    self.itemMaterials      = ItemService.getItemMaterials(projectItem.rootItemType);
    self.itemAttributes     = ItemService.getItemAttributes(projectItem.rootItemType);
    self.projectItem        = projectItem.item;
    self.AttributeModifiers = projectItem['attributeModifers'];
    self.ench               = projectItem['ench'];
    self.unbreakableFlag    = projectItem.unbreakableFlag;
    self.hideFlags          = projectItem.hideFlags;

    let _itemType = UtilService.stringTrim(projectItem.item.itemType);
    _itemType = _itemType.toLowerCase();
    self.itemEnchantments   = ItemService.getItemEnchantments(_itemType);

    ProjectService.setSaving();

    self.closeModal();
  }

  this.saveItem = function () {
    let self = this;

    if (self.projectDetailsForm.$valid) {
      if (! self.itemSlug) { self.itemSlug = UtilService.generateSlug(); }

      let itemArray = ({
        'slug': self.itemSlug,
        'oldProjectItemName': self.oldProjectItemName,
        'projectName': projectName,
        'projectItem': self.projectItem,
        'rootItemType': self.rootItemType,
        'attributeModifers': self.AttributeModifiers,
        'enchantments': self.ench,
        'unbreakableFlag': self.unbreakableFlag,
        'hideFlags': self.hideFlags
      });

      let promise = ProjectService.saveProjectItem(itemArray);

      promise.then(function (response) {
        self.oldProjectItemName = self.projectItem.name;
        self.project = ProjectService.loadProject(projectName);
        self.projectItems = self.project[0].items;

        self.itemSavedNotice = 'Successfully saved';
        self.itemSaved = true;

        $timeout(function () {
          self.itemSaved = false;
        }, 5000);
      }, function (reason) {
        $log.error('[Promise] - Rejected ', reason);

        UIService.showErrorModal(reason);
      })
    }
  }

  this.getEnchantments = function (itemType) {
    let self = this;
    let itemTypeTrim = UtilService.stringTrim(itemType);
    itemTypeTrim = itemTypeTrim.toLowerCase();

    self.ench = [];
    self.itemEnchantments = ItemService.getItemEnchantments(itemTypeTrim);
  }

  this.resetItem = function () {
    let self = this;

    self.oldProjectItemName = null;
    self.rootItemType       = null;
    self.itemSlug           = null;
    self.projectItem        = {};
    self.itemMaterials      = null;
    self.itemEnchantments   = [];
    self.AttributeModifiers = [];
    self.ench               = [];
    self.flagEnchantments   = false;
    self.flagAttributes     = false;
    self.flagUnbreakable    = false;

    ProjectService.resetEdit();
  }

  // FIX: Changes dont reflect instantly.
  this.closeItem = function () {
    let self = this;

    self.oldProjectItemName = null;
    self.rootItemType       = null;
    self.itemSlug           = null;
    self.projectItem        = null;
    self.itemMaterials      = null;
    self.itemEnchantments   = [];
    self.AttributeModifiers = [];
    self.ench               = [];
    self.flagEnchantments   = false;
    self.flagAttributes     = false;
    self.flagUnbreakable    = false;

    ProjectService.resetEdit();
    angular.element(document.querySelector('.modal-flex.info-close-item')).removeClass('show-modal');
    angular.element(document.querySelector('body')).removeClass('modal-open');
    angular.element(document.querySelector('.modal-backdrop')).remove();
  }

  this.getReviewItem = function (itemType, itemMaterial) {
    if (typeof itemType === 'undefined' || typeof itemMaterial === 'undefined') {
      return;
    }

    let _itemType = UtilService.stringTrim(itemType);
    _itemType = _itemType.toLowerCase();

    let _itemMaterial = UtilService.stringTrim(itemMaterial);
    _itemMaterial = _itemMaterial.toLowerCase();

    return _itemType + '_' + _itemMaterial;
  }

  this.getReviewDisplay = function (itemName, itemLore1, itemLore2) {
    if (typeof itemName === 'undefined') {
      return {};
    } else {
      let display = {
        'Name': itemName
      };

      if (typeof itemLore1 != 'undefined') {
        display = {
          'Name': itemName,
          'Lore': [itemLore1]
        };
      }

      if (typeof itemLore2 != 'undefined' && itemLore2 != '') {
        display = {
          'Name': itemName,
          'Lore': [itemLore1, itemLore2]
        };
      }

      display = UtilService.makeArrayReviewable(display);

      return display;
    }
  }

});
