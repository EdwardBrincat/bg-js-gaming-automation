
const config = require('../../config/config');
const baseUrl = config.apiBaseUrl + '/pet/';
const apiKey = "special-key";
const max_retries = 3;
const attempt = 1; 

class PetService {
    static async getById(petId) {
      try {
        const response = await fetch(`${baseUrl}${petId}`, {
          method: 'GET',
          headers: this._getHeaders(),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
    
        return this._handleResponse(response);
      } catch (error) {
        console.warn(`getById attempt ${attempt} failed: ${error.message}`);
    
        if (attempt < max_retries) {
          const delay = 1000 * Math.pow(2, attempt - 1); 
          console.log(`Retrying getById in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          return this.getById(petId, max_retries, attempt + 1);
        }
    
        throw new Error(`getById failed after ${max_retries} attempts: ${error.message}`);
      }
    }

    static async getByIdNegativeResponse(petId) {
      try {
        const response = await fetch(`${baseUrl}${petId}`, {
          method: 'GET',
          headers: this._getHeaders(),
        });
    
        if (response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
    
        return this._handleResponse(response);
      } catch (error) {
        console.warn(`getById attempt ${attempt} failed: ${error.message}`);
    
        if (attempt < max_retries) {
          const delay = 1000 * Math.pow(2, attempt - 1); 
          console.log(`Retrying getById in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          return this.getById(petId, max_retries, attempt + 1);
        }
    
        throw new Error(`getById failed after ${max_retries} attempts: ${error.message}`);
      }
    }

    static async getByStatus(statuses) {
        const query = 'findByStatus?' + statuses.map(s => `status=${encodeURIComponent(s)}`).join('&');
        try {
          const response = await fetch(`${baseUrl}${query}`, {
            method: 'GET',
            headers: this._getHeaders("application/json", ""),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
      
          return this._handleResponse(response);
        } catch (error) {
          console.warn(`getByStatus attempt ${attempt} failed: ${error.message}`);
      
          if (attempt < max_retries) {
            const delay = 1000 * Math.pow(2, attempt - 1); // exponential backoff
            console.log(`Retrying getByStatus in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay));
            return this.getByStatus(statuses, max_retries, attempt + 1);
          }
      
          throw new Error(`getByStatus failed after ${max_retries} attempts: ${error.message}`);
        }
    }
  
    static async addNewPet(data) {
      try {
        const response = await fetch(`${baseUrl}`, {
          method: 'POST',
          headers: this._getHeaders("application/json", ""),
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
    
        return this._handleResponse(response);
      } catch (error) {
        console.warn(`addNewPet attempt ${attempt} failed: ${error.message}`);
    
        if (attempt < max_retries) {
          const delay = 1000 * Math.pow(2, attempt - 1);
          console.log(`Retrying addNewPet in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          return this.addNewPet(data, max_retries, attempt + 1);
        }
    
        throw new Error(`addNewPet failed after ${max_retries} attempts: ${error.message}`);
      }
    }
  
    static async updatePet(data) {
      try {
        const response = await fetch(`${baseUrl}`, {
          method: 'PUT',
          headers: this._getHeaders("application/json", ""),
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
    
        return this._handleResponse(response);
      } catch (error) {
        console.warn(`updatePet attempt ${attempt} failed: ${error.message}`);
    
        if (attempt < max_retries) {
          const delay = 1000 * Math.pow(2, attempt - 1); 
          console.log(`Retrying updatePet in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          return this.updatePet(data, max_retries, attempt + 1);
        }
    
        throw new Error(`updatePet failed after ${max_retries} attempts: ${error.message}`);
      }
    }

    static async updatePetWithForm(petId, formDataObject = {}) {
        const formBody = new URLSearchParams(formDataObject).toString();
      
        try {
          const response = await fetch(`${baseUrl}${petId}`, {
            method: 'POST',
            headers: this._getHeaders("application/x-www-form-urlencoded", ""),
            body: formBody,
          });
      
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
      
          return this._handleResponse(response);
        } catch (error) {
          console.warn(`updatePetWithForm attempt ${attempt} failed: ${error.message}`);
      
          if (attempt < max_retries) {
            const delay = 1000 * Math.pow(2, attempt - 1); // exponential backoff
            console.log(`Retrying updatePetWithForm in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay));
            return this.updatePetWithForm(petId, formDataObject, max_retries, attempt + 1);
          }
      
          throw new Error(`updatePetWithForm failed after ${max_retries} attempts: ${error.message}`);
        }
      }
  
    static async deletePet(petId) {
      try {
        const response = await fetch(`${baseUrl}${petId}`, {
          method: 'DELETE',
          headers: this._getHeaders("", apiKey),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
    
        return this._handleResponse(response);
      } catch (error) {
        console.warn(`deletePet attempt ${attempt} failed: ${error.message}`);
    
        if (attempt < max_retries) {
          const delay = 1000 * Math.pow(2, attempt - 1); 
          console.log(`Retrying deletePet in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          return this.deletePet(petId, max_retries, attempt + 1);
        }
    
        throw new Error(`deletePet failed after ${max_retries} attempts: ${error.message}`);
      }
    } 
    
    static async uploadImage(petId, file, additionalMetadata = '') {
        const formData = new FormData();
        formData.append('additionalMetadata', additionalMetadata);
        formData.append('file', file); 
      
        try {
          const response = await fetch(`${baseUrl}/${petId}/uploadImage`, {
            method: 'POST',
            // Don't set Content-Type for FormData — browser will set the correct boundary
            headers: this._getHeaders(null, ""), 
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
      
          return this._handleResponse(response);
        } catch (error) {
          console.warn(`uploadImage attempt ${attempt} failed: ${error.message}`);
      
          if (attempt < max_retries) {
            const delay = 1000 * Math.pow(2, attempt - 1); // exponential backoff
            console.log(`Retrying uploadImage in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay));
            return this.uploadImage(petId, file, additionalMetadata, max_retries, attempt + 1);
          }
      
          throw new Error(`uploadImage failed after ${max_retries} attempts: ${error.message}`);
        }
      }
    
    static _getHeaders(contentType = "", apiKey = "") {
        return {
          'accept': 'application/json',
          ...(contentType && { 'Content-Type': contentType }),
          ...(apiKey && { 'api_key': apiKey }) 
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
  
  export default PetService;