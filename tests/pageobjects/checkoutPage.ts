import { Locator, Page } from "@playwright/test";


export class CheckoutPage {
    private readonly page: Page;
    private readonly FirstnameInput: Locator;
    private readonly LastnameInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.FirstnameInput =  page.getByRole('textbox' , {name: 'First Name'});
        this.LastnameInput = page.getByRole('textbox' , {name: 'Last Name'});
        this.zipCodeInput = page.getByRole('textbox' , {name: 'Zip/Postal Code'});
        this.continueButton = page.getByRole('button' , {name: 'Continue'});
        this.finishButton =  page.getByRole('button' , {name: 'Finish'});
    }

    async fillFirstname(firstname: string){
        await this.FirstnameInput.fill(firstname)
    }

    async fillLastname(lastname: string){
        await this.LastnameInput.fill(lastname)
    }

    async fillZipcode(zipCode: string){
        await this.zipCodeInput.fill(zipCode)
    }

    async fillContinuebutton() {
        await this.continueButton.click();
}

    async fillFinishbutton() {
        await this.finishButton.click();
}
}