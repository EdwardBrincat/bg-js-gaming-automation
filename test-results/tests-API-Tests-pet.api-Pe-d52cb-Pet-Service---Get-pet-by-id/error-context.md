# Test info

- Name: Pet Service API Tests >> Pet Service - Get pet by id
- Location: C:\Repo\bg-js-gaming-automation\tests\API-Tests\pet.api.spec.js:20:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Fluffy"
Received: "doggie"
    at C:\Repo\bg-js-gaming-automation\tests\API-Tests\pet.api.spec.js:22:31
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import PetService from '../../api-clients/Pet/petService.js';
   3 | import petStore from  '../../test-data/PetStore.js'; 
   4 |
   5 | function sleep(ms) {
   6 |     return new Promise(resolve => setTimeout(resolve, ms));
   7 | }
   8 |
   9 | test.describe.serial('Pet Service API Tests', () => {      
  10 |   let createdPet;
  11 |   let updatedPet;
  12 |
  13 |   test.beforeAll(async () => {    
  14 |     const randomId = Math.floor(Math.random() * 100) + 1;
  15 |     const uniquePet = { ...petStore.newPet, id: randomId };
  16 |     createdPet = await PetService.addNewPet(uniquePet);
  17 |     await sleep(2000); 
  18 |   });
  19 |
  20 |   test('Pet Service - Get pet by id', async () => {
  21 |     const retrievedPet = await PetService.getById(createdPet.id);
> 22 |     expect(retrievedPet.name).toBe(createdPet.name);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  23 |     await sleep(2000); 
  24 |   });
  25 |
  26 |   test('Pet Service - Update existing pet', async () => {
  27 |     const updatedData = { ...createdPet, name: 'FluffyUpdated' };
  28 |     updatedPet = await PetService.updatePet(updatedData);
  29 |     expect(updatedPet.name).toBe('FluffyUpdated');
  30 |     await sleep(2000); 
  31 |   });
  32 |   
  33 |   test('Pet Service - Delete pet', async () => {
  34 |       const res = await PetService.deletePet(createdPet.id);
  35 |       expect(res.message).toBe(String(createdPet.id));
  36 |       await sleep(2000); 
  37 |   });
  38 |   
  39 |   test('Pet Service - Get deleted pet should fail', async () => {    
  40 |     try {
  41 |       await PetService.getById(createdPet.id);
  42 |       throw new Error('Expected error but got success');
  43 |     } catch (err) {
  44 |       expect(err.message).toContain('API Error: 404');
  45 |       expect(err.message).toContain('Pet not found');
  46 |     }
  47 |   });
  48 | });
  49 |
```