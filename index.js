import ethers from 'ethers';

const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = [
  'function counter() view returns (uint256)',
  'function increment()'
];

const mumbai = {
  name: 'mumbai',
  chainId: 80001,
  _defaultProvider: (providers) =>
    new providers.JsonRpcProvider('https://matic-mumbai.chainstacklabs.com')
};

const provider = ethers.getDefaultProvider(mumbai);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const counterContract = new ethers.Contract(contractAddress, abi, provider);
const counter = counterContract.connect(wallet);

const increment = async () => {
  console.log('🤖 Incrementing counter...');

  // Just call the method...
  const tx = await counter.increment();
  await tx.wait();

  const value = await counterContract.counter();
  console.log(`✅ Done. New value is ${value}`);
};

increment();
