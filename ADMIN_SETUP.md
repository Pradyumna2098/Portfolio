# Admin System Setup Instructions

## Environment Variables Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Admin Authentication
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
SECRET_KEY=your_very_secret_key_for_sessions

# Gemini API (if using AI features)
GEMINI_API_KEY=your_gemini_api_key
```

## Setup Steps

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Create Required Directories**
   ```bash
   mkdir -p static/papers
   mkdir -p static/images
   ```

3. **Set Environment Variables**
   - Create `.env` file with the variables above
   - Use strong passwords and secret keys
   - Keep the `.env` file secure and never commit it to version control

4. **Run the Application**
   ```bash
   python app.py
   ```

5. **Access Admin Dashboard**
   - Navigate to: `http://localhost:5000/admin/login`
   - Login with your configured credentials
   - Access the dashboard at: `http://localhost:5000/admin/dashboard`

## Security Recommendations

1. **Strong Credentials**: Use complex passwords for admin access
2. **Secret Key**: Generate a random SECRET_KEY (32+ characters)
3. **HTTPS**: Use HTTPS in production environments
4. **Environment Variables**: Never hardcode credentials in source code
5. **File Permissions**: Restrict access to upload directories
6. **Session Security**: Configure secure session cookies for production

## Admin Dashboard Features

### Content Management
- **Technical Papers**: Upload PDFs with metadata
- **Blog Posts**: Create rich content with tags and images
- **Image Gallery**: Upload and organize images
- **Content Overview**: View, edit, and delete existing content

### File Upload Support
- **Papers**: PDF files up to 16MB
- **Images**: JPEG, PNG, WebP up to 5MB each
- **Bulk Upload**: Multiple files in single operation
- **Secure Filenames**: Automatic sanitization and unique naming

### Dashboard Analytics
- Content statistics and overview
- Upload progress tracking
- Real-time notifications
- Responsive design for mobile access

## Troubleshooting

### Common Issues

1. **Login Failed**: Check username/password in `.env` file
2. **Upload Errors**: Ensure directories exist and have write permissions
3. **File Size Errors**: Check file size limits in app configuration
4. **Session Issues**: Verify SECRET_KEY is set in environment

### File Permissions
```bash
# Set proper permissions for upload directories
chmod 755 static/papers
chmod 755 static/images
```

### Database File
The system uses `blog_data.json` to store metadata. Ensure this file has write permissions.

## Production Deployment

When deploying to production:

1. Set `debug=False` in app.py
2. Use environment variables for all sensitive data
3. Configure proper web server (nginx, Apache)
4. Set up SSL/TLS certificates
5. Configure firewall rules for admin access
6. Regular backups of `blog_data.json` and upload directories

## API Endpoints

The admin system provides the following API endpoints (login required):

- `POST /admin/upload_paper` - Upload technical papers
- `POST /admin/create_blog` - Create blog posts
- `POST /admin/upload_image` - Upload images
- `GET /admin/api/blogs` - List all blog posts
- `GET /admin/api/papers` - List all papers
- `DELETE /admin/api/blogs/<id>` - Delete blog post
- `DELETE /admin/api/papers/<id>` - Delete paper

All endpoints require authentication via session cookies.