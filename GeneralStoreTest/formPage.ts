declare var $: any;

class FormPage {
    // 1. Locators
    get countryDropdown() { return $('id:com.androidsample.generalstore:id/spinnerCountry'); }
    get andorraOption() { return $('xpath://*[@text="Andorra"]'); }
    get nameField() { return $('id:com.androidsample.generalstore:id/nameField'); }
    get femaleRadio() { return $('id:com.androidsample.generalstore:id/radioFemale'); }
    get shopButton() { return $('id:com.androidsample.generalstore:id/btnLetsShop'); }

    // 2. Actions
    async fillForm(name: string) {
        await (await this.countryDropdown as any).click();
        await (await this.andorraOption as any).click();
        await (await this.nameField as any).setValue(name);
        await (await this.femaleRadio as any).click();
        await (await this.shopButton as any).click();
    }
}

export default new FormPage();