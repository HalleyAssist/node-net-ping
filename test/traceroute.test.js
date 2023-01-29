const NetPing = require('../index')

const {expect} = require('chai')

describe("traceroute", function(){
    it('simple 127.0.0.1', async function(){
        this.timeout(1000)
        const session = NetPing.createSession ({timeout: 800, _debug: true});
        try {
            const target = "127.0.0.1"
            let r
            const p = new Promise(resolve => r = resolve)
            session.traceRoute (target, {}, ()=>{}, r);
            await p

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
            let r
            const p = new Promise(resolve => r = resolve)
            session.traceRoute (target, {src: "127.0.0.1"}, ()=>{}, r);
            await p

            expect(session.reqsPending).to.be.eql(0)
        } finally {
            session.close()
        }
    })
    it('should still count reqs on exception', async function(){
        this.timeout(1000)
        const session = NetPing.createSession ({timeout: 800, _debug: true});
        try {
            const target = "127.0.0.1"
            let r
            const p = new Promise(resolve => r = resolve)
            session.traceRoute (target, {}, ()=>{
                throw new Error("test")
            }, r);
            await p

            expect(session.reqsPending).to.be.eql(0)
        } finally {
            session.close()
        }
    })
    it('simple invalid', async function(){
        this.timeout(2000)
        const session = NetPing.createSession ({timeout: 100, _debug: true});
        try {
            const target = "0.0.0.1"
            let r
            const p = new Promise(resolve => r = resolve)
            session.traceRoute (target, {}, ()=>{}, r);
            await p

            expect(session.reqsPending).to.be.eql(0)
        } finally {
            session.close()
        }
    })
})