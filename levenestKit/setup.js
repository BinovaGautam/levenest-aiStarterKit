#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Levenest Template Library Setup Wizard
console.log('🚀 Levenest Template Library Setup Wizard');
console.log('==========================================\n');

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Template library paths
const TEMPLATE_INDEX_PATH = path.join(__dirname, 'templates', 'index.json');
const OUTPUT_CONFIG_PATH = path.join(process.cwd(), 'levenest-project-config.json');

// Load template library
function loadTemplateLibrary() {
  try {
    const templateData = fs.readFileSync(TEMPLATE_INDEX_PATH, 'utf8');
    return JSON.parse(templateData);
  } catch (error) {
    console.error('❌ Error loading template library:', error.message);
    console.error('Please ensure the template library is properly installed.');
    process.exit(1);
  }
}

// Project analysis functions
function analyzeProjectType(description) {
  const indicators = {
    wordpress: ['wordpress', 'wp-', 'theme', 'plugin', 'woocommerce', 'acf', 'gutenberg'],
    react: ['react', 'tsx', 'jsx', 'spa', 'next.js', 'hooks', 'components'],
    vue: ['vue', 'nuxt', 'composition api', 'vuex'],
    nodejs: ['node.js', 'express', 'api', 'backend', 'rest', 'graphql'],
    fullstack: ['full-stack', 'mern', 'mean', 'lamp', 'end-to-end']
  };

  const scores = {};
  const descLower = description.toLowerCase();

  for (const [type, keywords] of Object.entries(indicators)) {
    scores[type] = keywords.reduce((score, keyword) => {
      return score + (descLower.includes(keyword) ? 1 : 0);
    }, 0);
  }

  return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
}

function assessComplexity(description, teamSize = 'medium') {
  const complexityIndicators = {
    simple: ['landing page', 'blog', 'simple', 'basic', 'small'],
    medium: ['custom', 'responsive', 'integration', 'dashboard'],
    high: ['enterprise', 'advanced', 'microservices', 'scalable', 'complex']
  };

  const descLower = description.toLowerCase();
  let maxScore = 0;
  let complexity = 'medium';

  for (const [level, indicators] of Object.entries(complexityIndicators)) {
    const score = indicators.reduce((score, indicator) => {
      return score + (descLower.includes(indicator) ? 1 : 0);
    }, 0);

    if (score > maxScore) {
      maxScore = score;
      complexity = level;
    }
  }

  // Adjust based on team size
  if (teamSize === 'large') complexity = 'high';
  if (teamSize === 'small' && complexity === 'high') complexity = 'medium';

  return complexity;
}

// Template recommendation engine
function recommendTemplates(projectType, complexity, technologies) {
  const templateLibrary = loadTemplateLibrary();
  const recommendations = [];

  // Analyze agent team templates
  for (const [category, templates] of Object.entries(templateLibrary.agentTeamTemplates)) {
    for (const [templateId, template] of Object.entries(templates)) {
      let score = 0;
      let reasons = [];

      // Primary match - project type
      if (template.category === projectType || category === projectType) {
        score += 40;
        reasons.push(`Perfect match for ${projectType} projects`);
      }

      // Technology match
      if (template.technologies) {
        const techMatches = technologies.filter(tech =>
          template.technologies.some(templateTech =>
            templateTech.toLowerCase().includes(tech.toLowerCase())
          )
        );
        score += techMatches.length * 15;
        if (techMatches.length > 0) {
          reasons.push(`Supports ${techMatches.join(', ')}`);
        }
      }

      // Complexity match
      if (template.complexity === complexity) {
        score += 20;
        reasons.push(`Optimized for ${complexity} complexity`);
      } else if (template.complexity === 'medium' && complexity !== 'high') {
        score += 10;
        reasons.push('Flexible complexity level');
      }

      // Specialization match
      if (template.specializations) {
        const relevantSpecs = template.specializations.filter(spec =>
          technologies.some(tech => spec.toLowerCase().includes(tech.toLowerCase()))
        );
        score += relevantSpecs.length * 5;
        if (relevantSpecs.length > 0) {
          reasons.push(`Specialized in ${relevantSpecs.join(', ')}`);
        }
      }

      if (score > 20) { // Minimum threshold
        recommendations.push({
          templateId,
          template,
          score,
          confidence: Math.min(score / 100, 1),
          reasons,
          category
        });
      }
    }
  }

  return recommendations.sort((a, b) => b.score - a.score).slice(0, 3);
}

// Configuration generation
function generateConfiguration(selectedTemplate, customizations) {
  const timestamp = new Date().toISOString();

  return {
    levenestProjectConfig: {
      version: "1.0.0",
      createdAt: timestamp,
      setupMethod: "intelligent-template-wizard"
    },
    selectedTemplate: {
      templateId: selectedTemplate.templateId,
      templateName: selectedTemplate.template.templateName,
      category: selectedTemplate.category,
      confidence: selectedTemplate.confidence
    },
    agentTeamConfiguration: {
      sourceTemplate: selectedTemplate.template.templatePath,
      estimatedSetupTime: selectedTemplate.template.estimatedSetupTime,
      teamSize: selectedTemplate.template.teamSize,
      complexity: selectedTemplate.template.complexity
    },
    workflowIntegrations: selectedTemplate.template.workflowIntegrations || [],
    protocolIntegrations: selectedTemplate.template.protocolIntegrations || [],
    qualityStandards: selectedTemplate.template.qualityStandards || {},
    customizations: customizations,
    nextSteps: [
      `Copy agent team from: ${selectedTemplate.template.templatePath}`,
      "Configure development environment with required tools",
      "Initialize version control with recommended protocols",
      "Set up quality gates and testing procedures",
      "Begin development following template workflows"
    ]
  };
}

