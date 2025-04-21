
const config = require('../../config/config');
const baseUrl = config.apiBaseUrl + '/pet/';
const apiKey = "special-key";

class PetService {
    static async getById(petId) {
      const response = await fetch(`${baseUrl}${petId}`, {
        method: 'GET',
        headers: this._getHeaders(),
      });
      return this._handleResponse(response);
    }

    static async getByStatus(statuses) {
        const query = 'findByStatus?' + statuses.map(s => `status=${encodeURIComponent(s)}`).join('&');
        const response = await fetch(`${baseUrl}${query}`, {
          method: 'GET',
          headers: this._getHeaders("application/json", ""),
        });
        return this._handleResponse(response);
    }
  
    static async addNewPet(data) {
      const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: this._getHeaders("application/json", ""),
        body: JSON.stringify(data),
      });
      return this._handleResponse(response);
    }
  
    static async updatePet(data) {
      const response = await fetch(`${baseUrl}`, {
        method: 'PUT',
        headers: this._getHeaders("application/json", ""),
        body: JSON.stringify(data),
      });
      return this._handleResponse(response);
    }

    static async updatePetWithForm(petId, formDataObject = {}) {
        const formBody = new URLSearchParams(formDataObject).toString();
      
        const response = await fetch(`${baseUrl}${petId}`, {
          method: 'POST',
          headers: this._getHeaders("application/x-www-form-urlencoded",""),
          body: formBody
        });
      
        return this._handleResponse(response);
      }
  
    static async deletePet(petId) {
      const response = await fetch(`${baseUrl}${petId}`, {
        method: 'DELETE',
        headers: this._getHeaders("", apiKey),
      });
      return this._handleResponse(response);
    } 
    
    static async uploadImage(petId, file, additionalMetadata = '') {
        const formData = new FormData();
        formData.append('additionalMetadata', additionalMetadata);
        formData.append('file', file); 
      
        const response = await fetch(`${baseUrl}/${petId}/uploadImage`, {
          method: 'POST',
          headers: this._getHeaders("application/json", ""),
          body: formData,
        });
      
        return this._handleResponse(response);
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