angular.module('blockrApp').service('EnchantmentService', function ($log, IOService, UtilService) {
  'ngInject';

  return {
    getEnchantments: function () {
      let enchantmentsBuffer = [
        {
          "id": 0,
          "name": "Protection",
          "maxLevel": "4"
        },
        {
          "id": 1,
          "name": "Fire Protection",
          "maxLevel": "4"
        },
        {
          "id": 2,
          "name": "Feather Falling",
          "maxLevel": "4"
        },
        {
          "id": 3,
          "name": "Blast Protection",
          "maxLevel": "4"
        },
        {
          "id": 4,
          "name": "Projectile Protection",
          "maxLevel": "4"
        },
        {
          "id": 5,
          "name": "Respiration",
          "maxLevel": "3"
        },
        {
          "id": 6,
          "name": "Aqua Affinity",
          "maxLevel": "1"
        },
        {
          "id": 7,
          "name": "Thorns",
          "maxLevel": "3"
        },
        {
          "id": 8,
          "name": "Depth Strider",
          "maxLevel": "3"
        },
        {
          "id": 9,
          "name": "Frost Walker",
          "maxLevel": "2"
        },
        {
          "id": 16,
          "name": "Sharpness",
          "maxLevel": "5"
        },
        {
          "id": 17,
          "name": "Smite",
          "maxLevel": "5"
        },
        {
          "id": 18,
          "name": "Bane of Athropods",
          "maxLevel": "5"
        },
        {
          "id": 19,
          "name": "Knockback",
          "maxLevel": "2"
        },
        {
          "id": 20,
          "name": "Fire Aspect",
          "maxLevel": "2"
        },
        {
          "id": 21,
          "name": "Looting",
          "maxLevel": "3"
        },
        {
          "id": 32,
          "name": "Efficiency",
          "maxLevel": "5"
        },
        {
          "id": 33,
          "name": "Silk Touch",
          "maxLevel": "1"
        },
        {
          "id": 34,
          "name": "Unbreaking",
          "maxLevel": "3"
        },
        {
          "id": 35,
          "name": "Fortune",
          "maxLevel": "3"
        },
        {
          "id": 48,
          "name": "Power",
          "maxLevel": "5"
        },
        {
          "id": 49,
          "name": "Punch",
          "maxLevel": "2"
        },
        {
          "id": 50,
          "name": "Flame",
          "maxLevel": "1"
        },
        {
          "id": 51,
          "name": "Infinity",
          "maxLevel": "1"
        },
        {
          "id": 61,
          "name": "Luck of the Sea",
          "maxLevel": "3"
        },
        {
          "id": 62,
          "name": "Lure",
          "maxLevel": "3"
        },
        {
          "id": 70,
          "name": "Mending",
          "maxLevel": "1"
        }
      ];

      return enchantmentsBuffer;
    },

    checkCustom: function (id) {
      let self = this;
      let enchantmentsBuffer = self.getEnchantments();

      if (! UtilService.arrayValueExist(enchantmentsBuffer, 'id', id)) {
        return true;
      }
    },

    getId: function (name) {
      let self = this;
      let enchantmentsBuffer = self.getEnchantments();
      let enchantmentId = UtilService.getArrayIndexByValue(enchantmentsBuffer, 'name', name);

      return enchantmentsBuffer[enchantmentId].id;
    },

    getName: function (id) {
      let self = this;
      let enchantmentsBuffer = self.getEnchantments();
      let enchantmentId = UtilService.getArrayIndexByValue(enchantmentsBuffer, 'id', id);

      if (enchantmentId === -1) { return id; }

      return enchantmentsBuffer[enchantmentId].name;
    },

    getMaxLevel: function (id) {
      let self = this;
      let enchantmentsBuffer = self.getEnchantments();
      let enchantmentId = UtilService.getArrayIndexByValue(enchantmentsBuffer, 'id', id);

      if (enchantmentId === -1) { return 5; }

      return enchantmentsBuffer[enchantmentId].maxLevel;
    },

    getNumerial: function (level) {
      switch (level) {
        case 1: return 'I';
        case 2: return 'II';
        case 3: return 'III';
        case 4: return 'IV';
        case 5: return 'V';
      }
    }
  }

});
