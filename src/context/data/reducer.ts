export function reducer(state:any, action:any) {
  switch (action.type) {
    case "data":
      return  {data: action.payload }
    default:
      return state
  }
}
