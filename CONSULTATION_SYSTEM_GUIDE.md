# Consultation Booking System - Integration Guide

## Overview

The consultation booking system is fully integrated and working. This document explains how all the components work together.

## System Flow

### 1. Admin Creates Availability Slots

**Location:** `/admin/calendar`

**Component:** `AddSlotModal.tsx`

**Action:** `createAvailabilitySlot(dateStr, timeStr, durationMinutes)`

**How it works:**
1. Admin clicks "Add Slots" button
2. Enters date, time, and duration in **Sydney timezone** (AEDT/AEST)
3. Server converts to UTC and stores in database
4. Checks for duplicate slots at the same time
5. Creates slot with:
   - `isBooked: false`
   - `isEnabled: true`
   - `maxBookings: 1`
   - `currentBookings: 0`
6. Revalidates both `/admin/calendar` and `/consultation` pages

**Timezone Handling:**
The system correctly handles Sydney timezone (AEDT/AEST) with automatic DST adjustment. Times are stored in UTC in the database but displayed in Sydney time.

---

### 2. User Visits Consultation Page

**Location:** `/consultation`

**Server Component:** `page.tsx` calls `getAvailableSlots()`

**Action:** Fetches available slots from database

**Query:**
```typescript
await prisma.availabilitySlot.findMany({
    where: {
        isBooked: false,
        isEnabled: true,
        startTime: { gte: new Date() }
    },
    orderBy: { startTime: 'asc' },
    take: 20
})
```

**Result:** Returns only future, unbooked, enabled slots

---

### 3. User Completes Consultation Form

**Component:** `ConsultationForm.tsx` (Client Component)

**Steps:**
1. User fills out 5-step form:
   - Step 1: Parent details
   - Step 2: Student information
   - Step 3: Learning profile
   - Step 4: Goals & concerns
   - Step 5: Select time slot

2. Slots are displayed grouped by date in an attractive card layout

3. User selects a slot and submits

---

### 4. Form Submission

**Action:** `submitConsultation(formData)`

**Process:**
1. Creates a `Lead` record with all form data
2. Finds the selected `AvailabilitySlot` by ID
3. Updates slot:
   ```typescript
   await prisma.availabilitySlot.update({
       where: { id: slotId },
       data: {
           isBooked: true,
           currentBookings: { increment: 1 }
       }
   })
   ```
4. Creates a `Consultation` record linked to the Lead
5. Sends confirmation email
6. Returns success response

---

### 5. Admin Views Bookings

**Location:** `/admin/calendar`

**Display:**
- **Upcoming Consultations** (left column): Shows all scheduled consultations with parent/student info
- **Available Slots** (right sidebar): Shows all future slots with status
  - Green = Open
  - Gray = Booked

**Actions available:**
- **Add Slots**: Create new availability
- **Delete Slots**: Remove unbooked slots only
- **Reschedule**: Move consultation to different slot
- **Cancel**: Cancel consultation and free up the slot

---

## Database Schema

### AvailabilitySlot
```prisma
model AvailabilitySlot {
  id              String   @id @default(cuid())
  startTime       DateTime
  endTime         DateTime
  isBooked        Boolean  @default(false)
  isEnabled       Boolean  @default(true)
  maxBookings     Int      @default(1)
  currentBookings Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### Lead
```prisma
model Lead {
  id           String        @id @default(cuid())
  parentName   String
  email        String
  phone        String
  studentName  String
  yearLevel    String
  subjects     String        // JSON array
  notes        String?
  concerns     String?
  status       String        @default("NEW")
  consultation Consultation?
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}
```

### Consultation
```prisma
model Consultation {
  id           String   @id @default(cuid())
  leadId       String   @unique
  lead         Lead     @relation(fields: [leadId], references: [id])
  scheduledAt  DateTime
  duration     Int      @default(30)
  status       String   @default("SCHEDULED")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

## Key Features

### ✅ Fully Integrated
- Admin creates slots → Automatically appear on consultation form
- User books slot → Automatically marked as booked in admin
- Real-time updates via Next.js revalidation

### ✅ Timezone Handling
- All times stored in UTC in database
- Displayed in Sydney timezone (AEDT/AEST)
- Automatic DST handling

### ✅ Data Validation
- Duplicate slot prevention
- Cannot delete booked slots
- Email validation
- Form field validation at each step

### ✅ User Experience
- Beautiful, redesigned consultation form matching website aesthetic
- Multi-step form with progress indicator
- Animated transitions
- Success/error feedback
- Mobile responsive

### ✅ Admin Experience
- Quick slot creation with timezone indicator
- Visual status indicators (open/booked)
- Bulk operations support
- Success notifications

---

## Testing the System

### Test Flow:
1. **Create slots as admin:**
   - Go to `/admin/calendar`
   - Click "Add Slots"
   - Enter date/time in Sydney timezone
   - Submit

2. **Verify slots appear:**
   - Go to `/consultation`
   - Scroll to Step 5
   - Slots should be grouped by date

3. **Book a consultation:**
   - Fill out all form steps
   - Select a slot
   - Submit form

4. **Verify booking in admin:**
   - Return to `/admin/calendar`
   - Slot should now show "BOOKED"
   - Consultation should appear in "Upcoming Consultations"

---

## Common Issues & Solutions

### Issue: Slots not appearing on consultation form
**Solution:** Check that slots are:
- `isEnabled: true`
- `isBooked: false`
- `startTime` is in the future

### Issue: Timezone problems
**Solution:** The system uses Sydney timezone. Server handles conversion automatically.

### Issue: Duplicate slots
**Solution:** System prevents duplicate slots at same exact time

### Issue: Cannot delete slot
**Solution:** Only unbooked slots can be deleted. Cancel consultation first.

---

## File Structure

```
app/
├── admin/
│   └── (dashboard)/
│       └── calendar/
│           ├── page.tsx              # Admin calendar page
│           ├── actions.ts            # Server actions (create/delete slots)
│           ├── AddSlotModal.tsx      # Modal to add slots
│           └── DeleteSlotButton.tsx  # Delete slot functionality
│
└── consultation/
    ├── page.tsx                      # Server component (fetches slots)
    ├── ConsultationForm.tsx          # Client component (form UI)
    └── actions.ts                    # Submit consultation action
```

---

## Next Steps / Future Enhancements

1. **Email Notifications:**
   - Reminder emails 24 hours before consultation
   - Confirmation emails with calendar invite

2. **Bulk Slot Creation:**
   - Create multiple slots at once
   - Recurring time patterns (e.g., every Tuesday at 2pm)

3. **Calendar Integration:**
   - Google Calendar sync
   - iCal export

4. **Waiting List:**
   - Allow users to join waiting list if no slots available
   - Auto-notify when new slots are added

5. **Analytics:**
   - Track conversion rates
   - Most popular time slots
   - Lead sources

---

## Conclusion

The consultation booking system is **fully functional and integrated**. The flow from admin slot creation → user booking → admin management is seamless and includes proper timezone handling, data validation, and a beautiful user interface that matches the overall website aesthetic.
