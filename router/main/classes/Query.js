class Query {
  /**
   * @param {String} context
   */
  constructor (context) {
    this.context = context
    this.splited = this.context.split(' ')
    this.cmd = this.splited[0]
    this.args = this.splited.slice(1)
  }
}

module.exports = Query
