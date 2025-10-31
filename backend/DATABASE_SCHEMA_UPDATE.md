# Database Schema Improvements

## Changes Made

### 1. Added Timestamps
- Added `createdAt` and `updatedAt` fields to both `User` and `Post` models
- `createdAt`: Automatically set when a record is created
- `updatedAt`: Automatically updated whenever a record is modified

### 2. Added Database Indexes
For better query performance:

**User table:**
- Index on `email` (already unique, but explicit index for faster lookups)

**Post table:**
- Index on `authorId` (for faster queries by author)
- Index on `published` (for filtering published/draft posts)
- Index on `createdAt DESC` (for sorting posts by creation date)

### 3. Benefits
- **Performance**: Faster queries on indexed fields
- **Tracking**: Know when records were created and last modified
- **Sorting**: Efficient sorting by date
- **Scalability**: Better performance as data grows

## Applying the Migration

### Option 1: Using Prisma Migrate (Recommended for Production)
```bash
cd backend
npx prisma migrate deploy
```

### Option 2: Manual Application (If needed)
```bash
cd backend
# Apply the migration SQL directly to your database
# The migration file is in: prisma/migrations/20251031_add_timestamps_and_indexes/migration.sql
```

### Option 3: For Development (Creates new migration)
```bash
cd backend
npx prisma migrate dev
```

## After Migration

After applying the migration, you can update your API endpoints to return timestamps:

```typescript
// Example: Include timestamps in response
const posts = await prisma.post.findMany({
  select: {
    id: true,
    title: true,
    content: true,
    createdAt: true,
    updatedAt: true,
    author: {
      select: {
        name: true
      }
    }
  },
  orderBy: {
    createdAt: 'desc'  // Sort by newest first
  }
})
```

## Note

⚠️ The migration adds `DEFAULT CURRENT_TIMESTAMP` to existing records, so:
- All existing records will have their `createdAt` and `updatedAt` set to the time of migration
- This is normal and expected behavior
- New records will have accurate timestamps going forward
