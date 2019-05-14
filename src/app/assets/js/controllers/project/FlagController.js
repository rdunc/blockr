angular.module('blockrApp').controller('FlagController', function ($log) {
  'ngInject';

  this.flagEnchantments = false;
  this.flagAttributes = false;
  this.flagUnbreakable = false;
  this.hideFlags = 0;
  this.unbreakableFlag = 0;

  this.setHideFlag = function (modelName, checked) {
    let self = this;

    if (modelName == 'enchantments') {
      if (checked) {
        self.hideFlags = self.hideFlags + 1;
      } else {
        self.hideFlags = self.hideFlags - 1;
      }
    }

    if (modelName == 'attributes') {
      if (checked) {
        self.hideFlags = self.hideFlags + 2;
      } else {
        self.hideFlags = self.hideFlags - 2;
      }
    }

    if (modelName == 'unbreakable') {
      if (checked) {
        self.hideFlags = self.hideFlags + 4;
      } else {
        self.hideFlags = self.hideFlags - 4;
      }
    }
  }

  this.setUnbreakableFlag = function (modelName, checked) {
    let self = this;
    
    if (modelName == 'unbreakable') {
      if (checked) {
        self.unbreakableFlag = self.unbreakableFlag + 1;
      } else {
        self.unbreakableFlag = self.unbreakableFlag - 1;
      }
    }
  }

});
