import Moralis from 'moralis'

export const initMoralis = () => {
  const serverUrl = 'https://weooylvieyk7.usemoralis.com:2053/server'
  const appId = 'o395vlfKiJ6dP4QkNuhhVVf5wkO8dS3B6ylwcqzV'
  Moralis.start({ serverUrl, appId })
}

export const login = async () => {
  let user = Moralis.User.current()
  if(!user) {
    user = await Moralis.authenticate({
      provider: "walletconnect",
      chainId: 80001,
      signingMessage: "Log in using Moralis"
    }).then((user) => {
      console.log("logged in user: ", user)
      console.log(user.get("ethAddress"))
    }).catch((error) => {
      console.log(error)
    })
  }
}

export const emailPhoneLogin = async (username, password) => {
  let user = Moralis.User.current()
  if (!user) {
    user = await Moralis.User.logIn(username, password)
  }
}

export const signupEmailPhone = async (username, password, email, phone) => {
  const user = new Moralis.User()
  user.set('username', username)
  user.set('password', password)
  user.set('email', email)
  user.set('phone', phone)
  try {
    await user.signUp()
  } catch (error) {
    console.error(error)
  }
}

export const resetPassword = async (email) => {
  Moralis.User.requestPasswordReset(email)
    .then(() => {
      // successful
    }).catch(error => {
      console.error(error)
    })
}

export const logout = async () => {
  await Moralis.User.logOut()
  console.log("logged out")
}

export const transferNative = async (amount, address) => {
  const options = {type:'native', amount: Moralis.Units.ETH(amount), receiver: address, contractAddress: ''}
  await Moralis.transfer(options)
}

export const transferERC20 = async (receiver, contract) => {
  const options = {type: 'erc20', amount: Moralis.Units.Token('0.5', '18')}
  let result = await Moralis.transfer(options)
}

export const transferERC721 = async () => {
  const options = {
    type: 'erc721',
    receiver: receiver,
    contractAddress: '',
    tokenId: 1
  }
  let result = await Moralis.transfer(options)
}

export const trasferERC1155 = async () => {
  // sending 15 tokens with token id = 1
  const options = {type: "erc1155",  
    receiver: "0x..",
    contractAddress: "0x..",
    tokenId: 1,
    amount: 15
  }
  let result = await Moralis.transfer(options)
}

