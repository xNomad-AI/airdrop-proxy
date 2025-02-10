# Airdrop Proxy 🎯
Enables AI-NFTs to claim airdrops and delegate airdrop eligibility. This service is part of the [xNomad](https://docs.xnomad.ai/) ecosystem.

## ✨ Features

- **Airdrop Delegation**: Securely delegate your airdrop eligibility to another wallet
- **Action Hooks**: Customizable hooks for pre and post-airdrop actions
- **Multi-chain Support**: Support for various blockchain networks

## ⛓️ Supported Networks
- Solana
- EVM (Coming soon)
## 🚀 Quick Start

### Local Development Setup
```shell
# Clone the repository
git clone https://github.com/xNomad-AI/airdrop-proxy.git 
cd airdrop-proxy

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env 

# Start the service
pnpm start:dev
```

### 🐳 Docker Deployment

```shell
# Build and start the containers
docker-compose up -d

# Monitor the logs
docker-compose logs -f

# Stop the service:
docker-compose down
```

## 📊 Data Model

### Airdrop Program Schema

The airdrop program is the core data structure that defines how an airdrop operates.

#### AirdropProgram
| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier for the airdrop program |
| `protocol` | `string` | Protocol identifier (e.g., "ETH", "SOL") |
| `version` | `string` | Version of the airdrop program |
| `name` | `string` | Display name of the airdrop program |
| `description` | `string` | Detailed description of the airdrop |
| `private` | `boolean` | Whether the airdrop is private or public |
| `private` | `boolean` | Whether the airdrop is private or public |
| `issuer` | `Issuer` | Issuer of the airdrop program |
| `Rules` | `Rule` | Rules of the airdrop program |
| `updatedAt` | `Date` | Timestamp of last update |

#### Issuer
| Field | Type | Description |
|-------|------|-------------|
| `issuer.name` | `string` | Name of the airdrop issuer |
| `issuer.officialWebsite` | `string` | Official website URL |
| `issuer.image` | `string` | Logo or image URL |
| `issuer.twitter` | `string` | Twitter handle |
| `issuer.telegram` | `string` | Telegram group link |
| `issuer.discord` | `string` | Discord server invite |
| `issuer.contract` | `string?` | Optional contract address |
| `issuer.token` | `string?` | Optional token identifier |
| `issuer.createdAt` | `Date` | Timestamp of issuer record creation |
| `issuer.updatedAt` | `Date` | Timestamp of issuer record update |

#### Rules
| Field | Type | Description |
|-------|------|-------------|
| `rules.target` | `Target` | Target type of the airdrop |
| `rules.claimMethod` | `ClaimMethod` | Method used for claiming |
| `rules.claimUrl` | `string` | URL for claim endpoint |
| `rules.checkEligibilityUrl` | `string` | URL for eligibility checking |
| `rules.generateMessageUrl` | `string?` | Optional URL for message generation |
| `rules.blockchain` | `string` | Target blockchain |
| `rules.contract` | `string?` | Optional contract address |
| `rules.supportDelegate` | `boolean` | Whether delegation is supported |
| `rules.startAt` | `Date` | Start time of the airdrop |
| `rules.expiresAt` | `Date` | Expiration time of the airdrop |
| `rules.estimateCost` | `number?` | Optional estimated gas cost |
| `rules.createdAt` | `Date` | Timestamp of rules creation |
| `rules.updatedAt` | `Date` | Timestamp of rules update |

### Enums

#### Target Type
```typescript
enum Target {
  nftHolder = 'nftHolder', 
  nftAIAgent = 'nftAIAgent' 
}
```

#### Claim Method
```typescript
enum ClaimMethod {
  http = 'http',
  contract = 'contract'
}
```

## 🔐 URL Signature Requirements

When registering your project on airdrop-proxy, all endpoint URLs must implement signature verification. This ensures secure communication between the agent and your service.

### Signature Verification Implementation

Your endpoint should implement this verification logic:

```typescript
import { PublicKey } from '@solana/web3.js';
import * as bs58 from 'bs58';
import * as nacl from 'tweetnacl';

async function verifySignature(
    walletAddress: string,
    message: string,
    signature: string,
): Promise<boolean> {
    try {
        const publicKey = new PublicKey(walletAddress);
        const encodedMessage = new TextEncoder().encode(message);
        const decodedSignature = bs58.decode(signature);

        return nacl.sign.detached.verify(
            encodedMessage,
            decodedSignature,
            publicKey.toBytes(),
        );
    } catch (error) {
        console.error('Signature verification error:', error);
        return false;
    }
}
```
## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Website**: [xnomad.ai](https://xnomad.ai)
- **Twitter**: [@xNomadAI](https://x.com/xNomadAI)

For technical support:
- Open an issue in this repository
- Join our [Discord community](https://discord.gg/xnomad)
