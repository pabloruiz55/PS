import { Controller } from "@hotwired/stimulus"
import { configureChains, mainnet, createConfig, connect, fetchEnsName, getAccount } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import { InjectedConnector } from '@wagmi/core/connectors/injected'


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

const { address } = await connect({
  connector: new InjectedConnector()
})

// Connects to data-controller="account"
export default class extends Controller {
  static targets = [ "output" ]

  async connect() {
    const account = getAccount()
    this.outputTarget.textContent =
    `Hello, ${account.address}!`
  }
}
