async function createFeedCoin(name, initialSupply, plateRewardRate, userAccount) {
    try {
      // Prepare the contract call
      const transaction = await prepareContractCall({
        contract,
        method: "function createFeedCoin(string _name, uint256 _initialSupply, uint256 _plateRewardRate)",
        params: [name, initialSupply, plateRewardRate],
      });
  
      // Send the transaction
      const { transactionHash } = await sendTransaction({
        transaction,
        account: userAccount, // Wallet address of the user
      });
  
      console.log(Transaction successful with hash: ${transactionHash});
      return transactionHash; // Return the transaction hash for reference
    } catch (error) {
      console.error("Error creating FeedCoin:", error);
      throw error;
    }
  }