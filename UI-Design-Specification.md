# Online Learning Platform - Complete UI Design Specification

## Design System Foundation

### Color Palette
- **Primary**: #3B82F6 (blue) - Main brand color, primary buttons, links
- **Secondary**: #10B981 (green) - Success states, secondary actions
- **Accent**: #F59E0B (orange) - Price tags, highlights, warnings
- **Neutral**: #1F2937 (dark gray) - Headers, dark text
- **Base-100**: #FFFFFF (white) - Main background
- **Base-200**: #F8FAFC (light gray) - Section backgrounds
- **Base-300**: #E2E8F0 (gray) - Card backgrounds, input borders
- **Error**: #EF4444 (red) - Delete buttons, error states
- **Text Primary**: #1F2937 - Headings
- **Text Secondary**: #374151 - Paragraphs
- **Text Links**: #3B82F6 - Links and interactive text

### Typography Scale
- **H1**: 36px, font-weight: bold, color: #1F2937, line-height: 1.2
- **H2**: 30px, font-weight: bold, color: #1F2937, line-height: 1.3
- **H3**: 24px, font-weight: bold, color: #1F2937, line-height: 1.4
- **H4**: 20px, font-weight: bold, color: #1F2937, line-height: 1.4
- **Paragraph**: 16px, font-weight: normal, color: #374151, line-height: 1.6
- **Navbar Text**: 14-16px, font-weight: semi-bold
- **Button Text**: 14px, font-weight: medium, uppercase for primary buttons

### Border Radius Standards
- **Default**: 8px (inputs, secondary buttons, cards)
- **Primary Elements**: 12px (primary buttons, course cards, forms)
- **Small Elements**: 6px (tags, badges)
- **Circular**: 50% (avatars, icons)

### Spacing System
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

### Shadow System
- **Small**: 0 2px 4px rgba(0, 0, 0, 0.1)
- **Medium**: 0 4px 6px rgba(0, 0, 0, 0.1)
- **Large**: 0 8px 25px rgba(0, 0, 0, 0.15)
- **Focus**: 0 0 0 3px rgba(59, 130, 246, 0.1)

---

## Header/Navbar Component

### Layout & Dimensions
- **Height**: 64px
- **Position**: Sticky top, z-index: 50
- **Background**: #FFFFFF
- **Shadow**: 0 2px 4px rgba(0, 0, 0, 0.1)
- **Padding**: 0 16px (mobile), 0 24px (desktop)

### Logo Section (Left)
- **Text**: "LearnVerse"
- **Font**: Bold, 20px
- **Color**: #3B82F6 (primary)
- **Position**: Left aligned, 16px from left edge

### Navigation Links (Center)
- **Links**: Home, Courses, Dashboard, About
- **Font**: Semi-bold, 16px
- **Color**: #374151, hover: #3B82F6
- **Spacing**: 32px between links
- **Transition**: color 0.3s ease

### Dashboard Dropdown
- **Trigger**: "Dashboard" link with down arrow
- **Dropdown Items**:
  - My Enrolled Courses
  - Add Course
  - My Added Courses
- **Background**: #FFFFFF
- **Border**: 1px solid #E2E8F0
- **Border Radius**: 8px
- **Shadow**: 0 4px 6px rgba(0, 0, 0, 0.1)
- **Padding**: 8px 0
- **Item Padding**: 12px 16px
- **Item Hover**: background #F8FAFC

### Auth Buttons (Right)
- **Login Button**:
  - Background: #E5E7EB
  - Color: #374151
  - Padding: 8px 16px
  - Border Radius: 8px
  - Hover: background #D1D5DB
- **Register Button**:
  - Background: #3B82F6
  - Color: #FFFFFF
  - Padding: 8px 16px
  - Border Radius: 12px
  - Hover: background #2563EB
- **Spacing**: 12px between buttons

### Mobile Responsive (≤768px)
- **Hamburger Menu**: Right side, 24px icon
- **Mobile Menu**: Full width dropdown
- **Logo**: Centered when menu open
- **Links**: Vertical stack, 16px padding each

---

## Footer Component

### Layout & Dimensions
- **Background**: #1F2937 (neutral dark)
- **Text Color**: #FFFFFF
- **Padding**: 32px 0
- **Container**: max-width 1200px, centered

### Three-Section Layout
1. **Logo Section (Left)**:
   - "LearnVerse" text, bold, 18px
   - Tagline below: "Learn. Grow. Succeed." (14px, opacity 0.8)

