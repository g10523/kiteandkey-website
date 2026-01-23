# Resources System Documentation

## Overview

The Resources system allows administrators to upload and manage educational materials (PDFs, guides, worksheets, etc.) that students and parents can access and download.

## Features

### Public Resources Page (`/resources`)
- **Search & Filter**: Search by title, description, or tags. Filter by category and year level.
- **Featured Resources**: Pinned resources appear at the top in a dedicated section.
- **Download Tracking**: Automatically tracks download counts for analytics.
- **Responsive Design**: Beautiful glassmorphic design consistent with the site aesthetic.

### Admin Management (`/admin/resources`)
- **Upload Resources**: Upload files with metadata (title, description, category, type, year level, tags).
- **Visibility Control**: Toggle resources between public and private.
- **Pin/Unpin**: Feature important resources at the top of the public page.
- **Delete Resources**: Remove outdated or incorrect resources.
- **Statistics Dashboard**: View total resources, public count, pinned count, and total downloads.

## Database Schema

The `Resource` model includes:
- **Basic Info**: title, description, type, category
- **File Details**: fileName, fileUrl, fileSize, mimeType
- **Organization**: yearLevel (optional), tags (array)
- **Visibility**: isPublic, isPinned
- **Metadata**: uploadedBy, downloadCount, timestamps

### Resource Types
- PDF
- GUIDE
- WORKSHEET
- TEMPLATE
- OTHER

### Resource Categories
- ENGLISH
- MATHS
- SCIENCE
- SELECTIVE
- STUDY_SKILLS
- PARENT_RESOURCES
- GENERAL

## API Endpoints

### Public Endpoints
- `GET /api/resources` - Fetch all public resources
- `POST /api/resources/[id]/download` - Track a download (increments counter)

### Admin Endpoints
- `POST /api/resources` - Create a new resource
- `GET /api/resources/[id]` - Get a specific resource
- `PATCH /api/resources/[id]` - Update a resource
- `DELETE /api/resources/[id]` - Delete a resource

## Usage Guide

### For Administrators

#### Uploading a Resource

1. Navigate to `/admin/resources`
2. Click "Upload Resource" button
3. Fill in the form:
   - **File**: Select the file to upload (required)
   - **Title**: Give it a descriptive title (required)
   - **Description**: Add a brief description (optional but recommended)
   - **Type**: Select the resource type (required)
   - **Category**: Choose the subject category (required)
   - **Year Level**: Specify if it's for a particular year (optional)
   - **Tags**: Add comma-separated tags for better searchability
   - **Make Public**: Check to make it visible to users
   - **Pin**: Check to feature it at the top

4. Click "Upload Resource"

#### Managing Resources

- **Pin/Unpin**: Click the pin icon to feature/unfeature a resource
- **Toggle Visibility**: Click the eye icon to make public/private
- **Download**: Click the download icon to get a copy
- **Delete**: Click the trash icon to remove (requires confirmation)

### For Users

1. Visit `/resources` to browse available materials
2. Use the search bar to find specific resources
3. Filter by category (English, Maths, Science, etc.)
4. Filter by year level (Year 5-10)
5. Click "Download" on any resource to get it

## File Storage

**Important**: The current implementation uses a mock file URL system. For production, you should:

1. **Integrate a file storage service** (e.g., AWS S3, Google Cloud Storage, Vercel Blob)
2. **Update the upload modal** in `/app/admin/resources/page.tsx` to handle actual file uploads
3. **Store the real file URL** in the database

### Recommended Implementation

```typescript
// Example with Vercel Blob
import { put } from '@vercel/blob';

const handleFileUpload = async (file: File) => {
  const blob = await put(file.name, file, {
    access: 'public',
  });
  return blob.url; // Use this as fileUrl
};
```

## Database Migration

After adding the Resource model to the schema, run:

```bash
npx prisma generate
npx prisma db push
```

## Navigation

The Resources page is accessible from:
- **Desktop**: Navbar → "The KEY Method" dropdown → "Resources"
- **Mobile**: Menu → "The KEY Method" → "Resources"
- **Direct URL**: `/resources`

## Future Enhancements

Potential improvements:
- [ ] Actual file upload integration with cloud storage
- [ ] Bulk upload functionality
- [ ] Resource versioning
- [ ] User favorites/bookmarks
- [ ] Preview functionality for PDFs
- [ ] Resource categories with icons
- [ ] Advanced analytics (views, downloads over time)
- [ ] Resource recommendations based on student profile
- [ ] Comments/ratings system
