angular.module('blockrApp').service('ArmorService', function ($log, EnchantmentService) {
  'ngInject';

  return {
    getTypes: function () {
      let armorTypes = [
        { name: 'Helmet', option: 'helmet' },
        { name: 'Chestplate', option: 'chestplate' },
        { name: 'Leggings', option: 'leggings' },
        { name: 'Boots', option: 'boots' }
      ];

      return armorTypes;
    },

    getMaterials: function () {
      let armorMaterials = [
        { name: 'Leather', option: 'leather' },
        { name: 'Chainmail', option: 'chainmail' },
        { name: 'Iron', option: 'iron' },
        { name: 'Golden', option: 'golden' },
        { name: 'Diamond', option: 'diamond' }
      ];

      return armorMaterials;
    },

    getAttributes: function () {
      let armorAttributes = [
        {name: 'Max Health', option: 'generic.maxHealth'},
        {name: 'Follow Range', option: 'generic.followRange'},
        {name: 'Knockback Resistance', option: 'generic.knockbackResistance'},
        {name: 'Movement Speed', option: 'generic.movementSpeed'},
        {name: 'Attack Damage', option: 'generic.attackDamage'}
      ];

      return armorAttributes;
    },

    getEnchantments: function (type) {
      let enchantments = null;

      if (type == 'helmet') {
        enchantments = [
          {name: 'Protection', option: EnchantmentService.getId('Protection')},
          {name: 'Fire Protection', option: EnchantmentService.getId('Fire Protection')},
          {name: 'Blast Protection', option: EnchantmentService.getId('Blast Protection')},
          {name: 'Projectile Protection', option: EnchantmentService.getId('Projectile Protection')},
          {name: 'Respiration', option: EnchantmentService.getId('Respiration')},
          {name: 'Aqua Affinity', option: EnchantmentService.getId('Aqua Affinity')},
          {name: 'Thorns', option: EnchantmentService.getId('Thorns')},
          {name: 'Unbreaking', option: EnchantmentService.getId('Unbreaking')},
          {name: 'Mending', option: EnchantmentService.getId('Mending')}
        ];
      }

      if (type == 'chestplate' || type == 'leggings') {
        enchantments = [
          {name: 'Protection', option: EnchantmentService.getId('Protection')},
          {name: 'Fire Protection', option: EnchantmentService.getId('Fire Protection')},
          {name: 'Blast Protection', option: EnchantmentService.getId('Blast Protection')},
          {name: 'Projectile Protection', option: EnchantmentService.getId('Projectile Protection')},
          {name: 'Thorns', option: EnchantmentService.getId('Thorns')},
          {name: 'Unbreaking', option: EnchantmentService.getId('Unbreaking')},
          {name: 'Mending', option: EnchantmentService.getId('Mending')}
        ];
      }

      if (type == 'boots') {
        enchantments = [
          {name: 'Protection', option: EnchantmentService.getId('Protection')},
          {name: 'Fire Protection', option: EnchantmentService.getId('Fire Protection')},
          {name: 'Blast Protection', option: EnchantmentService.getId('Blast Protection')},
          {name: 'Projectile Protection', option: EnchantmentService.getId('Projectile Protection')},
          {name: 'Thorns', option: EnchantmentService.getId('Thorns')},
          {name: 'Unbreaking', option: EnchantmentService.getId('Unbreaking')},
          {name: 'Depth Strider', option: EnchantmentService.getId('Depth Strider')},
          {name: 'Frost Walker', option: EnchantmentService.getId('Frost Walker')},
          {name: 'Mending', option: EnchantmentService.getId('Mending')}
        ];
      }

      return enchantments;
    }
  }

});
