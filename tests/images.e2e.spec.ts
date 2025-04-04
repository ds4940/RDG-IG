import { expect, test } from '@playwright/test';
import { ImageGalleryPage } from './Pages/ImageGalleryPage';
import { ImageService } from './Services/ImageService';
import { ImageTypeDto } from '../src/lib/data';
import { v4 as uuidv4 } from 'uuid';

let imageGalleryPage: ImageGalleryPage;
let imageService:ImageService;

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  imageGalleryPage = new ImageGalleryPage(page); 
  imageService = new ImageService(page);
});

test.afterEach(async ({ page }) => {
  await imageService.deleteImages();
});


test('An uploaded image can be', async ({ page }) => {
  const uploadedImage:ImageTypeDto = {
    title: `Test Image ${uuidv4()}`,
    image: "https://example.com/test-image.jpg",
    keywords: ["test", "image"],
    uploadDate: new Date("2023-10-01"),
    id: "unused"
  };

  await imageGalleryPage.AddImage(uploadedImage);
  
  await imageGalleryPage.TypeTextInImageSearch(uploadedImage.title);
  await imageGalleryPage.awaitNSearchResults(1)

  const imageFromGallery = await imageGalleryPage.GetImageListItems();

  expect(imageFromGallery).toBeTruthy();
  expect(imageFromGallery.length).toBe(1);
  expect(imageFromGallery[0]).toEqual({
      title: uploadedImage.title,
      keywords: uploadedImage.keywords
    });
});