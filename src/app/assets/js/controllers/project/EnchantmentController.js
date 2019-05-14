angular.module('blockrApp').controller('EnchantmentController', function ($log, UtilService, EnchantmentService) {
  'ngInject';

  this.ench = [];

  this.clearEnchantments = function () {
    let self = this;

    self.ench = [];
  }

  this.addEnchantment = function (id) {
    let self = this;

    if (typeof id != 'undefined' && UtilService.arrayValueExist(self.ench, 'id', id)) {
      return self.ench;
    }

    self.ench.push({
      'id': id,
      'lvl': 1
    });

    return self.ench;
  }

  this.removeEnchantment = function (id) {
    let self = this;
    let enchantmentIdIndex = UtilService.getArrayIndexByValue(self.ench, 'id', id);

    self.ench.splice(enchantmentIdIndex, 1);

    return self.ench;
  }

  this.checkCustomEnchantment = function (id) {
    return EnchantmentService.checkCustom(id);
  }

  this.getEnchantmentName = function (id) {
    return EnchantmentService.getName(id);
  }

  this.getEnchantmentNumerial = function (level) {
    return EnchantmentService.getNumerial(level);
  }

  this.getMaxEnchantmentLevel = function (id) {
    return EnchantmentService.getMaxLevel(id);
  }

  this.getReviewEnchantments = function (enchantments) {
    return UtilService.makeArrayReviewable(enchantments);
  }

});
