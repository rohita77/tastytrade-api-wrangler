# Azure

TODO: Deploy to Azure App Service: Per Day 1 hr, 1GB RAM & Storage
TODO: Logging and Monitoring via Azure Monitor and Application Insights to monitor the health and performance of your Azure Functions and other services.Set up logging and alerting to proactively manage your solution.
TODO: Use Azure Active Directory (Azure AD) for user authentication and authorization.
TODO: Securely manage API keys and secrets using Azure Key Vault.
TODO: Store the extracted data in low-cost Azure storage. You can use Azure Blob Storage, Azure Table Storage, or Azure Data Lake Storage, depending on your specific needs and data structure. Create separate containers or tables for each user to organize the data efficiently.
TODO: Configure custom domain
TODO: Use SSL certificates and SSL connections

## Azure deploy from local Git

```git

git remote add azure https://tasty-trade-api-front-end@tasty-trade-api-front-end.scm.azurewebsites.net:443/tasty-trade-api-front-end.git


git config --global credential.helper store

git credential approve <<<"url=https://tasty-trade-api-front-end:PWD@tasty-trade-api-front-end.scm.azurewebsites.net:443/tasty-trade-api-front-end.git

git pull azure master

git push azure your-non-master-branch:master

git push azure master --force

```
