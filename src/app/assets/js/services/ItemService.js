angular.module('blockrApp').service('ItemService', function ($log, ArmorService) {
  'ngInject';

  return {
    /**
     * @description
     * Gets all supported item types.
     *
     * @returns JSON Object
     */
    getSupportedItemTypes: function () {
      let itemTypes = [
        { name: 'Armor', option: 'armor' }
      ];

      return itemTypes;
    },

    getItemTypes: function (itemType) {
      let arr = null;

      switch(itemType) {
        case 'armor':
          arr = ArmorService.getTypes();
          break;
      };

      return arr;
    },

    getItemMaterials: function (itemType) {
      let arr = null;

      switch(itemType) {
        case 'armor':
          arr = ArmorService.getMaterials();
          break;
      };

      return arr;
    },

    getItemAttributes: function (itemType) {
      let arr = null;

      switch(itemType) {
        case 'armor':
          arr = ArmorService.getAttributes();
          break;
      };

      return arr;
    },

    getItemEnchantments: function (itemType) {
      if (itemType == 'helmet' || itemType == 'chestplate' || itemType == 'leggings' || itemType == 'boots') {
        return ArmorService.getEnchantments(itemType);
      }
    }
  }

});
