const TestCollege = artifacts.require("TestCollege");

const weiToEther = (wei) => {
    const ether = web3.utils.fromWei(wei, 'ether');
    return parseInt(ether);
}

contract("TestCollege", (accounts) => {

    let instance;
    const newNote = {id: 1, name: "Juan Perez", score: 0, finalized: false, typeTest: 0};

    beforeEach("deploys a contract", async () => {
        instance = await TestCollege.new();
    });

    it("1.- Realizar el testing solo el docente puede adicionar una nueva revision de nota, empezando score = 0, finalized = false" +
        " y typeTest = 0 controlar de forma interna", async () => {
        await instance.createRevision(Object.values(newNote), {from: accounts[0]});
        const note = await instance.listNotes.call(newNote.id);
        assert.equal(note.id, newNote.id);
        assert.equal(note.name, newNote.name);
        assert.equal(note.score, 0);
        assert.equal(note.finalized, false);
        assert.equal(note.typeTest, 0);
    });

    it("2.- Realizar el testing solo el docente puede finalizar una revision cambiando finalized = true, typeTest = 1, y " +
        "colocando el score segun lo que corresponda, solo puede realizar la revision una sola ves", async () => {
        const newScore = 80;
        await instance.createRevision(Object.values(newNote), {from: accounts[0]});
        await instance.finalizeReview(newNote.id, newScore, {from: accounts[0]});
        const note = await instance.listNotes.call(newNote.id);
        assert.equal(note.id, newNote.id);
        assert.equal(note.name, newNote.name);
        assert.equal(note.score, newScore);
        assert.equal(note.finalized, true);
        assert.equal(note.typeTest, 1);
    });

    it("3.- Realizar el testing si un estudiante obtiene la nota de 100", async () => {
        const newScore = 100;
        await instance.createRevision(Object.values(newNote), {from: accounts[0]});
        await instance.finalizeReview(newNote.id, newScore, {from: accounts[0]});
        const note = await instance.listNotes.call(newNote.id);
        assert.equal(note.score, newScore);
    });

    it("4.- Realizar el testing solo el docente puede dar por finalizado la revision en general", async () => {
        try {
            const revisionsClosed = true;
            await instance.closeOrOpenRevisions(revisionsClosed, {from: accounts[0]});
            await instance.createRevision(Object.values(newNote), {from: accounts[0]});
            assert(false)
        } catch (e) {
            assert.equal(e.reason, 'The revisions finalized.');
        }
    });

    it("5.- Realizar el testing en caso que el estudiante tenga una nota mayor a 90 se redondea a 100 al momento de " +
        "calificar , controlar internamente", async () => {
        const newScore = 91;
        await instance.createRevision(Object.values(newNote), {from: accounts[0]});
        await instance.finalizeReview(newNote.id, newScore, {from: accounts[0]});
        const note = await instance.listNotes.call(newNote.id);
        assert.equal(note.score, 100);
    });

    it("6.- Realizar el testing al crear la revision de nota el nombre del estudiante debe tener una longitud mayor a 5 de " +
        "forma obligatoria", async () => {
        try {
            await instance.createRevision(Object.values({...newNote, name: "test"}), {from: accounts[0]});
            assert(false)
        } catch (e) {
            assert.equal(e.reason, 'The name of student should be more than.')
        }
    });

    it("7.- Realizar el testing el estudiante puede solitar el 2T una ves que su nota este cerrada (finalized = true y typeTest =1) " +
        "pagando 10 ETH a la universidad, al terminar la solicitud los datos cambian a finalized = false, typeTest = 2, score= 0, " +
        "controlar el monto ingresado y si el docente ya reviso el examen anteriormente", async () => {
        const newScore = 30;
        const amountTo2T = '20';
        await instance.createRevision(Object.values(newNote), {from: accounts[0]});
        await instance.finalizeReview(newNote.id, newScore, {from: accounts[0]});

        await instance.request2T(newNote.id, {from: accounts[1], value: web3.utils.toWei(amountTo2T, "ether")});
        const collegeBalance = await web3.eth.getBalance(instance.address);
        const note = await instance.listNotes.call(newNote.id);
        assert.equal(note.id, newNote.id);
        assert.equal(note.name, newNote.name);
        assert.equal(note.score, 0);
        assert.equal(note.finalized, false);
        assert.equal(note.typeTest, 2);
        assert.equal(weiToEther(collegeBalance), Number(amountTo2T));
    });

    it("8.- Realizar el testing solamente el docente puede consultar el balance total de la universidad", async () => {
        const newScore = 30;
        const amountTo2T = '20';
        await instance.createRevision(Object.values(newNote), {from: accounts[0]});
        await instance.finalizeReview(newNote.id, newScore, {from: accounts[0]});

        await instance.request2T(newNote.id, {from: accounts[1], value: web3.utils.toWei(amountTo2T, "ether")});
        const balance = await instance.balanceOfCollege.call({from: accounts[0]});
        assert.equal(weiToEther(balance), Number(amountTo2T));
    });

});
