angular.module('blockrApp').controller('AttributeController', function ($log, UtilService, AttributeService) {
  'ngInject';

  this.AttributeModifiers = [];

  this.clearAttributes = function () {
    let self = this;

    self.AttributeModifiers = [];
  }

  this.addAttribute = function (name) {
    let self = this;

    if (typeof name != 'undefined' && UtilService.arrayValueExist(self.AttributeModifiers, 'AttributeName', name)) {
      return self.AttributeModifiers;
    }

    let amount = null;
    switch(name) {
      case 'generic.maxHealth':
        amount = 20;
        break;
      case 'generic.followRange':
        amount = 20;
        break;
      case 'generic.knockbackResistance':
        amount = 1;
        break;
      case 'generic.movementSpeed':
        amount = 1;
        break;
      case 'generic.attackDamage':
        amount = 1;
        break;
    }

    self.AttributeModifiers.push({
      'AttributeName': name,
      'Name': name,
      'Amount': amount,
      'Operation': 0,
      'UUIDMost': UtilService.generateNumberRange(10001, 40000),
      'UUIDLeast': UtilService.generateNumberRange(1, 10000)
    });

    return self.AttributeModifiers;
  }

  this.removeAttribute = function (name) {
    let self = this;
    let attributeIdIndex = UtilService.getArrayIndexByValue(self.AttributeModifiers, 'Name', name);
    self.AttributeModifiers.splice(attributeIdIndex, 1);

    return self.AttributeModifiers;
  }

  this.checkCustomAttribute = function (name) {
    return AttributeService.checkCustom(name);
  }

  this.getAttributeName = function (name) {
    let self = this;
    let attributeIdIndex = UtilService.getArrayIndexByValue(self.AttributeModifiers, 'Name', name);

    if (self.AttributeModifiers[attributeIdIndex].AttributeName != name) {
      self.AttributeModifiers[attributeIdIndex].AttributeName = name;
    }

    return AttributeService.getName(name);
  }

  this.getReviewAttributes = function (attributes) {
    return UtilService.makeArrayReviewable(attributes);
  }

});
