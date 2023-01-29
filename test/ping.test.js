const NetPing = require('../index')

const {expect} = require('chai')

describe("ping", function(){
    it('simple 127.0.0.1', async function(){
        this.timeout(1000)
        const session = NetPing.createSession ({timeout: 800, _debug: true});
        try {
            const target = "127.0.0.1"
            await session.pingHost (target);

            expect(session.reqsPending).to.be.eql(0)
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

            expect(session.reqsPending).to.be.eql(0)
        } finally {
            session.close()
        }
    })
    it('aggressive 127.0.0.1', async function(){
        this.timeout(1000)
        const session = NetPing.createSession ({timeout: 800, _debug: true});
        try {
            const target = "127.0.0.1"
            await session.pingHost (target, null, {aggressiveCount: 2});

            expect(session.reqsPending).to.be.eql(0)
        } finally {
            session.close()
        }
    })
    it('really aggressive 127.0.0.1', async function(){
        this.timeout(1000)
        const session = NetPing.createSession ({timeout: 800, _debug: true});
        try {
            const target = "127.0.0.1"
            await session.pingHost (target, null, {aggressiveCount: 20});

            expect(session.reqsPending).to.be.eql(0)
        } finally {
            session.close()
        }
    })
    it('aggressive invalid', async function(){
        this.timeout(2000)
        const session = NetPing.createSession ({timeout: 80, _debug: true});
        let e
        try {
            const target = "0.0.0.1"
            await session.pingHost (target, null, {aggressiveCount: 2});

            expect(session.reqsPending).to.be.eql(0)
        } catch(ex) {
            e = ex
        } finally {
            session.close()
        }
        expect(e.message).to.be.eql("Request 2 timed out")
    })
    it('retries invalid', async function(){
        this.timeout(2000)
        const session = NetPing.createSession ({timeout: 80, _debug: true});
        let e
        try {
            const target = "0.0.0.1"
            await session.pingHost (target, null, {retries: 2});

            expect(session.reqsPending).to.be.eql(0)
        } catch(ex) {
            e = ex
        } finally {
            session.close()
        }
        expect(e.message).to.be.eql("Request 2 timed out")
    })
})