const ExecutionContext = require('./ExecutionContext')
const ObjectEnvironmentRecords = require('./ObjectEnvironmentRecords')
const LexicalEnvironment = require('./LexicalEnvironment')

const objectEnvironmentRecords = new ObjectEnvironmentRecords()

// 创建全局词法环境，等级变量，查找变量
const globalLexicalEnvironment = new LexicalEnvironment()
const globalExecutionContext = new ExecutionContext(
  globalLexicalEnvironment,
  global
)
