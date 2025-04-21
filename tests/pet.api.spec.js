import { test, expect } from '@playwright/test';
import PetService from '../api-clients/Pet/petService.js';
import petStore from  '../test-data/PetStore.js'; 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test.describe.serial('Pet Service API Tests', () => {      
  let createdPet;
  let updatedPet;

  test.beforeAll(async () => {    
    const randomId = Math.floor(Math.random() * 100) + 1;
    const uniquePet = { ...petStore.newPet, id: randomId };
    createdPet = await PetService.addNewPet(uniquePet);
    await sleep(2000); 
  });

  test('Pet Service - Get pet by id', async () => {
    const retrievedPet = await PetService.getById(createdPet.id);
    expect(retrievedPet.name).toBe(createdPet.name);
    await sleep(2000); 
  });

  test('Pet Service - Update existing pet', async () => {
    const updatedData = { ...createdPet, name: 'FluffyUpdated' };
    updatedPet = await PetService.updatePet(updatedData);
    expect(updatedPet.name).toBe('FluffyUpdated');
    await sleep(2000); 
  });
  
  test('Pet Service - Delete pet', async () => {
      const res = await PetService.deletePet(createdPet.id);
      expect(res.message).toBe(String(createdPet.id));
      await sleep(2000); 
  });
  
  test('Pet Service - Get deleted pet should fail', async () => {    
    try {
      await PetService.getById(createdPet.id);
      throw new Error('Expected error but got success');
    } catch (err) {
      expect(err.message).toContain('API Error: 404');
      expect(err.message).toContain('Pet not found');
    }
  });
});
