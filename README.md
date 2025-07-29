# Hot Reload LocalStack CDK Project

A demonstration project showcasing hot-reload development workflows with AWS CDK and LocalStack. This project enables rapid development and testing of AWS Lambda functions locally with automatic rebuilding and redeployment capabilities.

## 🚀 Overview

This project demonstrates how to set up a development environment that allows for:
- **Hot reloading** of Lambda functions during development
- **Local AWS services** simulation using LocalStack
- **TypeScript compilation** with esbuild for fast builds
- **CDK deployment** to LocalStack for local testing

## 📋 Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- AWS CDK CLI
- LocalStack CLI (`cdklocal`)

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd hot-reload-localstack
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install AWS CDK Local:**
   ```bash
   npm install -g aws-cdk-local
   ```

## 🏗️ Project Structure

```
├── bin/                          # CDK app entry point
│   └── hot-reload-localstack.ts
├── lib/                          # CDK stack definitions
│   └── hot-reload-localstack-stack.ts
├── src/                          # Lambda function source code
│   └── index.ts
├── test/                         # Test files
├── volume/localstack/            # LocalStack persistent data
├── docker-compose.yml            # LocalStack container setup
├── esbuild.config.ts            # Build configuration
└── cdk.json                     # CDK configuration
```

## 🚀 Quick Start

### 1. Start LocalStack

Start the LocalStack container in the background:

```bash
npm run localstack
```

This will:
- Stop any existing LocalStack containers
- Start a new LocalStack instance
- Expose services on port 4566

### 2. Bootstrap CDK (First Time Only)

```bash
npm run bootstrap:local
```

### 3. Development Workflow

#### Option A: Hot Reload Development

1. **Start the build watcher:**
   ```bash
   npm run build:local
   ```
   This watches for TypeScript changes and rebuilds automatically.

2. **Deploy to LocalStack:**
   ```bash
   npm run deploy:local
   ```

#### Option B: One-time Build and Deploy

```bash
npm run build
npm run deploy:local
```

## 📚 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript using esbuild |
| `npm run build:local` | Start esbuild in watch mode for hot reloading |
| `npm run test` | Run Jest unit tests |
| `npm run localstack` | Start LocalStack container |
| `npm run bootstrap:local` | Bootstrap CDK for LocalStack |
| `npm run deploy:local` | Deploy stack to LocalStack |
| `npm run cdk` | Run CDK CLI commands |

## 🔧 Configuration

### LocalStack Configuration

The project uses LocalStack with the following configuration:
- **Port:** 4566 (main gateway)
- **Persistent Storage:** `./volume/localstack` directory

### CDK Configuration

Key CDK settings in `cdk.json`:
- **Watch mode** enabled for hot reloading
- **Excludes** test files and build artifacts from watching
- **Feature flags** for modern CDK behaviors

### Build Configuration

esbuild is configured for:
- **Node.js 22** target runtime
- **Fast rebuilds** with source maps in watch mode
- **Bundle optimization** for Lambda deployment

## 🏗️ Architecture

The project creates:

1. **Lambda Function** (`HotReloadFunction`)
   - Runtime: Node.js 22.x
   - Handler: `index.handler`
   - Environment: `NODE_ENV=local`
   - Code source: S3 bucket (`hot-reload`)

2. **S3 Bucket Reference** (`hot-reload`)
   - Used for Lambda code deployment

## 🔍 Development Tips

### Viewing LocalStack Logs

```bash
docker logs localstack_galactic-quiz-core -f
```

### Testing Lambda Function

Once deployed, you can invoke your Lambda function using the AWS CLI with LocalStack:

```bash
aws --endpoint-url=http://localhost:4566 lambda invoke \
  --function-name HotReloadFunction \
  --payload '{}' \
  response.json
```

### Hot Reload Workflow

1. Make changes to `src/index.ts`
2. esbuild automatically rebuilds (if watch mode is running)
3. Redeploy with `npm run deploy:local`
4. Test your changes immediately

## 🐛 Troubleshooting

### Common Issues

1. **LocalStack not starting:**
   - Check Docker is running
   - Verify port 4566 is not in use
   - Check LocalStack logs

2. **CDK deployment fails:**
   - Ensure LocalStack is running
   - Try restarting LocalStack container
   - Check AWS credentials are not interfering

3. **Build errors:**
   - Verify Node.js version (22+ recommended)
   - Clear build cache: `rm -rf .dist/`

### Clean Reset

To completely reset the environment:

```bash
# Stop and remove LocalStack
docker-compose down -v

# Clear CDK output
rm -rf cdk.out/

# Clear build output
rm -rf .dist/

# Restart everything
npm run localstack
npm run bootstrap:local
npm run deploy:local
```

## 📖 Learning Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [LocalStack Documentation](https://docs.localstack.cloud/)
- [esbuild Documentation](https://esbuild.github.io/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
