export function reducer(state:any, action:any) {
  switch (action.type) {
    case "notification":
      return { text: action.payload.text, type: action.payload.type  };
    default:
      return state;
  }
}
