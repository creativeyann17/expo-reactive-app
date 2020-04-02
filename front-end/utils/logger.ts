export const debug = (message?: any, ...optionalParams: any[]) => {
  if (__DEV__) {
    console.log(message, optionalParams);
  }
};
