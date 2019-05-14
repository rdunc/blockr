angular.module('blockrApp').service('AttributeService', function ($log) {
  'ngInject';

  return {
    getName: function (name) {
      switch (name) {
        case 'generic.maxHealth': return 'Max Health';
        case 'generic.followRange': return 'Mob Follow Range';
        case 'generic.knockbackResistance': return 'Knockback Resistance';
        case 'generic.movementSpeed': return 'Movement Speed';
        case 'generic.attackDamage': return 'Attack Damage';
        default: return name;
      }
    },

    checkCustom: function (name) {
      switch (name) {
        case 'generic.maxHealth': return false;
        case 'generic.followRange': return false;
        case 'generic.knockbackResistance': return false;
        case 'generic.movementSpeed': return false;
        case 'generic.attackDamage': return false;
        default: return true;
      }
    }
  }

});
