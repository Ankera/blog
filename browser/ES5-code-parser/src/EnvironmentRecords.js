class EnvironmentRecords {
  constructor(bindings) {
    this.bindings = bindings || {}
  }

  createBinding(N) {
    this.bindings[N] = undefined
  }

  setBindings(N, V) {
    this.bindings[N] = V
  }

  hasBinding(N) {
    return N in this.bindings
  }

  getBindingValue(N) {
    return this.bindings[N]
  }
}

module.exports = EnvironmentRecords
