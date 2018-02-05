import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Membros e2e test', () => {

    let navBarPage: NavBarPage;
    let membrosDialogPage: MembrosDialogPage;
    let membrosComponentsPage: MembrosComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Membros', () => {
        navBarPage.goToEntity('membros-church');
        membrosComponentsPage = new MembrosComponentsPage();
        expect(membrosComponentsPage.getTitle())
            .toMatch(/churchControlApp.membros.home.title/);

    });

    it('should load create Membros dialog', () => {
        membrosComponentsPage.clickOnCreateButton();
        membrosDialogPage = new MembrosDialogPage();
        expect(membrosDialogPage.getModalTitle())
            .toMatch(/churchControlApp.membros.home.createOrEditLabel/);
        membrosDialogPage.close();
    });

    it('should create and save Membros', () => {
        membrosComponentsPage.clickOnCreateButton();
        membrosDialogPage.setNomeInput('nome');
        expect(membrosDialogPage.getNomeInput()).toMatch('nome');
        membrosDialogPage.setTelefoneInput('telefone');
        expect(membrosDialogPage.getTelefoneInput()).toMatch('telefone');
        membrosDialogPage.setCelularInput('celular');
        expect(membrosDialogPage.getCelularInput()).toMatch('celular');
        membrosDialogPage.setEmailInput('email');
        expect(membrosDialogPage.getEmailInput()).toMatch('email');
        membrosDialogPage.setDataNascimentoInput(12310020012301);
        expect(membrosDialogPage.getDataNascimentoInput()).toMatch('2001-12-31T02:30');
        membrosDialogPage.enderecoSelectLastOption();
        membrosDialogPage.save();
        expect(membrosDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MembrosComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-membros-church div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MembrosDialogPage {
    modalTitle = element(by.css('h4#myMembrosLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    telefoneInput = element(by.css('input#field_telefone'));
    celularInput = element(by.css('input#field_celular'));
    emailInput = element(by.css('input#field_email'));
    dataNascimentoInput = element(by.css('input#field_dataNascimento'));
    enderecoSelect = element(by.css('select#field_endereco'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    }

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    }

    setTelefoneInput = function(telefone) {
        this.telefoneInput.sendKeys(telefone);
    }

    getTelefoneInput = function() {
        return this.telefoneInput.getAttribute('value');
    }

    setCelularInput = function(celular) {
        this.celularInput.sendKeys(celular);
    }

    getCelularInput = function() {
        return this.celularInput.getAttribute('value');
    }

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    }

    setDataNascimentoInput = function(dataNascimento) {
        this.dataNascimentoInput.sendKeys(dataNascimento);
    }

    getDataNascimentoInput = function() {
        return this.dataNascimentoInput.getAttribute('value');
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
