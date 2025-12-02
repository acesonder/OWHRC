# 🏠 HopeVoice Hub: Cobourg Street Community Platform

A dynamic, privacy-respecting web platform built to amplify the voices of Cobourg's homeless population, connect them to vital resources, and drive civic change through real-time feedback, creative storytelling, rights reporting, and community advocacy.

## 🌟 Features

### Core User Features

- **🎙️ VoiceUp**: Micro-podcast studio for sharing 2-minute voice recordings
- **📋 Needs Board**: Post and respond to urgent community needs
- **🗺️ Resource Radar**: Interactive map of services, shelters, and resources
- **⚖️ RightsBot**: Automated rights support and guidance
- **🏛️ Civic Stories**: Submit messages directly to city council
- **👨‍⚖️ Ask a Lawyer**: Anonymous legal Q&A
- **🍽️ FoodFinder**: Map and calendar of free meals
- **📅 Outreach Scheduler**: Schedule of outreach visits and services
- **✍️ Advocacy Letter Builder**: Create professional advocacy letters
- **📝 Incident Logger**: Document rights violations
- **📰 Street News**: Community news and updates
- **⭐ RespectPoint**: Rate and review community services
- **🎨 StreetGallery**: Share art, photography, and poetry
- **🧭 Navigator**: Connect with peer mentors
- **💚 HealthLog**: Private wellbeing tracker
- **🗺️ HopeMap**: Crowdsourced asset and hazard mapping

### Admin Features

- Content moderation dashboard
- User and resource management
- Incident tracking and case management
- Analytics and reporting
- Data export and backup tools

## 🔒 Privacy & Accessibility

- **100% Local Storage**: All data stays on your device
- **No External Servers**: Complete privacy and control
- **Anonymous Posting**: Share without revealing identity
- **WCAG 2.1 AA Compliant**: High contrast, reduced motion, screen reader support
- **Multi-Device**: Works on phones, tablets, and desktops
- **Offline Capable**: Core features work without internet

## 🚀 Quick Start

### For Users

1. Visit the deployed site (see deployment section below)
2. Accept privacy notice
3. Start using features immediately - no account required!
4. See [TUTORIAL.md](TUTORIAL.md) for detailed usage guide

### For Deployment

This is a static web application that runs on GitHub Pages (free hosting).

**Deploy in 3 steps:**
1. Enable GitHub Pages in repository settings
2. Select main branch as source
3. Your site is live!

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for complete deployment instructions.

## 📚 Documentation

- **[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)** - Complete guide for deploying on GitHub Pages
- **[TUTORIAL.md](TUTORIAL.md)** - User guide for all platform features
- **[index.html](index.html)** - Main application entry point

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: LocalStorage API
- **Audio**: MediaRecorder API
- **Hosting**: GitHub Pages (static hosting)
- **Accessibility**: WCAG 2.1 AA compliant with ARIA labels

## 🏗️ Architecture

```
OWHRC/
├── index.html              # Main application page
├── css/
│   ├── styles.css         # Core styles
│   └── accessibility.css  # Accessibility enhancements
├── js/
│   ├── app.js            # Application initialization
│   ├── core/
│   │   └── router.js     # Single-page routing
│   ├── utils/
│   │   ├── storage.js    # LocalStorage management
│   │   ├── accessibility.js  # Accessibility controls
│   │   └── audio.js      # Audio recording/playback
│   └── modules/
│       ├── voiceup.js    # VoiceUp module
│       ├── needs-board.js    # Needs Board module
│       ├── resource-radar.js # Resource Radar module
│       └── [other modules]   # Additional feature modules
├── DEPLOYMENT-GUIDE.md   # Deployment instructions
├── TUTORIAL.md          # User tutorial
└── README.md           # This file
```

## 🎯 Use Cases

### For Community Members
- Share experiences and stories anonymously
- Find immediate help for urgent needs
- Access resources and services
- Track personal wellbeing
- Document rights violations
- Connect with peer support

### For Volunteers & Agencies
- Respond to community needs
- Update resource information
- Schedule outreach activities
- Coordinate services

### For Advocates
- Document incidents for reporting
- Create advocacy letters
- Submit concerns to council
- Track community issues

### For Administrators
- Monitor platform activity
- Moderate content
- Manage resources
- Export data for reporting

## 🔐 Security & Privacy

### Data Storage
- All data stored locally using browser's LocalStorage
- No data transmission to external servers
- Users can export and delete data anytime

### Privacy Features
- Anonymous posting option on all features
- No user accounts required
- No tracking or analytics
- HTTPS encryption (when deployed on GitHub Pages)

### Recommended Practices
- Use HTTPS only (enforced on GitHub Pages)
- Regular data backups via export feature
- Clear guidance on privacy to users
- Transparent data practices

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 90+

## 📱 Mobile-First Design

- Responsive layout adapts to all screen sizes
- Touch-friendly interface
- Mobile-optimized navigation
- Efficient data usage

## 🤝 Contributing

Contributions are welcome! Areas for enhancement:

- Additional language support
- Enhanced mapping features (Leaflet/Mapbox integration)
- PWA capabilities for offline use
- Additional accessibility features
- More advocacy templates
- Enhanced reporting tools

## 📄 License

This project is open source and available for community use.

## 🙏 Acknowledgments

Built for the Cobourg community to empower voices, connect resources, and drive positive change.

## 📞 Support

For questions or issues:
- Review the [TUTORIAL.md](TUTORIAL.md)
- Check the [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)
- Open an issue in the GitHub repository

## 🎉 Get Started Now!

1. Deploy the platform following [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)
2. Share the URL with your community
3. Review the [TUTORIAL.md](TUTORIAL.md) with users
4. Start making a difference!

---

**HopeVoice Hub - Amplifying voices, connecting resources, driving change.** 🏠❤️