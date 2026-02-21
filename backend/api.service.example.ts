// API Service for ITNEXT Frontend
// Place this in: src/services/api.service.ts

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class APIService {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage
    this.token = localStorage.getItem('authToken');
  }

  // Set auth token
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  // Clear auth token
  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // Get headers
  private getHeaders(isFormData = false): HeadersInit {
    const headers: HeadersInit = {};
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic fetch wrapper
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(options.body instanceof FormData),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ========== AUTH METHODS ==========
  
  async login(email: string, password: string) {
    const response = await this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.setToken(response.token);
    return response;
  }

  async logout() {
    this.clearToken();
  }

  async getCurrentUser() {
    return this.request<{ user: any }>('/auth/me');
  }

  async updatePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // ========== CONTENT METHODS ==========
  
  async getContent() {
    return this.request<{ content: any }>('/content');
  }

  async updateContent(updates: any) {
    return this.request('/content', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async updateSection(section: string, data: any) {
    return this.request(`/content/${section}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ========== INSIGHTS METHODS ==========
  
  async getInsights(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }) {
    const queryParams = new URLSearchParams(params as any).toString();
    const endpoint = `/insights${queryParams ? `?${queryParams}` : ''}`;
    return this.request<{ insights: any[]; total: number }>(endpoint);
  }

  async getInsightBySlug(slug: string) {
    return this.request<{ insight: any }>(`/insights/${slug}`);
  }

  async createInsight(data: any) {
    return this.request('/insights', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInsight(id: string, data: any) {
    return this.request(`/insights/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteInsight(id: string) {
    return this.request(`/insights/${id}`, {
      method: 'DELETE',
    });
  }

  async likeInsight(id: string) {
    return this.request(`/insights/${id}/like`, {
      method: 'POST',
    });
  }

  // ========== UPLOAD METHODS ==========
  
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.request<{ url: string; publicId: string }>('/upload/image', {
      method: 'POST',
      body: formData,
    });
  }

  async uploadImages(files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    return this.request<{ files: Array<{ url: string; publicId: string }> }>(
      '/upload/images',
      {
        method: 'POST',
        body: formData,
      }
    );
  }

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<{ url: string; publicId: string }>('/upload/file', {
      method: 'POST',
      body: formData,
    });
  }

  async deleteFile(publicId: string, resourceType: 'image' | 'raw' = 'image') {
    return this.request(`/upload/${publicId}?resourceType=${resourceType}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiService = new APIService();

// ========== USAGE EXAMPLES ==========

/*
// 1. Login
try {
  const { user, token } = await apiService.login('admin@itnext.uk', 'password');
  console.log('Logged in:', user);
} catch (error) {
  console.error('Login failed:', error);
}

// 2. Get Content
const { content } = await apiService.getContent();
console.log(content);

// 3. Update Content
await apiService.updateContent({
  hero: {
    title: 'New Title',
    subtitle: 'New Subtitle'
  }
});

// 4. Upload Image
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];
const { url } = await apiService.uploadImage(file);
console.log('Image uploaded:', url);

// 5. Create Blog Post
await apiService.createInsight({
  title: 'My New Post',
  category: 'AI Automation',
  excerpt: 'This is a post excerpt',
  featureImage: 'https://cloudinary.com/image.jpg',
  body: [
    { type: 'heading', content: 'Introduction' },
    { type: 'text', content: 'Post content here...' }
  ]
});

// 6. Get All Insights
const { insights } = await apiService.getInsights({ 
  page: 1, 
  limit: 10,
  category: 'AI Automation' 
});

// 7. Logout
apiService.logout();
*/