2. **Social Icons (Center)**:
   - Icons: Facebook, Twitter, LinkedIn, Instagram
   - Size: 24px each
   - Color: #FFFFFF, hover: #3B82F6
   - Spacing: 16px between icons
   - Transition: color 0.3s ease

3. **Copyright (Right)**:
   - Text: "© 2024 LearnVerse. All rights reserved."
   - Font: 14px, opacity 0.8

### Mobile Layout (≤768px)
- **Stack Vertically**: Logo top, social center, copyright bottom
- **Text Alignment**: Center all sections
- **Spacing**: 16px between sections

---

## Home Page Layout

### Hero/Banner Section

#### Dimensions & Background
- **Desktop Height**: 500px
- **Mobile Height**: 300px
- **Background**: Linear gradient 135deg, #3B82F6 0% → #10B981 100%
- **Content Alignment**: Center both horizontally and vertically

#### Content Elements
- **Main Heading**:
  - Text: "Master New Skills with Expert-Led Courses"
  - Font: 36px (28px mobile), bold, white
  - Margin Bottom: 16px
- **Subheading**:
  - Text: "Join thousands of learners advancing their careers"
  - Font: 18px (16px mobile), white, opacity 0.9
  - Margin Bottom: 32px
- **CTA Button**:
  - Text: "EXPLORE COURSES"
  - Background: #3B82F6
  - Hover: #2563EB
  - Padding: 16px 32px
  - Border Radius: 12px
  - Font: 14px, medium, uppercase
  - Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

### Popular Courses Section

#### Section Header
- **Padding**: 64px 0 32px 0
- **Background**: #FFFFFF
- **Title**: "Popular Courses" (H2, 30px, bold, center)
- **Subtitle**: "Discover our most enrolled courses" (16px, center, margin-top: 8px)

#### Grid Layout
- **Desktop**: 3 columns, 24px gap
- **Tablet**: 2 columns, 20px gap
- **Mobile**: 1 column, 16px gap
- **Container**: max-width 1200px, centered, padding 0 16px

#### Course Card Specifications
- **Dimensions**: 300px width × 400px height
- **Background**: #FFFFFF
- **Border Radius**: 12px
- **Shadow**: 0 4px 6px rgba(0, 0, 0, 0.1)
- **Hover Effect**: 
  - Transform: translateY(-4px)
  - Shadow: 0 8px 25px rgba(0, 0, 0, 0.15)
  - Transition: all 0.3s ease

#### Card Content Structure
1. **Course Image**:
   - Height: 180px (fixed)
   - Width: 100%
   - Object-fit: cover
   - Border Radius: 12px 12px 0 0

2. **Content Area** (padding: 20px):
   - **Category Tag**:
     - Background: #10B981
     - Color: #FFFFFF
     - Padding: 4px 8px
     - Border Radius: 6px
     - Font: 12px, medium
     - Position: Top left
   
   - **Course Title**:
     - Font: 18px, bold, #1F2937
     - Margin: 12px 0 8px 0
     - Line height: 1.4
   
   - **Instructor Name**:
     - Font: 14px, #374151
     - Margin bottom: 12px
   
   - **Price**:
     - Background: #F59E0B
     - Color: #FFFFFF
     - Padding: 6px 12px
     - Border Radius: 6px
     - Font: 14px, bold
     - Position: Top right corner
   
   - **View Details Button**:
     - Width: 100%
     - Background: #3B82F6
     - Color: #FFFFFF
     - Padding: 12px
     - Border Radius: 8px
     - Font: 14px, medium
     - Hover: background #2563EB
     - Position: Bottom of card

### Why Choose Us Section

#### Section Layout
- **Background**: #F8FAFC
- **Padding**: 64px 0
- **Title**: "Why Choose LearnVerse?" (H2, center)
- **Subtitle**: "We provide the best learning experience" (16px, center)

#### Feature Cards Grid
- **Layout**: 3 columns desktop, 2 tablet, 1 mobile
- **Gap**: 24px
- **Container**: max-width 1000px, centered

#### Feature Card Design
- **Background**: #FFFFFF
- **Border Radius**: 12px
- **Padding**: 24px
- **Shadow**: 0 2px 4px rgba(0, 0, 0, 0.1)
- **Text Alignment**: Center
- **Hover**: transform translateY(-2px), shadow increase

