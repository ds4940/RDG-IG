import { Page, Route } from '@playwright/test';
import playwrightConfig from '../../playwright.config';

export class ImageService {
    private page: Page;
    private baseUrl:string|undefined = playwrightConfig?.use?.baseURL;
    private idsToDelete: string[] = [];
    constructor(page: Page) {
        this.page = page;
        
    }

    public async interceptImagesEndpoint(postData:{body:any}): Promise<void> {
        await this.page.route('**/api/images', (route) => {
            if (route.request().method() === 'POST') {
                postData.body = JSON.parse(route.request().postData() || '{}');
                postData.body.uploadDate = new Date(postData.body.uploadDate).toDateString()
                this.idsToDelete.push(postData.body.id);
            }
            route.continue();
          });
    }
    
    public async deleteImages(): Promise<void> {
        for (const id of this.idsToDelete) {
            const response = await this.page.request.delete(`{${this.baseUrl}00/api/images?id=${id}`);
            if (response.status() === 200) {
                console.log(`Successfully deleted image with ID: ${id}`);
            } else {
                console.error(`Failed to delete image with ID: ${id}. Status: ${response.status()}`);
            }
        }
        this.idsToDelete = [];
    }
}