import { test, expect } from '@playwright/test';
import StoreService from '../../api-clients/Store/storeService.js';
import petStore from  '../../test-data/PetStore.js'; 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  test.describe.serial('Store Service API Tests', () => {      
  let createdOrder;

  test.beforeAll('Store Service - Add a new order', async () => {    
    const randomId = Math.floor(Math.random() * 10) + 1;
    const uniqueOrder = { ...petStore.newOrder, id: randomId };
    createdOrder = await StoreService.Order(uniqueOrder);
    await sleep(2000); 
  });

  test('Store Service - Get order by id', async () => {
    const retrievedOrder = await StoreService.getOrder(createdOrder.id);
    expect(retrievedOrder.name).toBe(createdOrder.name);
    await sleep(2000); 
  });  
  
  test('Store Service - Delete order', async () => {
      const res = await StoreService.deleteOrder(createdOrder.id);
      expect(res.message).toBe(String(createdOrder.id));
      await sleep(2000); 
  });
  
  test('Store Service - Get deleted order should fail', async () => {    
    try {
      await StoreService.getOrderNegativeResponse(createdOrder.id);
      throw new Error('Expected error but got success'); // safety fallback
    } catch (err) {
      expect(err.message).toContain('API Error: 404');
      expect(err.message).toContain('Order not found');
    }
  });
});