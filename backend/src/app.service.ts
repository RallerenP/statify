import { HttpService } from '@nestjs/axios';
import { SubscriptionClient } from '@azure/arm-subscriptions';
import { ClientSecretCredential } from '@azure/identity';
import { Injectable } from '@nestjs/common';
import azure_creds from '../secrets.js';
import {
  AzureServiceClient,
  loginWithServicePrincipalSecret,
} from 'ms-rest-azure';

console.log(azure_creds);

@Injectable()
export class AppService {
  private readonly credentials;
  private client: AzureServiceClient;
  private tenantId = azure_creds.tenant;
  private clientId = azure_creds.appId;
  private secret = azure_creds.password;
  private readonly subscription_id = `edecaef3-87ec-47f7-b046-ccd69d7e23bf`;

  constructor(private httpService: HttpService) {
    // this.credentials = new ClientSecretCredential(
    //   this.tenantId,
    //   this.clientId,
    //   this.secret,
    // );
    // this.client = new SubscriptionClient(this.credentials);
  }

  async login() {
    const creds = await loginWithServicePrincipalSecret(
      this.clientId,
      this.secret,
      this.tenantId,
    );

    this.client = new AzureServiceClient(creds, {});
  }

  async getListOfSubscriptions() {
    //const list = await this.client.subscriptions.list();

    //return list;
    return;
  }

  async getResources() {
    if (!this.client) {
      await this.login();
    }

    // @ts-ignore
    return this.client.sendRequest({
      method: 'GET',
      url: `https://management.azure.com/subscriptions/${this.subscription_id}/resources?api-version=2021-04-01`,
      headers: {
        'user-agent': 'TestApp/1.0',
      },
    });
  }

  async getResourceMetrics() {
    if (!this.client) await this.login();
    // GET https://management.azure.com/{resourceUri}/providers/Microsoft.Insights/metrics?api-version=2018-01-01

    // @ts-ignore
    return this.client.sendRequest({
      method: 'GET',
      url: `https://management.azure.com/subscriptions/edecaef3-87ec-47f7-b046-ccd69d7e23bf/resourceGroups/modsearchbot/providers/Microsoft.Bing/accounts/modsearchbot-custom-search/providers/Microsoft.Insights/metrics/?api-version=2021-05-01&top=3`,
      headers: {
        'user-agent': 'TestApp/1.0',
      },
    });
  }

  // POST https://management.azure.com/{scope}/providers/Microsoft.CostManagement/query?api-version=2021-10-01
  async getResourceCost() {
    if (!this.client) await this.login();

    const scope = `/subscriptions/${this.subscription_id}/resourceGroups/modsearchbot`;

    // @ts-ignore
    return this.client.sendRequest({
      method: 'POST',
      url: `https://management.azure.com/${scope}/providers/Microsoft.CostManagement/query?api-version=2021-10-01`,
      body: {
        dataset: {
          granularity: 'Daily',
        },
        type: 'Usage',
        timeframe: 'Custom',
        timePeriod: {
          from: '2021-10-03',
          to: '2021-11-03'
        }
      },
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
