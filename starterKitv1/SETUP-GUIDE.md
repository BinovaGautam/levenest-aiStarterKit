# StarterKit v1.0 Setup Guide
## Complete Installation and Configuration Instructions

**Version**: 1.0  
**Date**: January 24, 2025  
**Estimated Setup Time**: 10-15 minutes

---

## 🎯 Prerequisites

### **System Requirements**
- Any operating system (Windows, macOS, Linux)
- Text editor or IDE (VS Code, Cursor, etc.)
- Basic understanding of JSON files
- Project directory with write permissions

### **Optional but Recommended**
- Git for version control
- Node.js for JavaScript/TypeScript projects
- Package manager (yarn, npm, etc.)

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Copy Starter Kit

```bash
# Option A: Copy to existing project
cp -r starterKitv1 /path/to/your/project/projectDocs

# Option B: Create new project
mkdir my-new-project
cd my-new-project
cp -r starterKitv1 projectDocs
```

### Step 2: Create Index File

**CRITICAL**: Create `index.mdc` in your project root:

```bash
# Create the AI agent reference file
touch index.mdc
```

**Copy this template into `index.mdc`:**

```markdown
# @index.mdc - AI Agent Reference Point

## Project Management System Location
- **Main Directory**: `projectDocs/`
- **Master Index**: `projectDocs/core/master-index.json`
- **Session Registry**: `projectDocs/tracking/sessions/session-registry.json`
- **Current Tasks**: `projectDocs/tasks/task-registry.json`

## AI Agent Instructions
1. **Always start here**: Check this file first for project context
2. **Session Management**: Use session persistence system for continuity
3. **Documentation**: Everything is connected - follow relationships
4. **Standards**: Maintain zero-tolerance quality standards

## Quick Commands
- **New Session**: "Initialize new session for [task] - SESSION-{YYMMDD}-{XXX}"
- **Recover Session**: "Recover session SESSION-{ID} and continue from last checkpoint"
- **Emergency Recovery**: "Emergency recovery - load critical project context for [issue]"

## Project Context
- **Project Name**: [YOUR_PROJECT_NAME]
- **Current Phase**: [CURRENT_PHASE]
- **Technology Stack**: [YOUR_TECH_STACK]
- **Package Manager**: [yarn/npm/etc]

## Last Updated
- **Date**: [UPDATE_DATE]
- **Session**: [LAST_SESSION_ID]
- **Status**: [PROJECT_STATUS]
```

### Step 3: Configure Project Details

Edit `projectDocs/core/master-index.json`:

```json
{
  "metadata": {
    "projectName": "Your Actual Project Name",
    "currentPhase": "Phase 1 - Setup",
    "packageManager": "yarn",
    "buildSystem": {
      "packageManager": "yarn",
      "nodeVersion": "18.0+",
      "buildTool": "vite",
      "framework": "React",
      "cssFramework": "Tailwind CSS"
    }
  }
}
```

### Step 4: Test the System

**Use this command with any AI agent:**

```markdown
"Initialize new session for project setup - SESSION-250124-001. Load project context from index.mdc and projectDocs/core/master-index.json"
```

---

## 🔧 Detailed Configuration

### 1. **Project Metadata Configuration**

Edit `projectDocs/core/master-index.json`:

```json
{
  "metadata": {
    "projectName": "Your Project Name",
    "currentPhase": "Phase 1",
    "packageManager": "yarn",
    "buildSystem": {
      "packageManager": "yarn",
      "nodeVersion": "18.0+",
      "buildTool": "webpack",
      "framework": "React",
      "cssFramework": "Tailwind CSS"
    }
  }
}
```

### 2. **Task Registry Setup**

Edit `projectDocs/tasks/task-registry.json`:

1. Remove the template task:
```json
"TASK-TEMPLATE-001": { ... }  // Delete this entire section
```

2. Add your first real task:
```json
"TASK-1-001": {
  "id": "TASK-1-001",
  "title": "Project Setup and Configuration",
  "description": "Set up the project management system and initial configuration",
  "type": "planning",
  "status": "active",
  "priority": "high",
  "created": "2025-01-24T10:00:00Z",
  "updated": "2025-01-24T10:00:00Z",
  "estimatedHours": 2,
  "actualHours": 0,
  "assignee": "team-lead",
  "phase": "setup",
  "tags": ["setup", "configuration", "planning"]
}
```

### 3. **Session Registry Configuration**

The session registry at `projectDocs/tracking/sessions/session-registry.json` is ready to use. Update the template session:

```json
{
  "metadata": {
    "projectName": "Your Project Name"
  },
  "sessions": {
    "SESSION-250124-001": {
      "id": "SESSION-250124-001",
      "type": "planning",
      "status": "active",
      "created": "2025-01-24T10:00:00Z",
      "context": {
        "currentTask": "TASK-1-001",
        "currentPhase": "setup",
        "conversationSummary": "Setting up project management system"
      }
    }
  }
}
```

### 4. **Automation Rules Configuration**

The automation rules in `projectDocs/automation/automation-rules.json` are pre-configured. Adjust based on your needs:

```json
{
  "rules": {
    "taskAutomation": {
      "autoTaskGeneration": {
        "enabled": true,
        "parameters": {
          "maxTasksPerTrigger": 3,
          "requireHumanApproval": true,
          "defaultPriority": "medium"
        }
      }
    }
  }
}
```

---

## 📁 Directory Customization

### **Adding Custom Directories**

You can extend the structure for your specific needs:

```bash
# Add custom directories
mkdir -p projectDocs/custom/{apis,databases,deployments,integrations}
mkdir -p projectDocs/phases/phase-{1,2,3,4,5}
mkdir -p projectDocs/tasks/by-type/{frontend,backend,devops,testing}
```

