import React, { FC, useState } from 'react'

export const WalletContext = React.createContext({ provider: null, setProvider: (param:any) => {}, walletAddress: '', setWalletAddress: (address:any) => {} })

interface WalletContextProviderProps {
    children: any;
}

export const WalletContextProvider: FC<WalletContextProviderProps> = ({ children }) => {

  const [provider, setProvider] = useState(null)
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <WalletContext.Provider value={{ provider: provider, setProvider: setProvider, walletAddress: walletAddress, setWalletAddress: setWalletAddress }}>
        { children }
    </WalletContext.Provider>
  )
}