// way 1
// declare const request: {
//   get(params?: any): any,
//   query(params?: any): any,
//   send(): any,
// };

// way 2
export {};
declare global {
  const request: {
    get(params?: any): any,
    query(params?: any): any,
    send(): any,
  };
  const closeServer: any;
}
