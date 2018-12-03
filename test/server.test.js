const { expect } = require('chai');
const axios = require('axios');
const routes = require('../routes');

const serverHandle = ((app) => {
  let server;

  const handle = {
    startServer: async () => {
      await new Promise((res) => {
        server = app.listen(res);
      });
    },
    stopServer: async () => {
      await server.close();
      server = null;
    },
    getDomain: () => `http://localhost:${server.address().port}`,
  };

  return handle;
})(routes);

describe('server', () => {
  before(() => serverHandle.startServer())
  after(() => serverHandle.stopServer())

  it('should respond on the health endpoint', async () => {
    const response = await axios.get(`${serverHandle.getDomain()}/health`)
    expect(response.data).to.contain('I\'m health');
    expect(response.status).to.equal(200);
  });
});
