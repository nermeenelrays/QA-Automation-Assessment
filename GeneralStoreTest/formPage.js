"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class FormPage {
    // 1. Locators
    get countryDropdown() { return $('id:com.androidsample.generalstore:id/spinnerCountry'); }
    get andorraOption() { return $('xpath://*[@text="Andorra"]'); }
    get nameField() { return $('id:com.androidsample.generalstore:id/nameField'); }
    get femaleRadio() { return $('id:com.androidsample.generalstore:id/radioFemale'); }
    get shopButton() { return $('id:com.androidsample.generalstore:id/btnLetsShop'); }
    // 2. Actions
    fillForm(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield this.countryDropdown).click();
            yield (yield this.andorraOption).click();
            yield (yield this.nameField).setValue(name);
            yield (yield this.femaleRadio).click();
            yield (yield this.shopButton).click();
        });
    }
}
exports.default = new FormPage();