// Interactive setup wizard
async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function runSetupWizard() {
  try {
    console.log('📋 Project Analysis\n');

    // Project basics
    const projectName = await askQuestion('Project name: ');
    const projectDescription = await askQuestion('Project description (be specific about technologies and goals): ');

    // Technology detection
    console.log('\n🔍 Technology Analysis...');
    const projectType = analyzeProjectType(projectDescription);
    console.log(`Detected project type: ${projectType}`);

    const technologiesInput = await askQuestion('Technologies you\'re using (comma-separated, or press Enter for auto-detection): ');
    const technologies = technologiesInput ?
      technologiesInput.split(',').map(t => t.trim()) :
      [projectType];

    // Complexity assessment
    const teamSize = await askQuestion('Team size (small/medium/large) [medium]: ') || 'medium';
    const complexity = assessComplexity(projectDescription, teamSize);
    console.log(`Assessed complexity: ${complexity}`);

    // Generate recommendations
    console.log('\n🎯 Analyzing Templates...');
    const recommendations = recommendTemplates(projectType, complexity, technologies);

    if (recommendations.length === 0) {
      console.log('❌ No suitable templates found. You may need a custom configuration.');
      return;
    }

    // Display recommendations
    console.log('\n📊 Template Recommendations:\n');
    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec.template.templateName}`);
      console.log(`   Category: ${rec.category}`);
      console.log(`   Confidence: ${(rec.confidence * 100).toFixed(1)}%`);
      console.log(`   Team Size: ${rec.template.teamSize}`);
      console.log(`   Setup Time: ${rec.template.estimatedSetupTime}`);
      console.log(`   Why recommended: ${rec.reasons.join(', ')}`);
      console.log('');
    });

    // Template selection
    const selection = await askQuestion('Select template (1-3) [1]: ') || '1';
    const selectedIndex = parseInt(selection) - 1;

    if (selectedIndex < 0 || selectedIndex >= recommendations.length) {
      console.log('❌ Invalid selection');
      return;
    }

    const selectedTemplate = recommendations[selectedIndex];

    // Customization options
    console.log(`\n⚙️  Selected: ${selectedTemplate.template.templateName}`);
    const needsCustomization = await askQuestion('Do you need any customizations? (y/n) [n]: ') || 'n';

    let customizations = {};
    if (needsCustomization.toLowerCase() === 'y') {
      console.log('Customization options:');
      customizations.agentCapacities = await askQuestion('Custom agent capacities (JSON format) [{}]: ') || '{}';
      customizations.additionalTools = await askQuestion('Additional tools needed (comma-separated): ') || '';
      customizations.qualityOverrides = await askQuestion('Quality standard overrides (JSON format) [{}]: ') || '{}';
    }

    // Generate configuration
    console.log('\n🔧 Generating Configuration...');
    const configuration = generateConfiguration(selectedTemplate, customizations);
    configuration.projectInfo = {
      name: projectName,
      description: projectDescription,
      technologies,
      complexity,
      teamSize
    };

    // Save configuration
    fs.writeFileSync(OUTPUT_CONFIG_PATH, JSON.stringify(configuration, null, 2));

    // Success summary
    console.log('\n✅ Setup Complete!\n');
    console.log(`📁 Configuration saved to: ${OUTPUT_CONFIG_PATH}`);
    console.log(`🎯 Template: ${selectedTemplate.template.templateName}`);
    console.log(`⏱️  Estimated setup time: ${selectedTemplate.template.estimatedSetupTime}`);
    console.log(`👥 Agent team size: ${selectedTemplate.template.teamSize}`);

    console.log('\n🚀 Next Steps:');
    configuration.nextSteps.forEach((step, index) => {
      console.log(`   ${index + 1}. ${step}`);
    });

    console.log('\n📚 Documentation:');
    console.log('   - levenest/README-TEMPLATE-LIBRARY.md - Complete usage guide');
    console.log('   - levenest/templates/index.json - Browse all available templates');
    console.log(`   - ${selectedTemplate.template.templatePath} - Your selected template`);

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

// CLI argument handling
if (process.argv.includes('--list-templates')) {
  const templateLibrary = loadTemplateLibrary();
  console.log('📚 Available Templates:\n');

  for (const [category, templates] of Object.entries(templateLibrary.agentTeamTemplates)) {
    console.log(`${category.toUpperCase()}:`);
    for (const [templateId, template] of Object.entries(templates)) {
      console.log(`  - ${template.templateName} (${template.complexity}, ${template.teamSize})`);
    }
    console.log('');
  }
  process.exit(0);
}

if (process.argv.includes('--help')) {
  console.log('Levenest Template Library Setup Wizard\n');
  console.log('Usage:');
  console.log('  node levenest/setup.js              Run interactive setup wizard');
  console.log('  node levenest/setup.js --list-templates    List all available templates');
  console.log('  node levenest/setup.js --help             Show this help message');
  console.log('');
  process.exit(0);
}

// Run the interactive wizard
runSetupWizard();
