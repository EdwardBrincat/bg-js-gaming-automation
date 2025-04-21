# Test info

- Name: Store Service API Tests >> Store Service - Get deleted order should fail
- Location: C:\Repo\bg-js-gaming-automation\tests\store.api.spec.js:31:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "API Error: 404"
Received string:    "Expected error but got success"
    at C:\Repo\bg-js-gaming-automation\tests\store.api.spec.js:36:27
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import StoreService from '../api-clients/Store/storeService.js';
   3 | import petStore from  '../test-data/PetStore.js'; 
   4 |
   5 | function sleep(ms) {
   6 |     return new Promise(resolve => setTimeout(resolve, ms));
   7 |   }
   8 |
   9 |   test.describe.serial('Store Service API Tests', () => {      
  10 |   let createdOrder;
  11 |
  12 |   test.beforeAll(async () => {    
  13 |     const randomId = Math.floor(Math.random() * 10) + 1;
  14 |     const uniqueOrder = { ...petStore.newOrder, id: randomId };
  15 |     createdOrder = await StoreService.Order(uniqueOrder);
  16 |     await sleep(2000); 
  17 |   });
  18 |
  19 |   test('Store Service - Get order by id', async () => {
  20 |     const retrievedOrder = await StoreService.getOrder(createdOrder.id);
  21 |     expect(retrievedOrder.name).toBe(createdOrder.name);
  22 |     await sleep(2000); 
  23 |   });  
  24 |   
  25 |   test('Store Service - Delete order', async () => {
  26 |       const res = await StoreService.deleteOrder(createdOrder.id);
  27 |       expect(res.message).toBe(String(createdOrder.id));
  28 |       await sleep(2000); 
  29 |   });
  30 |   
  31 |   test('Store Service - Get deleted order should fail', async () => {    
  32 |     try {
  33 |       await StoreService.getOrder(createdOrder.id);
  34 |       throw new Error('Expected error but got success'); // safety fallback
  35 |     } catch (err) {
> 36 |       expect(err.message).toContain('API Error: 404');
     |                           ^ Error: expect(received).toContain(expected) // indexOf
  37 |       expect(err.message).toContain('Order not found');
  38 |     }
  39 |   });
  40 | });
```