### **Project-Specific Extensions**

Create project-specific configuration files:

```bash
# For web projects
touch projectDocs/extensions/web-config.json

# For mobile projects  
touch projectDocs/extensions/mobile-config.json

# For API projects
touch projectDocs/extensions/api-config.json
```

---

## 🔄 Integration Setup

### **Git Integration**

Add to your `.gitignore`:

```gitignore
# Keep project docs but ignore sensitive data
projectDocs/tracking/sessions/session-archive/
projectDocs/tracking/snapshots/
projectDocs/analytics/reports/
```

### **IDE Integration**

**For VS Code**, add to `.vscode/settings.json`:

```json
{
  "files.associations": {
    "*.mdc": "markdown",
    "index.mdc": "markdown"
  },
  "search.exclude": {
    "projectDocs/tracking/snapshots/": true,
    "projectDocs/analytics/reports/": true
  }
}
```

**For Cursor**, the system is already optimized.

### **Package Manager Integration**

**For Node.js projects**, add to `package.json`:

```json
{
  "scripts": {
    "docs:health": "node -e \"console.log('Project docs system healthy')\"",
    "docs:backup": "cp -r projectDocs projectDocs-backup-$(date +%Y%m%d)",
    "docs:clean": "find projectDocs/tracking/snapshots -name '*.json' -mtime +30 -delete"
  }
}
```

---

## 🧪 Testing Your Setup

### **Test 1: Basic System Check**

```markdown
**AI Command**: "Check project health using projectDocs system and provide status report"

**Expected Response**: AI should load the master index and provide a comprehensive status report.
```

### **Test 2: Session Creation**

```markdown
**AI Command**: "Initialize new session for testing setup - SESSION-250124-002"

**Expected Response**: AI should create a new session and confirm setup.
```

### **Test 3: Task Management**

```markdown
**AI Command**: "Create a new task for implementing user authentication"

**Expected Response**: AI should create a structured task and add it to the task registry.
```

### **Test 4: Session Recovery**

```markdown
**AI Command**: "Recover session SESSION-250124-002 and continue from last checkpoint"

**Expected Response**: AI should load the previous session context and continue seamlessly.
```

---

## 🎯 Customization Options

### **1. Automation Level**

Adjust automation in `automation-rules.json`:

```json
{
  "configuration": {
    "globalSettings": {
      "automationLevel": "medium",  // low, medium, high
      "humanOverride": true,
      "auditLogging": true
    }
  }
}
```

### **2. Session Persistence**

Configure session settings in `session-registry.json`:

```json
{
  "automation": {
    "autoSaveRules": {
      "intervals": {
        "context": "60 seconds",     // Adjust frequency
        "conversation": "120 seconds",
        "projectState": "10 minutes"
      }
    }
  }
}
```

### **3. Task Types**

Add custom task types in `task-registry.json`:

```json
{
  "taskTypes": {
    "research": {
      "description": "Research and investigation tasks",
      "priority": "medium",
      "estimatedDuration": "2-4 hours",
      "requiredSkills": ["research", "analysis"],
      "automationLevel": "low"
    }
  }
}
```

---

## 🚨 Troubleshooting

### **Common Issues**

**Issue**: AI agent not finding project context
**Solution**: Verify `index.mdc` exists in project root and contains correct paths

**Issue**: Session recovery not working
**Solution**: Check `projectDocs/tracking/sessions/session-registry.json` exists and is valid JSON

**Issue**: Task automation not triggering
**Solution**: Verify automation rules are enabled in `automation-rules.json`

### **Validation Commands**

```bash
# Check JSON validity
python -m json.tool projectDocs/core/master-index.json
python -m json.tool projectDocs/tasks/task-registry.json
python -m json.tool projectDocs/tracking/sessions/session-registry.json

# Check file structure
find projectDocs -name "*.json" | head -10
ls -la projectDocs/core/
ls -la projectDocs/tracking/sessions/
```

### **Reset to Defaults**

If something goes wrong, reset specific components:

```bash
# Reset task registry
cp projectDocs/tasks/task-registry.json projectDocs/tasks/task-registry.json.backup
# Then restore from starterKitv1 template

# Reset session registry
cp projectDocs/tracking/sessions/session-registry.json projectDocs/tracking/sessions/session-registry.json.backup
# Then restore from starterKitv1 template
```

---

## 📈 Next Steps

### **After Setup**

1. **Create Your First Real Session**:
   ```markdown
   "Initialize new session for [your first real task] - SESSION-250124-003"
   ```

2. **Add Your Project Tasks**:
   - Replace template tasks with real project tasks
   - Set up task dependencies
   - Configure automation rules

3. **Customize for Your Stack**:
   - Update technology-specific configurations
   - Add custom task types
   - Configure integration points

4. **Start Working**:
   - Use session persistence for all AI interactions
   - Let the system learn your patterns
   - Monitor automation effectiveness

### **Advanced Configuration**

- **Custom AI Agents**: Add specialized agents in `extensions/plugins/`
- **External Integrations**: Configure APIs in `extensions/integrations/`
- **Analytics Dashboards**: Set up reporting in `analytics/dashboards/`
- **Custom Workflows**: Create specialized workflows in `automation/workflows/`

---

## 🎉 Success Criteria

Your setup is complete when:

- ✅ AI agents can load project context from `index.mdc`
- ✅ Sessions are automatically saved and can be recovered
- ✅ Tasks are properly tracked and managed
- ✅ Automation rules are functioning
- ✅ All JSON files are valid and properly configured

**You're now ready to experience AI-optimized project management with complete session continuity!**

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Validate all JSON files for syntax errors
3. Verify file permissions and paths
4. Review the session logs in `tracking/recovery/`

The system is designed to be self-healing and will gracefully handle most issues automatically. 