#### Card Content
1. **Icon**:
   - Size: 48px
   - Color: #3B82F6
   - Margin bottom: 16px

2. **Title**:
   - Font: 20px, bold, #1F2937
   - Margin bottom: 12px

3. **Description**:
   - Font: 16px, #374151
   - Line height: 1.6

### Top Instructors Section

#### Section Layout
- **Background**: #FFFFFF
- **Padding**: 64px 0
- **Title**: "Meet Our Expert Instructors" (H2, center)

#### Instructor Grid
- **Desktop**: 4 columns
- **Tablet**: 2 columns
- **Mobile**: 1 column
- **Gap**: 24px
- **Container**: max-width 1000px, centered

#### Instructor Card
- **Background**: #FFFFFF
- **Padding**: 24px
- **Border Radius**: 12px
- **Shadow**: 0 2px 4px rgba(0, 0, 0, 0.1)
- **Text Alignment**: Center
- **Hover**: shadow increase

#### Card Elements
1. **Avatar**:
   - Size: 80px diameter
   - Border Radius: 50%
   - Border: 3px solid #E2E8F0
   - Margin bottom: 16px

2. **Name**:
   - Font: 18px, bold, #1F2937
   - Margin bottom: 4px

3. **Title/Expertise**:
   - Font: 14px, #374151
   - Margin bottom: 8px

4. **Rating** (optional):
   - Stars: 5 star display
   - Color: #F59E0B

---

## Courses Page Layout

