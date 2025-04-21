const config = require('../../config/config');
const baseUrl = config.apiBaseUrl + '/store/';

class StoreService {
    static async getInventory() {
      const response = await fetch(`${baseUrl}inventory`, {
        method: 'GET',
        headers: this._getHeaders(),
      });
      return this._handleResponse(response);
    }

    static async Order(data) {
        const response = await fetch(`${baseUrl}order`, {
          method: 'POST',
          headers: this._getHeaders(),
          body: JSON.stringify(data),
        });
        return this._handleResponse(response);
    }

    static async getOrder(orderId) {
        const response = await fetch(`${baseUrl}order/${orderId}`, {
          method: 'GET',
          headers: this._getHeaders(),
        });
        return this._handleResponse(response);
    }

    static async deleteOrder(orderid) {
        const response = await fetch(`${baseUrl}order/${orderid}`, {
          method: 'DELETE',
          headers: this._getHeaders(),
        });
        return this._handleResponse(response);
      } 

    static _getHeaders() {
        return {
          'accept': 'application/json',
          'Content-Type': 'application/json' 
        };
      }
    
      static async _handleResponse(response) {
        if (!response.ok) {
          const errorText = await response.text();
          let message = errorText;
          try {
            const parsed = JSON.parse(errorText);
            message = parsed.message || errorText;
          } catch {
            // ignore parsing error, use raw text
          }
          throw new Error(`API Error: ${response.status} - ${message}`);
        }
        return response.json();
      }
}

export default StoreService;