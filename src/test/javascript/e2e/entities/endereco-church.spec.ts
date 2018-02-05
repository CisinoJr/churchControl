import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Endereco e2e test', () => {

    let navBarPage: NavBarPage;
    let enderecoDialogPage: EnderecoDialogPage;
    let enderecoComponentsPage: EnderecoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Enderecos', () => {
        navBarPage.goToEntity('endereco-church');
        enderecoComponentsPage = new EnderecoComponentsPage();
        expect(enderecoComponentsPage.getTitle())
            .toMatch(/churchControlApp.endereco.home.title/);

    });

    it('should load create Endereco dialog', () => {
        enderecoComponentsPage.clickOnCreateButton();
        enderecoDialogPage = new EnderecoDialogPage();
        expect(enderecoDialogPage.getModalTitle())
            .toMatch(/churchControlApp.endereco.home.createOrEditLabel/);
        enderecoDialogPage.close();
    });

    it('should create and save Enderecos', () => {
        enderecoComponentsPage.clickOnCreateButton();
        enderecoDialogPage.setRuaInput('rua');
        expect(enderecoDialogPage.getRuaInput()).toMatch('rua');
        enderecoDialogPage.setNumeroInput('numero');
        expect(enderecoDialogPage.getNumeroInput()).toMatch('numero');
        enderecoDialogPage.setCepInput('cep');
        expect(enderecoDialogPage.getCepInput()).toMatch('cep');
        enderecoDialogPage.setCidadeInput('cidade');
        expect(enderecoDialogPage.getCidadeInput()).toMatch('cidade');
        enderecoDialogPage.setEstadoInput('estado');
        expect(enderecoDialogPage.getEstadoInput()).toMatch('estado');
        enderecoDialogPage.save();
        expect(enderecoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EnderecoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-endereco-church div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EnderecoDialogPage {
    modalTitle = element(by.css('h4#myEnderecoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    ruaInput = element(by.css('input#field_rua'));
    numeroInput = element(by.css('input#field_numero'));
    cepInput = element(by.css('input#field_cep'));
    cidadeInput = element(by.css('input#field_cidade'));
    estadoInput = element(by.css('input#field_estado'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setRuaInput = function(rua) {
        this.ruaInput.sendKeys(rua);
    }

    getRuaInput = function() {
        return this.ruaInput.getAttribute('value');
    }

    setNumeroInput = function(numero) {
        this.numeroInput.sendKeys(numero);
    }

    getNumeroInput = function() {
        return this.numeroInput.getAttribute('value');
    }

    setCepInput = function(cep) {
        this.cepInput.sendKeys(cep);
    }

    getCepInput = function() {
        return this.cepInput.getAttribute('value');
    }

    setCidadeInput = function(cidade) {
        this.cidadeInput.sendKeys(cidade);
    }

    getCidadeInput = function() {
        return this.cidadeInput.getAttribute('value');
    }

    setEstadoInput = function(estado) {
        this.estadoInput.sendKeys(estado);
    }

    getEstadoInput = function() {
        return this.estadoInput.getAttribute('value');
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
