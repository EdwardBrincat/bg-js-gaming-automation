const config = require('../../config/config');
const baseUrl = config.apiBaseUrl + '/store/';
const max_retries = 3;
const attempt = 1; 

class StoreService {
    static async getInventory() {
      try {
        const response = await fetch(`${baseUrl}inventory`, {
          method: 'GET',
          headers: this._getHeaders(),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
    
        return this._handleResponse(response);
      } catch (error) {
        console.warn(`getInventory attempt ${attempt} failed: ${error.message}`);
    
        if (attempt < max_retries) {
          const delay = 1000 * Math.pow(2, attempt - 1);
          console.log(`Retrying getInventory in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          return this.getInventory(max_retries, attempt + 1);
        }
    
        throw new Error(`getInventory failed after ${max_retries} attempts: ${error.message}`);
      }
    }

    static async Order(data) {
      try {
        const response = await fetch(`${baseUrl}order`, {
          method: 'POST',
          headers: this._getHeaders(),
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
    
        return this._handleResponse(response);
      } catch (error) {
        console.warn(`Order attempt ${attempt} failed: ${error.message}`);
    
        if (attempt < max_retries) {
          const delay = 1000 * Math.pow(2, attempt - 1);
          console.log(`Retrying Order in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          return this.Order(data, max_retries, attempt + 1);
        }
    
        throw new Error(`Order failed after ${max_retries} attempts: ${error.message}`);
      }
    }

    static async getOrder(orderId) {
      try {
        const response = await fetch(`${baseUrl}order/${orderId}`, {
          method: 'GET',
          headers: this._getHeaders(),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
    
        return this._handleResponse(response);
      } catch (error) {
        console.warn(`getOrder attempt ${attempt} failed: ${error.message}`);
    
        if (attempt < max_retries) {
          const delay = 1000 * Math.pow(2, attempt - 1);
          console.log(`Retrying getOrder in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          return this.getOrder(orderId, max_retries, attempt + 1);
        }
    
        throw new Error(`getOrder failed after ${max_retries} attempts: ${error.message}`);
      }
    }

    static async getOrderNegativeResponse(orderId) {
      try {
        const response = await fetch(`${baseUrl}order/${orderId}`, {
          method: 'GET',
          headers: this._getHeaders(),
        });
    
        if (response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
    
        return this._handleResponse(response);
      } catch (error) {
        console.warn(`getOrder attempt ${attempt} failed: ${error.message}`);
    
        if (attempt < max_retries) {
          const delay = 1000 * Math.pow(2, attempt - 1);
          console.log(`Retrying getOrder in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          return this.getOrder(orderId, max_retries, attempt + 1);
        }
    
        throw new Error(`getOrder failed after ${max_retries} attempts: ${error.message}`);
      }
    }

    static async deleteOrder(orderId) {
      try {
        const response = await fetch(`${baseUrl}order/${orderId}`, {
          method: 'DELETE',
          headers: this._getHeaders(),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
    
        return this._handleResponse(response);
      } catch (error) {
        console.warn(`deleteOrder attempt ${attempt} failed: ${error.message}`);
    
        if (attempt < max_retries) {
          const delay = 1000 * Math.pow(2, attempt - 1);
          console.log(`Retrying deleteOrder in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          return this.deleteOrder(orderId, max_retries, attempt + 1);
        }
    
        throw new Error(`deleteOrder failed after ${max_retries} attempts: ${error.message}`);
      }
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