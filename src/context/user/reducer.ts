export function reducer(state:any, action:any) {
  switch (action.type) {
    case "user":
      return  {user: action.payload }
    default:
      return state
  }
}
