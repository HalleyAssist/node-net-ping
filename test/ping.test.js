const NetPing = require('../index')

describe("ping", function(){
    it('simple 127.0.0.1', async function(){
        this.timeout(1000)
        const session = NetPing.createSession ({timeout: 800, _debug: true});
        try {
            const target = "127.0.0.1"
            await session.pingHost (target);
        } finally {
            session.close()
        }
    })
    
})