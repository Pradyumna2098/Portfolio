# Flask Backend Deployment Guide

## 🚀 Deploy to Render (Free Tier)

### Step 1: Prepare Repository
Your code is already prepared with:
- `render.yaml` - Deployment configuration
- Updated `requirements.txt` with gunicorn
- Production-ready Flask app with environment detection

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with your GitHub account
3. Connect your GitHub repository

### Step 3: Deploy the Service
1. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect to your GitHub account
   - Select "Pradyumna2098/Portfolio" repository
   - Branch: `main`

2. **Configuration**
   - Name: `portfolio-backend` (or any name you prefer)
   - Runtime: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn --bind 0.0.0.0:$PORT app:app`
   - Instance Type: `Free`

3. **Environment Variables** (CRITICAL!)
   Add these in the "Environment" section:
   ```
   RENDER=true
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_secure_password
   SECRET_KEY=your_very_long_secret_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   **Generate a secure SECRET_KEY:**
   ```python
   import secrets
   print(secrets.token_hex(32))
   ```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Your backend will be available at: `https://your-app-name.onrender.com`

## 📝 How to Upload Blog Posts

Once deployed, here's how to use your admin system:

### Access Admin Dashboard
1. **Visit**: `https://your-app-name.onrender.com/admin/login`
2. **Login** with your configured username/password
3. **Dashboard**: `https://your-app-name.onrender.com/admin/dashboard`

### Create Blog Posts

#### Method 1: Using Admin Dashboard
1. **Login** to admin dashboard
2. **Click "Blog Posts" tab**
3. **Fill out the form:**
   - Title: Your blog post title
   - Content: Full blog content (supports HTML)
   - Excerpt: Short summary (150 chars)
   - Tags: Comma-separated tags
   - Featured Image: Upload an image (optional)

4. **Click "Create Blog Post"**
5. **Success!** Your blog is now live

#### Method 2: API Upload (for developers)
```bash
# Login first to get session
curl -X POST https://your-app-name.onrender.com/admin/login \
  -d "username=your_username&password=your_password"

# Create blog post
curl -X POST https://your-app-name.onrender.com/admin/create_blog \
  -F "title=My Blog Title" \
  -F "content=Blog content here..." \
  -F "excerpt=Short summary" \
  -F "tags=tech,ai,python" \
  -F "image=@image.jpg"
```

### Upload Technical Papers
1. **Click "Technical Papers" tab**
2. **Fill out form:**
   - Title: Paper title
   - Description: Paper summary
   - Tags: Research areas
   - PDF File: Upload your paper

3. **Click "Upload Paper"**

### Manage Images
1. **Click "Images" tab**
2. **Select multiple images**
3. **Click "Upload Images"**
4. **Images** available at: `/static/images/filename.jpg`

## 🔗 Integration with GitHub Pages

### Update Portfolio to Use Backend
Once deployed, update your portfolio to fetch blogs from the backend:

```javascript
// Add to your main.js
async function loadBlogs() {
    try {
        const response = await fetch('https://your-app-name.onrender.com/api/blogs');
        const blogs = await response.json();
        displayBlogs(blogs);
    } catch (error) {
        console.error('Failed to load blogs:', error);
    }
}
```

### CORS Configuration
Your Flask app is already configured to handle CORS for GitHub Pages integration.

## 🛠️ Troubleshooting

### Common Issues
1. **Login Failed**: Check environment variables in Render dashboard
2. **File Upload Errors**: Ensure file size < 16MB for PDFs, < 5MB for images
3. **Deploy Failed**: Check logs in Render dashboard

### Checking Logs
1. Go to Render dashboard
2. Click your service
3. Click "Logs" tab to see detailed error messages

### File Persistence
- Render free tier has temporary storage
- Files uploaded will persist during the service lifetime
- For permanent storage, consider upgrading or using cloud storage

## 🔒 Security Best Practices

### Environment Variables
- Never commit `.env` file to GitHub
- Use strong passwords (12+ characters)
- Rotate SECRET_KEY periodically
- Keep GEMINI_API_KEY secure

### Admin Access
- Use HTTPS only (Render provides this)
- Regular password changes
- Monitor admin activity logs
- Consider IP restrictions for production

## 📱 Mobile Access
The admin dashboard is fully responsive and works on:
- Desktop browsers
- Mobile phones
- Tablets
- All screen sizes

Your admin system is now production-ready with secure authentication, file management, and a professional interface!