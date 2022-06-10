const Notes = artifacts.require("Notes");

contract("Notes", (accounts) => {
  let instance;

  beforeEach("deploys a contract", async () => {
    instance = await Notes.new();
  });

  it("Evaluar", async () => {
    await instance.Evaluar("Ricardo Pari", 5, { from: accounts[0] });
    const id = web3.utils.keccak256("Ricardo Pari");
    const note = await instance.Notas.call(id);
    assert.equal(5, note);
  });

  it("Evaluar 2", async () => {
    await instance.Evaluar("Ricardo Pari", 5, { from: accounts[0] });
    const note = await instance.VerNotas.call("Ricardo Pari");
    assert.equal(5, note);
  });
});
