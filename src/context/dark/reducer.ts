export function reducer(state:any, action:any) {
  switch (action.type) {
    case "isDark":
      return  {isDark: !state.isDark }
    default:
      return state
  }
}
