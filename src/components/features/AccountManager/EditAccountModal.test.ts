import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const source = await readFile(new URL('./EditAccountModal.tsx', import.meta.url), 'utf8')

assert.match(source, /await updateAccount<Account>\(params\)/)
assert.doesNotMatch(source, /invoke(?:<[^>]+>)?\('update_account'/)

console.log('EditAccountModal updateAccount wiring looks correct')
