import { test, expect } from '@playwright/test';

test('Test API Status', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts');
  const json = await response.json()
  const header = await response.headers(); 
  console.log(header)
  //console.log(json)
  await expect(response.status()).toBe(200) // check status http
});

test('Test API value in conection', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    const header = await response.headers(); 
    await expect(header.connection).toContain('keep-alive') // check value of varable conection
  });

  test('Test API Check Header', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    const header = await response.headers(); 
    await expect(header).toHaveProperty('x-content-type-options');  // check header have varable x-content-type-options
  });