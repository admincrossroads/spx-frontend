# Image Upload Endpoint Documentation

## Overview
The upload system uses a UUID-based approach where the frontend generates a UUID that will be used for both the insight and its associated images. This allows easy matching between insights and their images.

## File Naming Convention
Files are named using the following format:
```
{UUID}-{type}-{timestamp}.{extension}
```

**Example:**
- UUID: `550e8400-e29b-41d4-a716-446655440000`
- Type: `blog`
- Timestamp: `1735212345678`
- Extension: `.png`
- **Result:** `550e8400-e29b-41d4-a716-446655440000-blog-1735212345678.png`

## Storage Structure
Files are stored in Digital Ocean Spaces with the following structure:
```
SPX-Insights/
  ├── blogs/
  │   └── {uuid}/
  │       └── {uuid}-{type}-{timestamp}.{ext}
  ├── policy/
  │   └── {uuid}/
  │       └── {uuid}-{type}-{timestamp}.{ext}
  ├── publications/
  │   └── {uuid}/
  │       └── {uuid}-{type}-{timestamp}.{ext}
  └── reports/
      └── {uuid}/
          └── {uuid}-{type}-{timestamp}.{ext}
```

---

## Upload Image Endpoint

### Endpoint
```
POST /api/v1/admin/uploads/insights
```

### Authentication
- **API Key:** Required in `x-api-key` header
- **JWT Token:** Required in `Authorization` header as `Bearer {token}`
- **User Role:** Must be `ADMIN` or `EDITOR`

### Query Parameters
| Parameter | Type | Required | Description | Valid Values |
|-----------|------|-----------|-------------|--------------|
| `uuid` | string | Yes | UUID that will be used for the insight | Valid UUID format |
| `type` | string | Yes | Type of insight | `blog`, `report`, `publication`, `policy-brief` |

### Request Body
- **Content-Type:** `multipart/form-data`
- **Field Name:** `file`
- **File Types Allowed:** 
  - `image/jpeg`
  - `image/png`
  - `image/webp`
  - `image/gif`
  - `application/pdf`
- **Max File Size:** 10MB (configurable via `MAX_FILE_SIZE` env var)

### Request Example

#### Using Fetch API
```javascript
const uuid = '550e8400-e29b-41d4-a716-446655440000'; // Generate this on frontend
const type = 'blog'; // or 'report', 'publication', 'policy-brief'
const file = document.getElementById('fileInput').files[0];

const formData = new FormData();
formData.append('file', file);

const response = await fetch(
  `http://localhost:5000/api/v1/admin/uploads/insights?uuid=${uuid}&type=${type}`,
  {
    method: 'POST',
    headers: {
      'x-api-key': 'your-api-key',
      'Authorization': `Bearer ${yourJwtToken}`,
      // Don't set Content-Type header - browser will set it with boundary
    },
    body: formData,
  }
);

const result = await response.json();
console.log(result);
```

#### Using Axios
```javascript
import axios from 'axios';

const uuid = '550e8400-e29b-41d4-a716-446655440000';
const type = 'blog';
const file = document.getElementById('fileInput').files[0];

const formData = new FormData();
formData.append('file', file);

const response = await axios.post(
  `http://localhost:5000/api/v1/admin/uploads/insights?uuid=${uuid}&type=${type}`,
  formData,
  {
    headers: {
      'x-api-key': 'your-api-key',
      'Authorization': `Bearer ${yourJwtToken}`,
      'Content-Type': 'multipart/form-data',
    },
  }
);

console.log(response.data);
```

#### Using cURL
```bash
curl -X POST \
  "http://localhost:5000/api/v1/admin/uploads/insights?uuid=550e8400-e29b-41d4-a716-446655440000&type=blog" \
  -H "x-api-key: your-api-key" \
  -H "Authorization: Bearer your-jwt-token" \
  -F "file=@/path/to/image.png"
```

### Success Response (201 Created)
```json
{
  "url": "https://awakilofiles.nyc3.digitaloceanspaces.com/SPX-Insights/blogs/550e8400-e29b-41d4-a716-446655440000/550e8400-e29b-41d4-a716-446655440000-blog-1735212345678.png",
  "filename": "550e8400-e29b-41d4-a716-446655440000-blog-1735212345678.png",
  "originalName": "my-image.png",
  "size": 123456,
  "mimetype": "image/png",
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "type": "blog",
  "timestamp": 1735212345678
}
```

### Error Responses

#### 400 Bad Request - Missing UUID
```json
{
  "error": "Missing UUID",
  "message": "UUID query parameter is required"
}
```

#### 400 Bad Request - Missing Type
```json
{
  "error": "Missing type",
  "message": "Type query parameter is required (blog, report, publication, or policy-brief)"
}
```

#### 400 Bad Request - Invalid Type
```json
{
  "error": "Invalid type",
  "message": "Type must be one of: report, publication, policy-brief, blog"
}
```

#### 400 Bad Request - No File
```json
{
  "error": "No file uploaded",
  "message": "Please provide a file to upload"
}
```

#### 400 Bad Request - Invalid File Type
```json
{
  "error": "File type not allowed",
  "message": "File type image/svg+xml not allowed"
}
```

#### 401 Unauthorized - Missing/Invalid Token
```json
{
  "error": "Authentication required",
  "message": "No authentication token provided"
}
```

#### 403 Forbidden - Insufficient Permissions
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Upload failed",
  "message": "Failed to upload file to Digital Ocean Spaces: {error details}"
}
```

