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
    it('advanced 127.0.0.1 from 127.0.0.1', async function(){
        this.timeout(1000)
        // fails on WSL & windows
        const session = NetPing.createSession ({timeout: 800, _debug: true});
        try {
            const target = "127.0.0.1"
            await session.pingHost (target, undefined, {src: "127.0.0.1"});
        } finally {
            session.close()
        }
    })
})