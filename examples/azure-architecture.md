# Azure

TODO: Logging and Monitoring via Azure Monitor and Application Insights to monitor the health and performance of your Azure Functions and other services.Set up logging and alerting to proactively manage your solution.
TODO: Use Azure Active Directory (Azure AD) for user authentication and authorization.
TODO: Securely manage API keys and secrets using Azure Key Vault.
TODO: Store the extracted data in low-cost Azure storage. You can use Azure Blob Storage, Azure Table Storage, or Azure Data Lake Storage, depending on your specific needs and data structure. Create separate containers or tables for each user to organize the data efficiently.
TODO: Configure custom domains
TODO: Use SSL certificates and SSL connections

TODO: auto increment package an project version

TODO: Other -->
- Use Azure Logic Apps to orchestrate workflows and Azure Functions to build RESTful APIs.
- Azure Front Door for global load balancing and Azure CDN for content delivery to enhance the performance and availability of your React.js application.
- Azure Batch can be used to manage and scale batch workloads in the cloud.
- Azure Static Web Apps excels at serving CSS, JavaScript, images, and other static assets in your project.Node.js modules required for client-side functionality can be bundled using build tools like Webpack or Parcel. Define serverless APIs using Azure Functions.

## Azure Portal and Account Structure

- Subscriptions
- Resource Groups to groups resources:
  - based on environment & access e.g. dev, prod
  - based o npurpose/type e.g. apps, storage etc.
  - use Azure Resource Manager templates or IAC to automate resource deployment across different environments.
  - centralize key vaults and monitoring and logging across resource groups in an environment
  - can delete the entire resource groups

- Service Plans
- Tags
  - Consider tagging resources within a Resource Group with metadata like "environment" or "owner" to facilitate cost allocation and management
  - 


## Azure deploy from local Git

```git

git remote add azure https://tastytrade-api-front-end@tastytrade-api-front-end.scm.azurewebsites.net:443/tastytrade-api-front-end.git


git config --global credential.helper store

git credential approve <<<"url=https://tastytrade-api-front-end:PWD@tastytrade-api-front-end.scm.azurewebsites.net:443/tastytrade-api-front-end.git"

git pull azure master

git push azure your-non-master-branch:master

git push azure master --force

```

## Azure Functions instructions

### Functions vs App Service

**App Service**:

- Dedicated web server instances for your application, which can offer consistent and predictable performance
- Suitable for server side rendering due to dedicate resources that can cache SSR across users
- Scales well with growing number of users
- Use Azure functions for retrieving data, user authentication, authorization and interacting with 3rd party APIs
- Minimal CPU consumption in an idle state: OS ovehead
- Cas SSH into the App Service instance

**Functions**:

- Initial request latency may vary as the function app may need to "warm up" when it scales dynamically.
- Suitable for low to moderate traffic as you only pay for what you use
- Suitable for burstly or unpredictable workloads.
- Suitable for short lived and event driven tasks
- Suitable for retrieving data, user authentication, authorization and interacting with 3rd party APIs
- Azure Cache for Redis or Azure CDN can reduce load on the serverless infrastructure
- 


```bash

cd your-project-folder

```

### 1. Initialize a Node.js project

```bash

npm init

```

### 2. Install Azure Functions Core Tools globally

```bash

npm install -g azure-functions-core-tools@3 --unsafe-perm true

```

### 3. Create an Azure Functions project

```bash

func init MyFunctionApp

```

### 4. Code Your Azure Cloud Function

Test your function locally using Azure Functions Core Tools:

```bash

func start

```

Push your code to your GitHub repository

### 5 Deploy to Azure Cloud (Staging/Production)

- Create an Azure Function App in the Azure portal.
- Configure the Azure Function App settings for staging. You can do this through the Azure portal or by using Azure CLI.
- Set up environment variables for your staging environment.
- Deploy your Azure Function to the staging environment using Azure Functions Core Tools:

```bash

func azure functionapp publish my-function-app-staging --build remote

```

### 6 Secrets and Configurations

In your code, load configuration values from environment variables and manage secrets separately in your chosen environment (staging/production).

## Github Code Spaces