import { Page, Locator } from '@playwright/test';

export class DatePicker
{
    private page: Page;
    private dateInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dateInput = this.page.getByTestId('ImageDate').locator('input');
    }

    public async SetDate(date: Date): Promise<void> {
        
        await this.clear();
        
        const month = (date.getMonth() + 1).toString();
        await this.SetDatePart(month);

        const day = date.getDate().toString();
        await this.SetDatePart(day);

        const year = date.getFullYear().toString();
        await this.SetDatePart(year);
    }

    private async clear() {
        await this.dateInput.click();
        await this.dateInput.press('ArrowLeft');
        await this.dateInput.press('ArrowLeft');
        await this.dateInput.press('ArrowLeft');
    }

    private async SetDatePart(datePart:string) {
        await this.dateInput.press('Delete');
        await this.dateInput.pressSequentially(datePart);
        if (datePart.length < 2) {
            await this.dateInput.press('ArrowRight');
        }
    }
}