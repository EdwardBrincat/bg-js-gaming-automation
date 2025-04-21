const petStore = {
    newPet: {
      id: Date.now(),
      category: { id: 1, name: 'Dog' },
      name: 'Fluffy',
      photoUrls: ['https://www.pexels.com/photo/two-yellow-labrador-retriever-puppies-1108099/'],
      tags: [{ id: 1, name: 'cute' }],
      status: 'available'
    },
    formUpdate: {
      name: 'FormUpdated',
      status: 'pending'    
    },
    newOrder: {
      id: Date.now(),
      petId: 1,
      quantity: 2,
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: true
    }
  };
  
  export default petStore;