const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const signer = ethers.provider.getSigner(0);

    return { game, signer };
  }
  it('should be a winner', async function () {
    const { game,signer} = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    const ad  = await signer.getAddress();
    await game.connect(signer).write(ad);
    await game.connect(signer).win(ad);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
