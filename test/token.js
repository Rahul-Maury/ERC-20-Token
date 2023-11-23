const { expect } = require("chai");
const { keccak256 } = require('ethereumjs-util');
describe("token contract", function () {

    let Token;
    let myContract;
    let owner;
    let otherAccount;
    let otherAccount2;
    const SPECIAL_ROLE = '0x' + keccak256('NOT_ALLOWED').toString('hex');
    beforeEach(async function () {
        Token = await ethers.getContractFactory("MyToken");
        [owner, otherAccount, otherAccount2] = await ethers.getSigners();
        myContract = await Token.deploy(owner.address);




    });

    describe("Deployment", function () {

        it("should not allow to grant minter role by any unauthorized owner,", async function () {

            expect(await myContract.hasRole(SPECIAL_ROLE, otherAccount.address)).to.equal(false);

            await expect(myContract.connect(otherAccount).NotAllowMinter(otherAccount.address)).to.be.revertedWith('OwnableUnauthorizedAccount');

            expect(await myContract.hasRole(SPECIAL_ROLE, otherAccount.address)).to.equal(false);
        });


        it('should allow owner to grant minter role', async function () {

            expect(await myContract.hasRole(SPECIAL_ROLE, otherAccount.address)).to.equal(false);

            await myContract.connect(owner).NotAllowMinter(otherAccount.address);


            expect(await myContract.hasRole(SPECIAL_ROLE, otherAccount.address)).to.equal(true);
        });



        it("should Not allowed to grant  mint by listed members", async function () {
              await myContract.connect(owner).NotAllowMinter(otherAccount.address);
          
            await expect(myContract.connect(otherAccount).mint(100)).to.be.revertedWith('Not allowed to mint')
        });

        it("should have Correct amount of ETH", async function () {
            const amount = 10;
            const ETH = 0.5;
            await expect(myContract.mint(amount, { value: amount * ETH })).to.be.revertedWith("Incorrect ETH amount");
        })

        it("should require token value greater than 0", async function () {
            await expect(myContract.mint(0)).to.be.revertedWith("Token value should be greater than 0");
        })



    })



})