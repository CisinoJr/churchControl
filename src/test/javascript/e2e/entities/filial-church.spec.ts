import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Filial e2e test', () => {

    let navBarPage: NavBarPage;
    let filialDialogPage: FilialDialogPage;
    let filialComponentsPage: FilialComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Filials', () => {
        navBarPage.goToEntity('filial-church');
        filialComponentsPage = new FilialComponentsPage();
        expect(filialComponentsPage.getTitle())
            .toMatch(/churchControlApp.filial.home.title/);

    });

    it('should load create Filial dialog', () => {
        filialComponentsPage.clickOnCreateButton();
        filialDialogPage = new FilialDialogPage();
        expect(filialDialogPage.getModalTitle())
            .toMatch(/churchControlApp.filial.home.createOrEditLabel/);
        filialDialogPage.close();
    });

    it('should create and save Filials', () => {
        filialComponentsPage.clickOnCreateButton();
        filialDialogPage.setRazaoSocialInput('razaoSocial');
        expect(filialDialogPage.getRazaoSocialInput()).toMatch('razaoSocial');
        filialDialogPage.setCnpjInput('cnpj');
        expect(filialDialogPage.getCnpjInput()).toMatch('cnpj');
        filialDialogPage.setTipoInput('tipo');
        expect(filialDialogPage.getTipoInput()).toMatch('tipo');
        filialDialogPage.setTelefoneInput('telefone');
        expect(filialDialogPage.getTelefoneInput()).toMatch('telefone');
        filialDialogPage.enderecoSelectLastOption();
        filialDialogPage.save();
        expect(filialDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FilialComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-filial-church div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FilialDialogPage {
    modalTitle = element(by.css('h4#myFilialLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    razaoSocialInput = element(by.css('input#field_razaoSocial'));
    cnpjInput = element(by.css('input#field_cnpj'));
    tipoInput = element(by.css('input#field_tipo'));
    telefoneInput = element(by.css('input#field_telefone'));
    enderecoSelect = element(by.css('select#field_endereco'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setRazaoSocialInput = function(razaoSocial) {
        this.razaoSocialInput.sendKeys(razaoSocial);
    }

    getRazaoSocialInput = function() {
        return this.razaoSocialInput.getAttribute('value');
    }

    setCnpjInput = function(cnpj) {
        this.cnpjInput.sendKeys(cnpj);
    }

    getCnpjInput = function() {
        return this.cnpjInput.getAttribute('value');
    }

    setTipoInput = function(tipo) {
        this.tipoInput.sendKeys(tipo);
    }

    getTipoInput = function() {
        return this.tipoInput.getAttribute('value');
    }

    setTelefoneInput = function(telefone) {
        this.telefoneInput.sendKeys(telefone);
    }

    getTelefoneInput = function() {
        return this.telefoneInput.getAttribute('value');
    }

    enderecoSelectLastOption = function() {
        this.enderecoSelect.all(by.tagName('option')).last().click();
    }

    enderecoSelectOption = function(option) {
        this.enderecoSelect.sendKeys(option);
    }

    getEnderecoSelect = function() {
        return this.enderecoSelect;
    }

    getEnderecoSelectedOption = function() {
        return this.enderecoSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
