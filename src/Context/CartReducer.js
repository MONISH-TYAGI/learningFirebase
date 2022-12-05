export const CartReducer=(state,action)=>{
    const objType=action.doc;
    console.log("state "+JSON.stringify(objType));
    let {number,word}=state;

    switch(action.type)
    {
        case 'Print':
            console.log("print");
         console.log("initial"+ number+ " and "+word);
         console.log("ans ",objType);
         number=objType.Name;
         word=objType.Review;
         console.log("final1"+ number+ " and "+word);
            return state;
    }
}