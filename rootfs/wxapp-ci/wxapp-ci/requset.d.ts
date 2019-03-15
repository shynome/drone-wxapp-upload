declare function request(url:string):Promise<object>
declare function request(url:'/loginresult'):Promise<{
  loginStatus?: 'PENDING'|'SUCCESS',
  /**
   * example: `{ code: number, error: string }`
   */
  loginStatusMsg : string
}>

export = request
