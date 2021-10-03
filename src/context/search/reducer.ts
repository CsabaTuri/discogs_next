export function reducer(state:any, action:any) {
  switch (action.type) {
    case "search":
      return  {search: action.payload }
    default:
      return state
  }
}
