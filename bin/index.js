#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const log = (msg) => console.log(`\x1b[32m%s\x1b[0m`, msg)
const error = (msg) => console.error(`\x1b[31m%s\x1b[0m`, msg)

function ensureDir(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true })
	}
}

function copyDirectory(srcDir, destDir) {
	const entries = fs.readdirSync(srcDir, { withFileTypes: true })
	for (const entry of entries) {
		const srcPath = path.join(srcDir, entry.name)
		const destPath = path.join(destDir, entry.name)
		if (entry.isDirectory()) {
			ensureDir(destPath)
			copyDirectory(srcPath, destPath)
			continue
		}
		if (entry.name === '_gitignore') {
			fs.copyFileSync(srcPath, path.join(destDir, '.gitignore'))
		} else {
			fs.copyFileSync(srcPath, destPath)
		}
	}
}

function createProject() {
	const projectName = process.argv[2] || 'larana-js-app'
	const projectPath = path.resolve(process.cwd(), projectName)
	const templatePath = path.resolve(__dirname, '../template')

	log(`Creating project: ${projectName}`)
	ensureDir(projectPath)

	log('Initializing package.json...')
	process.chdir(projectPath)
	execSync('npm init -y', { stdio: 'inherit' })

	log('Installing larana-js...')
	execSync('npm install larana-js', { stdio: 'inherit' })

	log('Setting up initial file structure...')
	copyDirectory(templatePath, projectPath)

	log('Project setup complete!')
}

function main() {
	try {
		createProject()
	} catch (err) {
		error(`An error occurred: ${err.message}`)
		process.exit(1)
	}
}

main()
