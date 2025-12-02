# Contributing to HopeVoice Hub

Thank you for your interest in contributing to HopeVoice Hub! This platform serves the Cobourg community, and contributions help make it better for everyone.

## 🌟 Ways to Contribute

### For Everyone
- 🐛 **Report Bugs**: Found a problem? Open an issue
- 💡 **Suggest Features**: Have an idea? Share it in discussions
- 📖 **Improve Documentation**: Help make guides clearer
- 🗣️ **Provide Feedback**: Share user experiences
- 🌐 **Translate**: Help make the platform multilingual

### For Developers
- 🔧 **Fix Bugs**: Pick up issues labeled "bug"
- ✨ **Add Features**: Implement requested enhancements
- ♿ **Improve Accessibility**: Make the platform more inclusive
- 🎨 **Enhance UI/UX**: Improve the user experience
- 📱 **Mobile Optimization**: Better mobile experience

### For Designers
- 🎨 **Visual Design**: Improve layouts and aesthetics
- 🖼️ **Create Assets**: Icons, illustrations, branding
- 📐 **UX Research**: User testing and feedback
- ♿ **Accessibility**: Color contrast, readability

### For Content Creators
- 📝 **Write Guides**: Create tutorials and how-tos
- 🎥 **Video Tutorials**: Screen recordings for features
- 📖 **Documentation**: Improve existing docs
- 🌐 **Translations**: Translate content to other languages

## 🚀 Getting Started

### 1. Fork the Repository
```bash
# Click "Fork" on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/OWHRC.git
cd OWHRC
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Changes
- Follow the existing code style
- Keep changes focused and minimal
- Test your changes thoroughly
- Update documentation if needed

### 4. Commit Changes
```bash
git add .
git commit -m "Description of your changes"
```

### 5. Push and Create PR
```bash
git push origin feature/your-feature-name
# Then create a Pull Request on GitHub
```

## 📋 Contribution Guidelines

### Code Style

#### JavaScript
- Use modern ES6+ syntax
- Follow existing patterns in the codebase
- Comment complex logic
- Use descriptive variable names
- Keep functions small and focused

```javascript
// Good
const saveUserData = (data) => {
    storage.set('user_data', data);
    accessibility.announceChange('Data saved');
};

// Avoid
function x(d) { storage.set('ud', d); }
```

#### HTML
- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- Keep structure clean and organized
- Use data attributes for JS hooks

```html
<!-- Good -->
<button id="save-btn" aria-label="Save your changes">Save</button>

<!-- Avoid -->
<div onclick="save()">Save</div>
```

#### CSS
- Use CSS variables for theming
- Follow mobile-first approach
- Keep selectors specific but not overly nested
- Group related styles together

```css
/* Good */
.btn-primary {
    background: var(--primary-color);
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
}
```

### Accessibility Requirements

All contributions must maintain WCAG 2.1 AA compliance:

- ✅ Sufficient color contrast (4.5:1 for text)
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ ARIA labels and roles
- ✅ Focus indicators visible
- ✅ No motion-only interactions

### Privacy Requirements

Maintain the privacy-first approach:

- ✅ All data stored locally only
- ✅ No external API calls without consent
- ✅ Anonymous posting options
- ✅ Clear data deletion paths
- ✅ No tracking or analytics

### Testing

Before submitting:

1. **Manual Testing**
   - Test all affected features
   - Check on mobile and desktop
   - Verify accessibility features work
   - Test with keyboard navigation

2. **Browser Testing**
   - Chrome/Edge
   - Firefox
   - Safari (if possible)

3. **Accessibility Testing**
   - Use screen reader (NVDA, VoiceOver)
   - Test keyboard navigation
   - Check color contrast
   - Verify ARIA labels

## 🐛 Reporting Bugs

Use the GitHub issue template:

**Title**: Clear, descriptive title

**Description**:
- What happened?
- What should have happened?
- Steps to reproduce
- Browser and version
- Screenshots if applicable

**Labels**: Add appropriate labels (bug, accessibility, etc.)

## 💡 Requesting Features

**Title**: Feature name

**Description**:
- What problem does this solve?
- Who benefits from this feature?
- How should it work?
- Any implementation ideas?

**Use Case**: Describe real-world scenarios

## 📝 Documentation Standards

When updating documentation:

- Use clear, simple language
- Include examples
- Add screenshots where helpful
- Keep formatting consistent
- Update table of contents if needed

## 🔍 Code Review Process

All contributions go through review:

1. **Automated Checks**: Linting, validation
2. **Manual Review**: Code quality, functionality
3. **Accessibility Check**: WCAG compliance
4. **Privacy Review**: Data handling practices

**Review Criteria**:
- ✅ Solves the stated problem
- ✅ Follows contribution guidelines
- ✅ Maintains accessibility
- ✅ Preserves privacy principles
- ✅ Includes documentation
- ✅ Passes testing

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or improvement
- `documentation`: Documentation updates
- `accessibility`: Accessibility improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `priority-high`: Urgent issues

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Remember this serves a vulnerable community
- Maintain privacy and security awareness

## 📞 Getting Help

- **Questions**: Open a discussion
- **Issues**: Check existing issues first
- **Ideas**: Start a discussion
- **Urgent**: Tag with priority-high

## 🎯 Priority Areas

Current focus areas:

1. **Accessibility**: Always the top priority
2. **Mobile Experience**: Improving mobile usability
3. **Documentation**: Making guides clearer
4. **Testing**: Adding automated tests
5. **Map Integration**: Real mapping functionality

## 📚 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 🙏 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Appreciated by the community

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for helping make HopeVoice Hub better for everyone!** 🏠❤️

Together, we're building a platform that amplifies voices and drives positive change in the Cobourg community.
