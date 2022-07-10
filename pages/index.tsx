import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from "next/link";
import {useState} from "react";
import { ethers } from 'ethers';

const Home: NextPage = () => {
    const [wallet, setWallet] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [qty, setQty] = useState(1);

    async function connectAccount() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const account = await signer.getAddress();
            setWallet(account);
            setIsConnected(true);
        }
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>The Sikhies NFT</title>
        <meta name="description" content="The Sikhies NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={`fixed flex flex-row justify-between w-full px-10 py-5 ${styles['header']}`}>
          <div>
              <Link href={'https://twitter.com/thesikhiesnft'}>
                  <a target={'_blank'}>
                      <Image src={'/images/twitter.svg'} layout={'fixed'} height={50} width={50} alt={'Sikh'}/>
                  </a>
              </Link>
          </div>
          <div>
              {isConnected ? <span className={`inline-flex items-center px-6 py-2 text-base font-medium rounded-md shadow-sm cursor-pointer justify-center ${styles['connect-wallet']}`}>
                    {wallet?.substring(0,4)}....{wallet?.substr(wallet?.length - 5)}
                  </span> :
                  <button
                      type={'button'}
                      className={`inline-flex items-center px-6 py-2 text-base font-medium rounded-md shadow-sm justify-center cursor-pointer ${styles['connect-wallet']}`}
                      onClick={connectAccount}
                  >
                      Connect Wallet</button>
              }
          </div>
      </header>

      <main className={`${styles['main']} flex xl:flex-row flex-col justify-center items-center h-screen gap-20`}>
          <div className={`block ${styles['image-container']}`}>
              <Image src={'/images/S3.png'} alt={'Sikh'} layout={'responsive'} height={100} width={100}/>
          </div>
          <div className={`${styles['mint-container']} flex flex-col`}>
              <h1 className={`${styles['title']}`}>Mint Your Sikh</h1>
              <div className={`${styles['supply']} mt-5`}>200/5555</div>
              <div className={`${styles['quantity-container']} mt-5 flex xl:flex-row flex-col justify-around`}>
                  <button className={
                      `inline-flex items-center px-6 py-5 text-base font-medium rounded-md shadow-sm justify-center ${styles['qty-1']} ${qty === 1 ? styles['selected-qty'] : ''}`
                  }
                  onClick={() => setQty(1)}>1</button>
                  <button
                      className={`inline-flex items-center px-6 py-5 text-base font-medium rounded-md shadow-sm justify-center ${styles['qty-2']} ${qty === 2 ? styles['selected-qty'] : ''}`}
                      onClick={() => setQty(2)}>2</button>
              </div>
              <button
                  type="button"
                  className={`mt-5 inline-flex items-center px-6 py-5 text-base font-medium rounded-md shadow-sm justify-center ${styles['mint-button']}`}
              >
                  MINT
              </button>
          </div>
      </main>
    </div>
  )
}

export default Home
