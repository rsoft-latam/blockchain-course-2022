const Inbox = artifacts.require('Inbox')

contract('Inbox' , accounts => {

    it('getMessage', async () => {
        const instance =  await Inbox.deployed();
        const message = await instance.getMessage.call();
        assert.equal(message, "Hi")
    });
})
