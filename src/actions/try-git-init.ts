import { execSync } from 'child_process'
import path from 'path'
import rimraf from 'rimraf'

function isInGitRepository(): boolean {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' })
    return true
  } catch (_) {}
  return false
}

function tryGitInit(root: string): boolean {
  let didInit = false
  try {
    execSync('git --version', { stdio: 'ignore' })
    if (isInGitRepository()) {
      return false
    }

    execSync('git init', { stdio: 'ignore' })
    didInit = true

    execSync('git checkout -b main', { stdio: 'ignore' })

    execSync('git add -A', { stdio: 'ignore' })
    execSync('git commit -m "Initial commit using Create Hardhat DApp"', {
      stdio: 'ignore',
    })
    return true
  } catch (e) {
    if (didInit) {
      try {
        rimraf.sync(path.join(root, '.git'))
      } catch (_) {}
    }
    return false
  }
}

export default tryGitInit
