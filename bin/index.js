#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { execSync } = require('child_process')

const log = (msg) => console.log(chalk.green(msg))
const error = (msg) => console.error(chalk.red(msg))

async function createProject() {
	const projectName = process.argv[2] || 'larana-js-app'
	const projectPath = path.resolve(process.cwd(), projectName)
	const templatePath = path.resolve(__dirname, '../template') // Path to initial structure

	log(`Creating project: ${projectName}`)
	await fs.ensureDir(projectPath)

	// Initialize `package.json`
	log('Initializing package.json...')
	process.chdir(projectPath)
	execSync('npm init -y', { stdio: 'inherit' })

	// Install `larana-js`
	log('Installing larana-js...')
	execSync('npm install larana-js', { stdio: 'inherit' })

	// Copy initial file structure
	log('Setting up initial file structure...')
	await fs.copy(templatePath, projectPath)

	log('Project setup complete!')
}

async function main() {
	try {
		createProject()
	} catch (err) {
		error(`An error occurred: ${err.message}`)
		process.exit(1)
	}
}

main()
