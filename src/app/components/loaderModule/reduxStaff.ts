const ENABLE_LOADER = 'ENABLE_LOADER';
const DISABLE_LOADER = 'DISABLE_LOADER';

export const showLoader = () => ({
  type: ENABLE_LOADER
});

export const hideLoader = () => ({
  type: DISABLE_LOADER
});

export const loaderReducer = (state:boolean=true, action:any) => {
  switch (action.type){
    case ENABLE_LOADER: return true;
    case DISABLE_LOADER: return false;

    default: return state;
  }
};
