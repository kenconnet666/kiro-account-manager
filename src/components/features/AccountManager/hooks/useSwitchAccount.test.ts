import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const source = await readFile(new URL('./useSwitchAccount.ts', import.meta.url), 'utf8')

test('CLI-only switching does not require Kiro IDE', () => {
  assert.match(
    source,
    /if \(switchTarget === 'ide' \|\| switchTarget === 'both'\) \{\s+const ideInfo = await checkIdeInstallation/
  )
})

test('CLI switch and logout errors propagate to the result dialog', () => {
  assert.doesNotMatch(source, /console\.warn\('\[Switch\] CLI 切号失败:/)
  assert.doesNotMatch(source, /console\.warn\('\[Logout\] CLI 退出登录失败:/)
  assert.match(source, /if \(!cliPath\) \{\s+throw new Error\('未检测到 Kiro CLI 数据库'\)/)
  assert.match(source, /await switchToCliAccount\(refreshedAccount\.id, cliPath\)/)
})
