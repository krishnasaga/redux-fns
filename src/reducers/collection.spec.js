import { createCollectionReducer } from './collection';

describe('collections reducer',()=>{

  describe('With no initial collection provided',() => {
   const collectionReducer = createCollectionReducer({});
    it('should initilize thee state with empty collection',()=>{
      const nextState = collectionReducer(undefined,{});
      expect(nextState).toEqual({
         collection: {}
       });
    });
  });

  describe('With initial collection provided',() => {
    const collectionReducerEnptyInitialCollection 
      = createCollectionReducer({
        collection: {}
      });

    const collectionReducerNonEmptyInitialCollection 
      = createCollectionReducer({
        initialCollection: [{ id: 1 }]
      });

     it('should initilize the state with a collection',()=>{
       expect(collectionReducerEnptyInitialCollection(undefined,{}))
         .toEqual({
          collection: {}
        });

        expect(collectionReducerNonEmptyInitialCollection(undefined,{}))
        .toEqual({
         collection: {
             1: { id: 1 }
         }
       });

     });
   });

   describe('Add entites to collection',() => {
    const collectionReducerEnptyInitialCollection 
      = createCollectionReducer({
        addWhen: (action) => action.type === 'ADD',
        collection: []
      });

    const collectionReducerNonEmptyInitialCollection 
      = createCollectionReducer({
        addWhen: (action) => action.type === 'ADD',
        initialCollection: [{ id: 1 }]
      });

     it('should able to add a single entity',()=>{
       expect(collectionReducerEnptyInitialCollection(undefined,{
           type: 'ADD',
           data: { id: 1 }
       }))
         .toEqual({
          collection: {
            1: { id: 1 }
          }
        });

        expect(collectionReducerNonEmptyInitialCollection(undefined,{
          type: 'ADD',
          data: { id: 2 }
        }))
        .toEqual({
         collection: {
             1: { id: 1 },
             2: { id: 2 }
         }
       });

     });


     it('should able to add multiple entites',()=>{
        expect(collectionReducerEnptyInitialCollection(undefined,{
            type: 'ADD',
            data: [{ id: 1 },{ id: 2 }]
        }))
          .toEqual({
           collection: {
               1: { id: 1 },
               2: { id: 2 }
           }
         });
 
         expect(collectionReducerNonEmptyInitialCollection(undefined,{
           type: 'ADD',
           data: { id: 2 }
         }))
         .toEqual({
          collection: {
              1: { id: 1 },
              2: { id: 2 }
          }
        });
 
      });


   });

});
