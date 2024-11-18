import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { Cryptocurrency, CryptoPrice, Pair } from "./types"
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoServices"

type Cryptostore = {
    cryptocurrencies: Cryptocurrency[]
    cryptoPrices: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair : Pair) => Promise<void>
}

export const useCryptoStore = create<Cryptostore>()(devtools((set) => ({
    cryptocurrencies: [],
    cryptoPrices: {
        IMAGEURL: '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: ''
    },
    loading: false,
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const cryptoPrices = await fetchCurrentCryptoPrice(pair)
        set(() => ({
            cryptoPrices,
            loading: false
        }))
    }
})))