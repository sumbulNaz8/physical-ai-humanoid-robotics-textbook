# Personalization Feature Demo Guide

## Setup for Demo

1. Run the Docusaurus development server:
```bash
cd frontend
npm run start
```

2. Open your browser to http://localhost:3000

3. Navigate to the personalization demo page:
```
http://localhost:3000/personalization-demo
```

## Demo Steps

### Step 1: Show Unauthenticated Experience
1. Show that the personalization features are not available when not logged in
2. Point out the login button for demo users
3. Explain that this ensures personalization is only available to logged-in users

### Step 2: Login as Demo User
1. Click the "Log in as Demo User" button
2. Show that the user preferences panel appears
3. Note the default settings (difficulty: simple, include name: true, interests: robotics, AI, humanoid)

### Step 3: Customize Preferences
1. Change difficulty to "detailed" to show more in-depth content
2. Add more interests like "machine learning", "computer vision"
3. Toggle the "include name" option on/off to show its effect

### Step 4: Personalize Content
1. Click the "Personalize Content" button
2. Show how the content updates in real-time
3. Point out:
   - How the content becomes more detailed when "detailed" difficulty is selected
   - How user's name is included in the text
   - How interest terms are emphasized in the content
   - How a note about personalization appears at the end

### Step 5: Show Integration with WritingAgent
1. Open browser developer tools (F12)
2. Go to the Console tab
3. Show the personalization logs that appear when content is personalized
4. Point out the detailed information logged: user, preferences, chapter title, timestamp

### Step 6: Show in Chapter Context
1. Navigate to the UI chapter page: `/ui-chapter`
2. Show how the personalization button appears at the beginning of the chapter
3. Demonstrate the same personalization functionality within the chapter context

## Code Highlights

### PersonalizationProcessor
- `applySimpleStyle()`: Simplifies content language
- `applyDetailedStyle()`: Adds more details and examples
- `includeUserInContent()`: Includes user's name in content
- `emphasizeInterests()`: Emphasizes user interests in content

### WritingAgent Integration
- Uses styles like "simple", "academic" to transform content
- Maintains consistency with existing WritingAgent architecture
- Provides sophisticated text transformations

### Authentication
- Uses localStorage/sessionStorage for user authentication
- Only enables personalization for logged-in users
- Provides fallback mechanisms

### Real-time Updates
- Content updates without page refresh
- Uses React state management for smooth transitions
- Provides immediate feedback to users

## Hackathon Evaluation Points

This feature addresses all the requirements:
- ✅ Each chapter has a "Personalize Content" button at the start
- ✅ Content changes dynamically according to user preferences (simpler/detailed language, includes user's name, topic emphasis)
- ✅ Feature is linked to logged-in users only
- ✅ Clear frontend UI with button and preferences controls
- ✅ Integration with WritingAgent for content transformation
- ✅ Real-time UI updates
- ✅ Comprehensive logging of personalization events
- ✅ Robustness handling empty/invalid preferences
- ✅ Works for any chapter
- ✅ Includes demo code for sample user personalization