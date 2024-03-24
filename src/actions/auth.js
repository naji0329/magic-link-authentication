import {
  Program, Provider, AnchorProvider,
} from '@project-serum/anchor';
import {
  login,
  logout,
  setEmail,
  setLastTime,
  setMetadata,
  setWalletAddress,
} from "../slices/authSlice";
import crypto from 'crypto'
import { setProvider } from "../slices/providerSlice";
import { getProvider } from "../utils/phantom";
import idl from '../IDL/idl.json';
import secretKey from "../keypair/keypair.json"
import testIdl from '../IDL/testIdl.json'
import * as web3 from "@solana/web3.js";
import { Connection, PublicKey } from '@solana/web3.js';
import { Public } from '@mui/icons-material';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';



const RESTAURANT = "Quick Eats";
const RATING = 5;
const REVIEW = "Always super fast!";


const programID = new PublicKey("Dnf8D1JQ4CY5nW146XpDo7DJ7kHvfAtL68V9cdMy7M15")
// const programID = new PublicKey(process.env.REACT_APP_CONTRACT)
// const testProgramId = new PublicKey("6ndUbNLmTpNgNArfR4uZgfwNvyUwgZkbXxiy5PNEDaKM")

const { Magic } = require("magic-sdk");
const { SolanaExtension } = require("@magic-ext/solana")

const rpcUrl = 'https://api.devnet.solana.com';

const magic = new Magic(process.env.REACT_APP_MAGIC, {
  extensions: {
    solana: new SolanaExtension({
      rpcUrl
    })
  }
});

function generatePrivateKeyFromPublicAddress(publicAddress) {
  const seed = crypto.createHash('sha256').update(publicAddress).digest();
  return seed
}

export const showWalletUI = () => async (dispatch) => {
  try {
    await magic.wallet.showUI().on("disconnect", () => {
      dispatch(disconnectWallet());
    });
  } catch (err) { }
};

export const checkMagicLogged = () => async (dispatch) => {
  try {
    const magicIsLoggedIn = await magic.user.isLoggedIn()
    if (magicIsLoggedIn) {
      const metadata = await magic.user.getMetadata();
      dispatch(setWalletAddress(metadata.publicAddress))
      dispatch(setMetadata(metadata))
      dispatch(setEmail(metadata.email))
      dispatch(login())
      const provider = {
        ...magic.solana,
        signTransaction: async (tx, ...rest) => {

          console.log(rest)
          const connection = new Connection(rpcUrl)
          const blockhash = await connection?.getLatestBlockhash()
          if (!blockhash) return
          const transaction = new web3.Transaction({
            ...blockhash,
            feePayer: new PublicKey(metadata.publicAddress),
          })




          const transfer = web3.SystemProgram.transfer({
            fromPubkey: new PublicKey(metadata.publicAddress),
            toPubkey: new PublicKey("8WNBXijW1MmbStcNH5DbtiwfhStJbBwwAxa9q3WBxTNR"),
            lamports: 1,
          });

          // transaction.add(newTx.instructions[0])
          transaction.add(transfer)
          // console.log("------", transfer.keys[0].pubkey.toString(), transfer.keys[1].pubkey.toString(), transfer.programId.toString())

          // console.log("------", newTx.instructions[0].keys[0].pubkey.toString(), newTx.instructions[0].keys[1].pubkey.toString(), newTx.instructions[0].keys[2].pubkey.toString(), newTx.instructions[0].programId.toString())

          console.log(transaction)




          try {
            const res = await magic.solana.signTransaction(transaction, {
              requireAllSignatures: false,
              verifySignatures: true,
            })
            console.log(res.rawTransaction)
            // console.log("signature--------", "---")
            // const signature = await connection.sendRawTransaction(res.rawTransaction);
            // console.log("signature--------", signature)

            return transaction

          } catch (err) {
            console.log(err)
          }
        }
      }
      dispatch(setProvider(provider))
    }
  } catch (err) {

  }
}
export const connectPhantom = () => async (dispatch) => {
  try {
    const provider = getProvider();
    if (provider) {
      const response = await provider.connect();
      let wallet = response.publicKey.toString();
      dispatch(login())
      dispatch(setWalletAddress(wallet))
      dispatch(setProvider(provider))

    }
  } catch (err) {

  }
}
export const connectWallet = (email) => async (dispatch) => {

  try {
    await magic.auth.loginWithEmailOTP({ email });
    const metadata = await magic.user.getMetadata()
    dispatch(setWalletAddress(metadata.publicAddress));
    dispatch(setMetadata(metadata))
    dispatch(setEmail(metadata.email))
    dispatch(login());
    // dispatch(setProvider(magic.solana))
  } catch (err) {

  }

};

export const checkEntry = (provider, address) => async (dispatch) => {
  try {
    const connection = new Connection("https://api.devnet.solana.com")
    const anchorProvider = new AnchorProvider(connection, provider, "processed")

    const program = new Program(idl, programID, anchorProvider);

    const privateKey = generatePrivateKeyFromPublicAddress(address);


    const baseAccount = web3.Keypair.fromSeed(privateKey)
    await program.rpc.checkIn({
      accounts: {
        checkInAccount: baseAccount.publicKey,
        user: new PublicKey(address),
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [baseAccount]

    });

    const res = await program.account.checkInAccount.fetch(baseAccount.publicKey);
    console.log("!!!", res.lastCheckIn.toString())
    dispatch(setLastTime(res.lastCheckIn.toString()))
  }
  catch (err) {
    console.log(err)
  }
}
export const getLastTime = (provider, address) => async (dispatch) => {
  const connection = new Connection("https://api.devnet.solana.com")
  const anchorProvider = new AnchorProvider(connection, provider, "processed")
  const program = new Program(idl, programID, anchorProvider);

  const privateKey = generatePrivateKeyFromPublicAddress(address);

  const baseAccount = web3.Keypair.fromSeed(privateKey)

  try {
    const res = await program.account.checkInAccount.fetch(baseAccount.publicKey);
    console.log("!!!", res.lastCheckIn.toString())
    dispatch(setLastTime(res.lastCheckIn.toString()))

  } catch (err) {
    console.log("error", err)
  }

}

export const disconnectWallet = () => async (dispatch) => {
  const isLoggedIn = await magic.user.isLoggedIn();
  try {
    if (isLoggedIn) {
      await magic.user.logout();
    } else {
      await magic.wallet.disconnect();
    }
  } catch (err) { }
  dispatch(logout());
};
