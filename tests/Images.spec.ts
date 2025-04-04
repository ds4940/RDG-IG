import { expect } from '@playwright/test';
import { test } from './Fixtures/MockImages';
import { ImageGalleryPage } from './Pages/ImageGalleryPage';
import { ImageService } from './Services/ImageService';
import { ImageTypeDto } from '../src/lib/data';

let imageGalleryPage: ImageGalleryPage;
let imageService:ImageService;

test.beforeEach(async ({ page, mockImages }) => {
  // Navigate to the page before all tests
  const a = 1;
  await page.goto('/');
  imageGalleryPage = new ImageGalleryPage(page); 
  imageService = new ImageService(page);
});

test.afterEach(async ({ page }) => {
  await imageService.deleteImages();
});

test('has expected images', async ({ page, mockImages }) => {
  const images = await imageGalleryPage.GetImageListItems();

  expect(images).toEqual(
    mockImages.map((mockImage) => ({
      title: mockImage.title,
      keywords: mockImage.keywords
    }))
  );
});

test('adds an image to the gallery', async ({ page }) => {
  const image:ImageTypeDto = {
    title: "Test Image",
    image: "https://example.com/test-image.jpg",
    keywords: ["test", "image"],
    uploadDate: new Date("2023-10-01"),
    id: "unused"
  };

  let interceptedPostData = { body: null };
  imageService.interceptImagesEndpoint(interceptedPostData);

  await imageGalleryPage.AddImage(image);

  expect(interceptedPostData).not.toBeNull();
  expect(interceptedPostData.body).toEqual({
    title: image.title,
    image: image.image,
    keywords: image.keywords,
    uploadDate: image.uploadDate.toDateString(),
  });
});

test('Filters images based on text search', async ({ page, mockImages }) => {

  const searchText = "Book";
  const filteredImages = mockImages.filter((image) =>
    image.title.toLowerCase().includes(searchText.toLowerCase()));
  await imageGalleryPage.TypeTextInImageSearch("Book");

  const images = await imageGalleryPage.GetImageListItems();

  expect(images).toEqual(
    filteredImages.map((mockImage) => ({
      title: mockImage.title,
      keywords: mockImage.keywords
    }))
  );
});