### Page Header
- **Background**: #FFFFFF
- **Padding**: 32px 0
- **Title**: "All Courses" (H1, 36px)
- **Breadcrumb**: Home > Courses (14px, #374151)

### Filter Bar
- **Background**: #F8FAFC
- **Padding**: 24px
- **Border Radius**: 12px
- **Margin Bottom**: 32px
- **Layout**: Flex row, wrap on mobile

#### Filter Elements
1. **Search Input**:
   - Width: 300px (full width mobile)
   - Placeholder: "Search courses..."
   - Border: 1px solid #E2E8F0
   - Border Radius: 8px
   - Padding: 12px 16px
   - Focus: border #3B82F6, shadow focus ring

2. **Category Dropdown**:
   - Width: 200px
   - Border Radius: 8px
   - Padding: 12px 16px
   - Background: #FFFFFF

3. **Price Range Filter**:
   - Width: 200px
   - Options: All, Free, $0-50, $50-100, $100+
   - Border Radius: 8px
   - Padding: 12px 16px
   - Background: #FFFFFF

4. **Sort Dropdown**:
   - Width: 180px
   - Options: Newest, Popular, Price Low-High, Price High-Low
   - Border Radius: 8px
   - Padding: 12px 16px
   - Background: #FFFFFF

### Courses Grid
- **Layout**: Same as Popular Courses section
- **Desktop**: 3 columns, 24px gap
- **Tablet**: 2 columns, 20px gap
- **Mobile**: 1 column, 16px gap
- **Card Design**: Identical to Popular Courses cards
- **Pagination**: Bottom center, 32px margin top

---

## Course Details Page Layout

### Page Container
- **Max Width**: 800px
- **Margin**: 0 auto
- **Padding**: 32px 16px
- **Background**: #FFFFFF

### Course Image
- **Width**: 100%
- **Max Width**: 600px
- **Height**: 300px
- **Object Fit**: cover
- **Border Radius**: 12px
- **Margin Bottom**: 24px

### Course Information
1. **Course Title**:
   - Font: 24px, bold, #1F2937
   - Margin Bottom: 16px
   - Line Height: 1.4

2. **Instructor Info**:
   - Layout: Flex row, avatar + name
   - Avatar: 40px diameter, circular
   - Name: 16px, semi-bold, #374151
   - Margin Bottom: 16px

3. **Course Description**:
   - Font: 16px, #374151
   - Line Height: 1.6
   - Margin Bottom: 24px

4. **Course Details Grid**:
   - Layout: 2 columns on desktop, 1 on mobile
   - Gap: 16px
   - Items: Duration, Level, Students, Rating
   - Each item: Icon + label + value

5. **Price Display**:
   - Font: 24px, bold, #F59E0B
   - Background: #FEF3C7
   - Padding: 12px 20px
   - Border Radius: 8px
   - Margin: 24px 0

### Enroll Button
- **Width**: 100%
- **Max Width**: 300px
- **Background**: #3B82F6
- **Color**: #FFFFFF
- **Padding**: 16px 24px
- **Border Radius**: 12px
- **Font**: 16px, medium, uppercase
- **Hover**: background #2563EB
- **Shadow**: 0 4px 6px rgba(0, 0, 0, 0.1)
- **Transition**: all 0.3s ease

---

## Add/Update Course Page Layout

### Form Container
- **Max Width**: 600px
- **Margin**: 0 auto
- **Padding**: 32px 16px
- **Background**: #FFFFFF

### Form Header
- **Title**: "Add New Course" / "Update Course" (H2, 30px)
- **Margin Bottom**: 32px
- **Text Alignment**: Center

### Form Fields
1. **Input Styling**:
   - Width: 100%
   - Padding: 12px 16px
   - Border: 1px solid #E2E8F0
   - Border Radius: 8px
   - Font: 16px
   - Margin Bottom: 20px
   - Focus: border #3B82F6, shadow focus ring

2. **Label Styling**:
   - Font: 14px, semi-bold, #374151
   - Margin Bottom: 6px
   - Display: block

3. **Textarea**:
   - Min Height: 120px
   - Resize: vertical
   - Same styling as inputs

4. **File Upload**:
   - Border: 2px dashed #E2E8F0
   - Padding: 24px
   - Text Alignment: center
   - Border Radius: 8px
   - Hover: border #3B82F6

### Submit Button
- **Width**: 100%
- **Background**: #3B82F6
- **Color**: #FFFFFF
- **Padding**: 16px 24px
- **Border Radius**: 12px
- **Font**: 16px, medium, uppercase
- **Hover**: background #2563EB
- **Shadow**: 0 4px 6px rgba(0, 0, 0, 0.1)
- **Margin Top**: 24px

---

## My Added/Enrolled Courses Page Layout

### Page Header
- **Title**: "My Added Courses" / "My Enrolled Courses" (H1, 36px)
- **Padding**: 32px 0
- **Add Course Button** (for Added Courses page):
  - Background: #10B981
  - Color: #FFFFFF
  - Padding: 12px 24px
  - Border Radius: 8px
  - Float: right

### Courses Grid
- **Layout**: Same as Courses page
- **Card Modifications**: Add action buttons at bottom

### Action Buttons (per card)
1. **Update Button**:
   - Background: #10B981
   - Color: #FFFFFF
   - Padding: 8px 16px
   - Border Radius: 8px
   - Font: 14px, medium
   - Hover: background #059669

2. **Delete Button**:
   - Background: #EF4444
   - Color: #FFFFFF
   - Padding: 8px 16px
   - Border Radius: 8px
   - Font: 14px, medium
   - Hover: background #DC2626

3. **Button Layout**:
   - Flex row, gap 8px
   - Margin Top: 12px
   - Full width container

---

## Authentication Pages Layout

### Page Container
- **Max Width**: 400px
- **Margin**: 0 auto
- **Padding**: 64px 16px
- **Min Height**: calc(100vh - 128px)
- **Display**: flex, align center

### Form Card
- **Background**: #FFFFFF
- **Padding**: 40px
- **Border Radius**: 12px
- **Shadow**: 0 8px 25px rgba(0, 0, 0, 0.15)
- **Border**: 1px solid #E2E8F0

### Form Elements
1. **Title**:
   - Font: 30px, bold, #1F2937
   - Text Alignment: center
   - Margin Bottom: 32px

2. **Input Fields**:
   - Width: 100%
   - Padding: 12px 16px
   - Border: 1px solid #E2E8F0
   - Border Radius: 8px
   - Font: 16px
   - Margin Bottom: 20px
   - Focus: border #3B82F6, shadow focus ring

3. **Submit Button**:
   - Width: 100%
   - Background: #3B82F6
   - Color: #FFFFFF
   - Padding: 14px 20px
   - Border Radius: 12px
   - Font: 16px, medium
   - Hover: background #2563EB
   - Margin Bottom: 20px

4. **Google Login Button**:
   - Width: 100%
   - Background: #EF4444
   - Color: #FFFFFF
   - Padding: 14px 20px
   - Border Radius: 12px
   - Font: 16px, medium
   - Hover: background #DC2626
   - Margin Bottom: 20px
   - Icon: Google logo, 20px, margin right 8px

5. **Switch Links**:
   - Text Alignment: center
   - Font: 14px, #374151
   - Link Color: #3B82F6
   - Text Decoration: underline
   - Hover: color #2563EB

---

## Dashboard Layout

### Overall Structure
- **Layout**: Sidebar + Main Content
- **Sidebar Width**: 256px (fixed)
- **Main Content**: calc(100% - 256px)
- **Mobile**: Sidebar collapses, overlay when open

### Sidebar Design
- **Background**: #1F2937
- **Height**: 100vh
- **Position**: Fixed left
- **Padding**: 24px 0
- **Z-Index**: 40

#### Sidebar Header
- **Logo**: "LearnVerse" (18px, bold, white)
- **Padding**: 0 24px 24px 24px
- **Border Bottom**: 1px solid #374151

#### Navigation Links
- **Padding**: 12px 24px
- **Color**: #D1D5DB
- **Font**: 14px, medium
- **Border Radius**: 8px (margin 0 16px)
- **Hover**: background #374151
- **Active**: background #3B82F6, color white
- **Icon**: 20px, margin right 12px

#### Logout Button
- **Position**: Bottom of sidebar
- **Width**: calc(100% - 32px)
- **Margin**: 0 16px 24px 16px
- **Background**: #EF4444
- **Color**: #FFFFFF
- **Padding**: 12px 16px
- **Border Radius**: 8px
- **Hover**: background #DC2626

### Main Content Area
- **Padding**: 24px
- **Background**: #F8FAFC
- **Min Height**: 100vh
- **Margin Left**: 256px (desktop)

### Mobile Responsive (≤768px)
- **Sidebar**: Transform translateX(-100%), overlay when open
- **Main Content**: Margin left 0, full width
- **Menu Toggle**: Fixed top right, z-index 50
- **Backdrop**: Dark overlay when sidebar open

---

## Additional Components

### Loading Spinner
- **Size**: 40px diameter
- **Color**: #3B82F6
- **Position**: Center of container
- **Animation**: Spin 1s linear infinite
- **Background**: Semi-transparent overlay when full-page

### 404 Error Page
- **Container**: Full viewport height, centered content
- **Background**: #FFFFFF
- **Content Alignment**: Center

#### 404 Content
1. **Error Code**:
   - Font: 72px, bold, #3B82F6
   - Margin Bottom: 16px

2. **Heading**:
   - Font: 36px, bold, #1F2937
   - Text: "Page Not Found"
   - Margin Bottom: 16px

3. **Description**:
   - Font: 16px, #374151
   - Text: "The page you're looking for doesn't exist."
   - Margin Bottom: 32px

4. **Home Button**:
   - Background: #3B82F6
   - Color: #FFFFFF
   - Padding: 16px 32px
   - Border Radius: 12px
   - Font: 16px, medium
   - Hover: background #2563EB

### Toast Notifications
- **Position**: Fixed top right, z-index 100
- **Width**: 350px
- **Padding**: 16px 20px
- **Border Radius**: 8px
- **Shadow**: 0 4px 6px rgba(0, 0, 0, 0.1)
- **Animation**: Slide in from right, fade out
- **Duration**: 4 seconds auto-dismiss

#### Toast Types
1. **Success**: Background #10B981, color white
2. **Error**: Background #EF4444, color white
3. **Warning**: Background #F59E0B, color white
4. **Info**: Background #3B82F6, color white

---

## Responsive Breakpoints

### Desktop (≥1024px)
- **Container Max Width**: 1200px
- **Grid Columns**: Full specified columns
- **Sidebar**: Always visible
- **Typography**: Full sizes

### Tablet (768px - 1023px)
- **Container**: Full width with 24px padding
- **Grid Columns**: Reduced as specified
- **Sidebar**: Collapsible
- **Typography**: Slightly reduced

### Mobile (≤767px)
- **Container**: Full width with 16px padding
- **Grid Columns**: Single column mostly
- **Sidebar**: Overlay only
- **Typography**: Mobile optimized sizes
- **Buttons**: Full width where appropriate

---

## Animation & Transitions

### Standard Transitions
- **Duration**: 0.3s
- **Easing**: ease-in-out
- **Properties**: background-color, color, transform, box-shadow

### Hover Effects
- **Cards**: translateY(-4px) + shadow increase
- **Buttons**: Background color change + shadow
- **Links**: Color change

### Page Transitions
- **Fade In**: opacity 0 to 1, 0.3s
- **Slide In**: translateY(20px) to 0, 0.3s
- **Scale In**: scale(0.95) to 1, 0.2s

### Loading States
- **Skeleton Loading**: Animated gradient background
- **Spinner**: Continuous rotation
- **Progress Bar**: Width animation

---

## Accessibility Standards

### Color Contrast
- **Text on White**: Minimum 4.5:1 ratio
- **Interactive Elements**: Minimum 3:1 ratio
- **Focus Indicators**: High contrast, visible

### Keyboard Navigation
- **Tab Order**: Logical flow
- **Focus Indicators**: 3px outline, primary color
- **Skip Links**: Available for main content

### Screen Reader Support
- **Alt Text**: All images
- **ARIA Labels**: Interactive elements
- **Semantic HTML**: Proper heading hierarchy
- **Form Labels**: Associated with inputs

---

## Performance Considerations

### Image Optimization
- **Format**: WebP with fallback
- **Lazy Loading**: Below fold images
- **Responsive Images**: Multiple sizes
- **Compression**: Optimized file sizes

### CSS Optimization
- **Critical CSS**: Inline above fold
- **Minification**: Production builds
- **Unused CSS**: Purged in build

### JavaScript
- **Code Splitting**: Route-based chunks
- **Lazy Loading**: Non-critical components
- **Bundle Size**: Monitored and optimized

This completes the comprehensive UI design specification for the LearnVerse online learning platform, covering all components, layouts, responsive behavior, and technical considerations.ce Filter**:
   - Width: 150px
   - Options: All, Free, Paid
   - Same styling as category

4. **Sort Dropdown**:
   - Width: 150px
   - Options: Newest, Popular, Price Low-High, Price High-Low

### Courses Grid
- **Layout**: Same as Popular Courses section
- **Pagination**: Bottom center
- **Load More Button**: Alternative to pagination

---

## Course Details Page Layout

### Page Container
- **Max Width**: 1000px
- **Margin**: 0 auto
- **Padding**: 32px 16px

### Course Header Section
1. **Course Image**:
   - Width: 100%
   - Max Width: 600px
   - Height: 300px
   - Border Radius: 12px
   - Object-fit: cover
   - Margin bottom: 24px

2. **Course Title**:
   - Font: 24px, bold, #1F2937
   - Margin bottom: 16px

3. **Course Meta**:
   - Instructor, Category, Duration, Rating
   - Font: 14px, #374151
   - Flex layout, gap 16px

### Course Content
1. **Description**:
   - Font: 16px, line-height 1.6
   - Color: #374151
   - Margin: 24px 0

2. **What You'll Learn**:
   - Bulleted list
   - Each item: 16px, #374151
   - Checkmark icons: #10B981

3. **Course Curriculum**:
   - Expandable sections
   - Section headers: 18px, bold
   - Lesson items: 16px, #374151

### Sidebar (Desktop) / Bottom Section (Mobile)
- **Background**: #F8FAFC
- **Padding**: 24px
- **Border Radius**: 12px
- **Sticky Position**: Desktop only

#### Sidebar Content
1. **Price Display**:
   - Font: 24px, bold, #F59E0B
   - Margin bottom: 16px

2. **Enroll Now Button**:
   - Width: 100%
   - Background: #3B82F6
   - Color: #FFFFFF
   - Padding: 16px
   - Border Radius: 12px
   - Font: 16px, medium, uppercase
   - Hover: background #2563EB
   - Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

3. **Course Features**:
   - List of features (duration, access, certificate)
   - Icons with text
   - Font: 14px, #374151

---

## Add/Update Course Page Layout

### Page Header
- **Title**: "Add New Course" / "Update Course"
- **Breadcrumb**: Dashboard > Add Course

### Form Container
- **Max Width**: 600px
- **Margin**: 0 auto
- **Background**: #FFFFFF
- **Padding**: 32px
- **Border Radius**: 12px
- **Shadow**: 0 4px 6px rgba(0, 0, 0, 0.1)

### Form Fields
1. **Course Title**:
   - Label: 16px, bold, #1F2937
   - Input: full width, padding 12px, border-radius 8px
   - Border: 1px solid #E2E8F0
   - Focus: border #3B82F6, shadow ring

2. **Description**:
   - Textarea: height 120px
   - Same styling as input

3. **Category Dropdown**:
   - Same input styling
   - Options populated from categories

4. **Price Input**:
   - Number input
   - Prefix: "$" symbol
   - Same styling as text input

5. **Course Image Upload**:
   - Drag & drop area
   - Border: 2px dashed #E2E8F0
   - Border Radius: 8px
   - Padding: 32px
   - Text: "Drag image here or click to browse"
   - Hover: border #3B82F6

### Form Actions
- **Submit Button**:
  - Background: #3B82F6
  - Color: #FFFFFF
  - Padding: 16px 32px
  - Border Radius: 12px
  - Font: 16px, medium, uppercase
  - Hover: background #2563EB
  - Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

- **Cancel Button**:
  - Background: #E5E7EB
  - Color: #374151
  - Same dimensions as submit
  - Border Radius: 8px
  - Hover: background #D1D5DB

---

## My Added/Enrolled Courses Page Layout

### Page Header
- **Title**: "My Added Courses" / "My Enrolled Courses"
- **Add Course Button**: Top right (for My Added Courses only)

### Courses Grid/Table Toggle
- **View Toggle**: Grid/Table view buttons
- **Position**: Top right
- **Buttons**: 32px square, border-radius 6px

### Grid View
- **Same layout as Courses page**
- **Additional Action Buttons** on each card:
  - **Update Button** (My Added Courses):
    - Background: #10B981
    - Color: #FFFFFF
    - Padding: 8px 16px
    - Border Radius: 8px
    - Font: 14px, medium
    - Hover: background #059669
  
  - **Delete Button**:
    - Background: #EF4444
    - Color: #FFFFFF
    - Same styling as Update
    - Hover: background #DC2626

### Table View
- **Headers**: Course, Category, Price, Students, Actions
- **Row Height**: 60px
- **Alternating Rows**: background #F8FAFC
- **Hover**: background #E2E8F0

---

## Authentication Pages Layout

### Page Container
- **Background**: #F8FAFC (full viewport)
- **Form Container**: centered, max-width 400px

### Form Card
- **Background**: #FFFFFF
- **Padding**: 32px
- **Border Radius**: 12px
- **Shadow**: 0 8px 25px rgba(0, 0, 0, 0.15)

### Form Header
- **Title**: "Login" / "Register" (H2, 30px, bold, center)
- **Subtitle**: "Welcome back" / "Create your account" (16px, center, #374151)
- **Margin Bottom**: 32px

### Form Fields
1. **Input Styling**:
   - Width: 100%
   - Padding: 12px 16px
   - Border: 1px solid #E2E8F0
   - Border Radius: 8px
   - Font: 16px
   - Margin Bottom: 16px
   - Focus: border #3B82F6, shadow ring

2. **Labels**:
   - Font: 14px, medium, #1F2937
   - Margin Bottom: 4px

3. **Password Field**:
   - Show/hide toggle icon
   - Icon: 20px, right side, #374151

### Form Actions
1. **Primary Button** (Login/Register):
   - Width: 100%
   - Background: #3B82F6
   - Color: #FFFFFF
   - Padding: 16px
   - Border Radius: 12px
   - Font: 16px, medium, uppercase
   - Hover: background #2563EB
   - Margin Bottom: 16px

2. **Google Login Button**:
   - Width: 100%
   - Background: #EF4444
   - Color: #FFFFFF
   - Same styling as primary
   - Border Radius: 12px
   - Hover: background #DC2626
   - Icon: Google logo, 20px, left side

### Form Footer
- **Link Text**: "Don't have an account? Register" / "Already have an account? Login"
- **Font**: 14px, center
- **Link Color**: #3B82F6
- **Hover**: underline

---

## Dashboard Layout

### Sidebar (Desktop)
- **Width**: 256px
- **Background**: #FFFFFF
- **Height**: calc(100vh - 64px)
- **Position**: Fixed left
- **Top**: 64px (below navbar)
- **Shadow**: 2px 0 4px rgba(0, 0, 0, 0.1)
- **Padding**: 24px 0

#### Sidebar Navigation
1. **User Profile Section**:
   - Avatar: 48px, circular
   - Name: 16px, bold
   - Role: 14px, #374151
   - Padding: 16px 24px
   - Border Bottom: 1px solid #E2E8F0

2. **Navigation Links**:
   - Padding: 12px 24px
   - Font: 16px, medium
   - Color: #374151
   - Border Radius: 8px (within padding area)
   - Hover: background #F8FAFC
   - Active: background #3B82F6, color #FFFFFF
   - Icons: 20px, left aligned

3. **Logout Button**:
   - Position: Bottom of sidebar
   - Width: calc(100% - 32px)
   - Margin: 16px
   - Background: #EF4444
   - Color: #FFFFFF
   - Padding: 12px
   - Border Radius: 8px
   - Font: 14px, medium
   - Hover: background #DC2626

### Main Content Area
- **Margin Left**: 256px (desktop)
- **Padding**: 24px
- **Background**: #F8FAFC
- **Min Height**: calc(100vh - 64px)

### Mobile Sidebar (≤768px)
- **Transform**: translateX(-100%) (hidden by default)
- **Overlay**: rgba(0, 0, 0, 0.5) when open
- **Transition**: transform 0.3s ease
- **Open State**: transform translateX(0)

---

## Responsive Breakpoints & Behavior

### Breakpoints
- **Mobile**: ≤768px
- **Tablet**: 769px - 1024px
- **Desktop**: ≥1025px

### Mobile Adaptations (≤768px)
1. **Typography**:
   - H1: 28px (from 36px)
   - H2: 24px (from 30px)
   - Hero height: 300px (from 500px)

2. **Grid Layouts**:
   - All multi-column grids become single column
   - Course cards: full width, max-width 300px

3. **Navigation**:
   - Hamburger menu replaces desktop nav
   - Mobile menu: full width dropdown

4. **Sidebar**:
   - Hidden by default
   - Slides in from left when toggled
   - Overlay background when open

5. **Forms**:
   - Full width inputs
   - Reduced padding on containers

### Tablet Adaptations (769px - 1024px)
1. **Grid Layouts**:
   - 3-column grids become 2-column
   - 4-column grids become 2-column

2. **Sidebar**:
   - Remains visible
   - Slightly reduced width if needed

---

## Interactive States & Animations

### Hover Effects
- **Duration**: 0.3s ease
- **Cards**: translateY(-4px), shadow increase
- **Buttons**: background color change, shadow increase
- **Links**: color change to primary

### Focus States
- **Inputs**: border color #3B82F6, shadow ring
- **Buttons**: outline 2px solid #3B82F6, offset 2px

### Loading States
1. **Spinner**:
   - Size: 40px diameter
   - Border: 3px solid #E2E8F0
   - Border-top: 3px solid #3B82F6
   - Animation: spin 1s linear infinite
   - Position: center of container

2. **Skeleton Loading**:
   - Background: #E2E8F0
   - Animation: pulse 1.5s ease-in-out infinite
   - Border Radius: matches content

### Page Transitions
1. **Fade In**:
   - From: opacity 0, translateY(20px)
   - To: opacity 1, translateY(0)
   - Duration: 0.6s ease-out

2. **Slide In**:
   - From: opacity 0, translateX(-20px)
   - To: opacity 1, translateX(0)
   - Duration: 0.6s ease-out

---

## 404 Error Page

### Layout
- **Full Viewport**: 100vh height
- **Background**: #F8FAFC
- **Content**: Centered vertically and horizontally

### Content Elements
1. **Error Code**:
   - Text: "404"
   - Font: 72px, bold, #3B82F6
   - Margin Bottom: 16px

2. **Heading**:
   - Text: "Page Not Found"
   - Font: 36px, bold, #1F2937
   - Margin Bottom: 16px

3. **Description**:
   - Text: "The page you're looking for doesn't exist."
   - Font: 16px, #374151
   - Margin Bottom: 32px

4. **Home Button**:
   - Text: "GO HOME"
   - Background: #3B82F6
   - Color: #FFFFFF
   - Padding: 16px 32px
   - Border Radius: 12px
   - Font: 16px, medium, uppercase
   - Hover: background #2563EB

---

## Accessibility Considerations

### Color Contrast
- All text meets WCAG AA standards (4.5:1 ratio minimum)
- Interactive elements have sufficient contrast

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus indicators are clearly visible
- Tab order is logical

### Screen Reader Support
- Semantic HTML structure
- Alt text for all images
- ARIA labels for complex interactions
- Skip links for main content

### Motion Preferences
- Respect prefers-reduced-motion setting
- Provide alternatives to animations

This specification provides complete design details for every component and page of the Online Learning Platform, ensuring consistency and modern design standards across all devices and user interactions.