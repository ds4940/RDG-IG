import { Page } from '@playwright/test';
import { DatePicker } from '../Components/DatePicker';
import { ImageTypeDto } from '../../src/lib/data';
export class ImageGalleryPage
{
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    private ByTestGroup(group: string): string {
        return `[data-test-group=${group}]`;
    }

    public async TypeTextInImageSearch(text:string): Promise<void> {
        await this.page.getByTestId('ImageSearch').locator('input').fill(text)
    }

    public async awaitNSearchResults(nExpectedImages: number): Promise<void> {
        await this.page.waitForFunction(
            (expectedCount) => {
                const items = document.querySelectorAll('[data-test-group="ImageListItemBar"]');
                return items.length === expectedCount;
            },
            nExpectedImages
        );
    }

    public async GetImageListItems(): Promise<Array<{ title: string|null; keywords: string[]|null }>> {
         const locs = this.page.locator(this.ByTestGroup("ImageListItem"))
        
        
        return await locs.evaluateAll((items) =>
            items.map((item) => {
                const itemBar = item.querySelector('[data-test-group=ImageListItemBar]');
                const title = itemBar?.querySelector('div > div > div:first-child')?.textContent?.trim()?? null;
                const imageTag = item.querySelector('[data-test-group=ImageListItemImg]');
                const keywords = imageTag?.getAttribute('alt')?.split(',')?.map((keyword) => keyword.trim()) ?? null;

                return { title, keywords };
            })
        );
    }

    public async AddImage(image:ImageTypeDto): Promise<void> {
      await this.page.getByTestId("AddImage").click();

      await this.page.getByTestId("Title").locator("input").fill(image.title);
      await this.page.getByTestId("Url").locator("input").fill(image.image);

      await this.AddKeywords(image.keywords);

      const datePicker = new DatePicker(this.page);
      await datePicker.SetDate(image.uploadDate);

      await this.page.getByTestId("SumbitImage").click();
   }

   private async AddKeywords(keywords: string[]): Promise<void> {
        const keywordsInput = this.page.getByTestId("Keywords").locator("input");
        for(const keyword of keywords) {
            await keywordsInput.fill(keyword);
            await keywordsInput.press("Enter");
        }
    }

    public async AddNewImage(): Promise<Array<{ title: string|null; keywords: string[]|null }>> {
        const locs = this.page.locator(this.ByTestGroup("ImageListItem"))
       
       
       return await locs.evaluateAll((items) =>
           items.map((item) => {
               const itemBar = item.querySelector('[data-test-group=ImageListItemBar]');
               const title = itemBar?.querySelector('div > div > div:first-child')?.textContent?.trim()?? null;
               const imageTag = item.querySelector('[data-test-group=ImageListItemImg]');
               const keywords = imageTag?.getAttribute('alt')?.split(',')?.map((keyword) => keyword.trim()) ?? null;

               return { title, keywords };
           })
       );
   }
}

