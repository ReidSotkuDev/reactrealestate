class ProjectStore {
    constructor (initialState) {
      this.state = initialState;
    }
  
    setState (state) {
      this.state = state;
    }
  
    getState () {
      return this.state;
    }
  }
  
  const projectStore = new ProjectStore();
  export default projectStore;