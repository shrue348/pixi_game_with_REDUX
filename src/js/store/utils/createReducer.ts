export default ( initialState: any ) => ( reducerMap: { [x: string]: any; } ) => ( state = initialState, action: any) => {
    const reducer = reducerMap[ action.type ];
    return reducer ? reducer( state, action ) : state;
};
