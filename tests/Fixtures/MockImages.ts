import { test as baseTest } from '@playwright/test';
import { ImageTypeDto } from '../../src/lib/data';

const mockImages: ImageTypeDto[] = [
  {
    id: 'data_id_1',
    title: 'Open Book',
    image: 'https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4',
    keywords: ['book', 'reading', 'pages'],
    uploadDate: new Date('2021-01-01'),
  },
  {
    id: 'data_id_2',
    title: 'Mountain Range',
    image: 'https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU',
    keywords: ['mountains', 'snow', 'cold'],
    uploadDate: new Date('2022-02-22'),
  },
  {
    id: 'data_id_3',
    title: 'Coffee Cup',
    image: 'https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM',
    keywords: ['coffee', 'awake', 'mug'],
    uploadDate: new Date('2023-12-31'),
  },
];

export const test = baseTest.extend<{
  mockImages: ImageTypeDto[];
  interceptedPostData: { body: any } | null;
}>({
  mockImages: async ({ page }, use) => {
    await page.route('**/api/images', (route) => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockImages),
        });
      } else {
        route.continue();
      }
    });

    // this yields the varaible to the test
    await use(mockImages);
  }
});