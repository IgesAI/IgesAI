import { fetchWithRetry } from '../utils/api-utils';

class APIService {
  static API_BASE_URL = 'https://api.helius.xyz/v0';
  static API_KEY = process.env.HELIUS_API_KEY;

  static async fetchWalletData(address) {
    try {
      const transactions = await this.fetchTransactions(address);
      const analytics = this.processAnalytics(transactions);
      
      return {
        address,
        transactions,
        analytics
      };
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  static async fetchTransactions(address) {
    return fetchWithRetry(
      `${this.API_BASE_URL}/addresses/${address}/transactions`,
      {
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(10000) // 10s timeout
      }
    );
  }

  static getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.API_KEY}`
    };
  }

  static getErrorMessage(error) {
    if (error.message.includes('429')) {
      return 'Rate limit exceeded. Please try again in a moment.';
    }
    if (error.message.includes('404')) {
      return 'Wallet not found. Please check the address and try again.';
    }
    if (error.message.includes('timeout')) {
      return 'Request timed out. Please try again.';
    }
    return 'An error occurred while fetching wallet data. Please try again.';
  }
}

export default APIService; 