---

## Delete Image Endpoint

### Endpoint
```
DELETE /api/v1/admin/uploads/insights/:uuid/:filename
```

### Authentication
- **API Key:** Required in `x-api-key` header
- **JWT Token:** Required in `Authorization` header as `Bearer {token}`
- **User Role:** Must be `ADMIN` or `EDITOR`

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|-----------|-------------|
| `uuid` | string | Yes | UUID of the insight |
| `filename` | string | Yes | Full filename (including extension) |

### Query Parameters
| Parameter | Type | Required | Description | Valid Values |
|-----------|------|-----------|-------------|--------------|
| `type` | string | Yes | Type of insight | `blog`, `report`, `publication`, `policy-brief` |

### Request Example

#### Using Fetch API
```javascript
const uuid = '550e8400-e29b-41d4-a716-446655440000';
const filename = '550e8400-e29b-41d4-a716-446655440000-blog-1735212345678.png';
const type = 'blog';

const response = await fetch(
  `http://localhost:5000/api/v1/admin/uploads/insights/${uuid}/${filename}?type=${type}`,
  {
    method: 'DELETE',
    headers: {
      'x-api-key': 'your-api-key',
      'Authorization': `Bearer ${yourJwtToken}`,
    },
  }
);

const result = await response.json();
console.log(result);
```

#### Using Axios
```javascript
import axios from 'axios';

const uuid = '550e8400-e29b-41d4-a716-446655440000';
const filename = '550e8400-e29b-41d4-a716-446655440000-blog-1735212345678.png';
const type = 'blog';

const response = await axios.delete(
  `http://localhost:5000/api/v1/admin/uploads/insights/${uuid}/${filename}`,
  {
    params: { type },
    headers: {
      'x-api-key': 'your-api-key',
      'Authorization': `Bearer ${yourJwtToken}`,
    },
  }
);

console.log(response.data);
```

### Success Response (200 OK)
```json
{
  "message": "File deleted successfully"
}
```

### Error Responses

#### 400 Bad Request - Missing Parameters
```json
{
  "error": "Missing parameters",
  "message": "UUID and filename are required"
}
```

#### 400 Bad Request - Missing Type
```json
{
  "error": "Missing type",
  "message": "Type query parameter is required"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Delete failed",
  "message": "Failed to delete file from Digital Ocean Spaces: {error details}"
}
```

---

## Frontend Implementation Flow

### Step 1: Generate UUID
```javascript
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4(); // e.g., "550e8400-e29b-41d4-a716-446655440000"
```

### Step 2: Upload Images (Before Creating Insight)
```javascript
async function uploadImage(file, uuid, type) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `${API_BASE_URL}/admin/uploads/insights?uuid=${uuid}&type=${type}`,
    {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return await response.json();
}

// Usage
const uuid = uuidv4();
const type = 'blog';

// Upload multiple images
const imageUrls = [];
for (const file of imageFiles) {
  const result = await uploadImage(file, uuid, type);
  imageUrls.push(result.url);
}
```

### Step 3: Create Insight with Same UUID
```javascript
async function createInsight(uuid, imageUrls) {
  const response = await fetch(`${API_BASE_URL}/admin/insights`, {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      publicId: uuid, // Use the same UUID
      title: 'My Insight',
      slug: 'my-insight',
      type: 'blog',
      summary: 'Summary text',
      content: [
        {
          id: '1',
          type: 'image',
          data: {
            url: imageUrls[0], // Use uploaded image URL
          },
        },
      ],
      authorId: 1,
    }),
  });

  return await response.json();
}
```

### Step 4: Retrieve Images by UUID
Since images are stored with the UUID in the filename, you can:
1. Use the URLs returned from the upload endpoint
2. Query Digital Ocean Spaces by UUID prefix
3. Match images to insights by UUID in the filename

---

## Notes

1. **UUID Generation:** The frontend must generate a UUID before uploading images. This UUID will be used for both the insight and its images.

2. **Type Consistency:** The `type` parameter must match the insight type when creating the insight.

3. **File Naming:** The backend automatically generates filenames using the format `{uuid}-{type}-{timestamp}.{ext}`. You don't need to provide a filename.

4. **URL Format:** The returned URL is a full URL pointing to Digital Ocean Spaces, not a relative path.

5. **Rate Limiting:** Upload endpoints are rate-limited to 50 uploads per 15 minutes per IP address.

6. **File Size:** Maximum file size is 10MB by default (configurable via environment variable).

7. **Allowed Types:** Only image files (JPEG, PNG, WebP, GIF) and PDFs are allowed.

---

## Example: Complete Flow

```javascript
// 1. Generate UUID
const uuid = uuidv4();
const type = 'blog';

// 2. Upload images
const image1 = await uploadImage(file1, uuid, type);
const image2 = await uploadImage(file2, uuid, type);

// 3. Create insight with the same UUID
const insight = await createInsight({
  publicId: uuid,
  type: type,
  title: 'My Blog Post',
  content: [
    { type: 'image', data: { url: image1.url } },
    { type: 'text', data: { html: '<p>Content here</p>' } },
    { type: 'image', data: { url: image2.url } },
  ],
  // ... other fields
});

// 4. Images and insight are now linked by UUID
// You can find all images for an insight by searching for files with the UUID prefix
```

