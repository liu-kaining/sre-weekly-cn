"""Run with a Python environment containing Playwright and local Google Chrome."""

import os
from pathlib import Path
import unittest

from playwright.sync_api import sync_playwright, expect


GUIDE = Path(__file__).resolve().parent.parent / "index.html"
SCREENSHOTS = Path(os.environ.get("GUIDE_SCREENSHOT_DIR", "/tmp/delivery-guide-screenshots"))


class GuideBrowserTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(channel="chrome", headless=True)
        SCREENSHOTS.mkdir(parents=True, exist_ok=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def setUp(self):
        self.context = self.browser.new_context(
            viewport={"width": 1440, "height": 1000},
            reduced_motion="reduce",
            offline=True,
        )
        self.page = self.context.new_page()
        self.errors = []
        self.network = []
        self.page.on("pageerror", lambda error: self.errors.append(str(error)))
        self.page.on("request", lambda request: self.network.append(request.url) if request.url.startswith(("http:", "https:")) else None)
        self.page.goto(GUIDE.as_uri())
        self.page.wait_for_load_state("networkidle")

    def tearDown(self):
        self.context.close()
        self.assertEqual(self.errors, [], "Unexpected browser errors")
        self.assertEqual(self.network, [], "The local single-file guide requested network resources")

    def test_01_complete_desktop_and_navigation(self):
        expect(self.page.locator("article.chapter")).to_have_count(15)
        expect(self.page.get_by_role("heading", level=1)).to_contain_text("可靠交付")
        self.page.screenshot(path=str(SCREENSHOTS / "desktop-cover.png"))
        self.page.locator('.stage-grid a[href="#chapter-04"]').click()
        expect(self.page.locator("#chapter-04-title")).to_be_in_viewport()
        expect(self.page.locator('.chapter-link[data-chapter="chapter-04"]')).to_have_attribute("aria-current", "location")
        expect(self.page.locator("#outline-current")).to_have_text("CI · 持续集成")
        self.assertGreater(self.page.locator("#section-navigation a").count(), 5)
        first_target = self.page.locator("#section-navigation a").first
        target_id = first_target.get_attribute("href")
        first_target.click()
        expect(self.page.locator(target_id)).to_be_in_viewport()
        self.page.locator('.chapter-link[data-chapter="chapter-04"]').click()
        expect(self.page.locator("#chapter-04-title")).to_be_in_viewport()
        self.page.screenshot(path=str(SCREENSHOTS / "desktop-ci.png"))

    def test_02_full_text_search_keyboard_and_empty_result(self):
        self.page.keyboard.press("/")
        expect(self.page.locator("#search-dialog")).to_be_visible()
        self.page.locator("#search-input").fill("创建响应丢失")
        expect(self.page.locator(".search-result").first).to_be_visible()
        expect(self.page.locator("#search-results mark").first).to_have_text("创建响应丢失")
        self.page.locator("#search-input").press("Enter")
        expect(self.page.locator("#search-dialog")).not_to_be_visible()
        self.assertIn("#chapter-", self.page.url)
        self.page.locator("#search-open").click()
        self.page.locator("#search-input").fill("zz-no-such-guide-term-987")
        expect(self.page.locator(".search-empty")).to_contain_text("没有找到")
        self.page.locator("#search-input").fill('<img src=x onerror="alert(1)">')
        expect(self.page.locator(".search-empty")).to_be_visible()
        expect(self.page.locator("#search-results img")).to_have_count(0)
        self.page.keyboard.press("Escape")
        expect(self.page.locator("#search-dialog")).not_to_be_visible()

    def test_03_read_theme_and_practice_state_survive_reload(self):
        button = self.page.locator('#chapter-04 .mark-read')
        button.click()
        expect(self.page.locator("#read-count")).to_have_text("1 / 15")
        self.page.locator("#theme-toggle").click()
        expect(self.page.locator("html")).to_have_attribute("data-theme", "dark")
        task = self.page.locator("[data-task]").first
        task.check()
        self.page.reload()
        self.page.wait_for_load_state("networkidle")
        expect(self.page.locator("#read-count")).to_have_text("1 / 15")
        expect(self.page.locator('#chapter-04 .mark-read')).to_have_attribute("aria-pressed", "true")
        expect(self.page.locator("[data-task]").first).to_be_checked()
        expect(self.page.locator("html")).to_have_attribute("data-theme", "dark")
        self.page.locator('#chapter-04 .mark-read').click()
        expect(self.page.locator("#read-count")).to_have_text("0 / 15")

    def test_04_mobile_drawer_and_local_overflow(self):
        self.page.set_viewport_size({"width": 390, "height": 844})
        self.page.screenshot(path=str(SCREENSHOTS / "mobile-cover.png"))
        self.assertLessEqual(self.page.evaluate("document.documentElement.scrollWidth"), 391)
        self.page.locator("#menu-toggle").click()
        expect(self.page.locator("#sidebar")).to_be_visible()
        self.page.locator('.chapter-link[data-chapter="chapter-07"]').click()
        expect(self.page.locator("#sidebar")).not_to_be_visible()
        expect(self.page.locator("#menu-toggle")).to_have_attribute("aria-expanded", "false")
        expect(self.page.locator("#chapter-07-title")).to_be_in_viewport()
        self.assertLessEqual(self.page.evaluate("document.documentElement.scrollWidth"), 391)
        self.assertTrue(self.page.locator(".table-scroll").evaluate_all("els => els.some(e => e.scrollWidth > e.clientWidth)"))
        self.page.screenshot(path=str(SCREENSHOTS / "mobile-cd.png"))
        self.page.locator("#menu-toggle").click()
        self.page.keyboard.press("Escape")
        expect(self.page.locator("#sidebar")).not_to_be_visible()

    def test_05_complete_content_without_javascript(self):
        context = self.browser.new_context(java_script_enabled=False, offline=True)
        try:
            page = context.new_page()
            page.goto(GUIDE.as_uri())
            expect(page.locator("article.chapter")).to_have_count(15)
            expect(page.locator("#chapter-14")).to_be_visible()
            expect(page.locator("#chapter-11")).to_contain_text("对账机制不能凭空恢复外部系统没有暴露的证据")
            page.locator('.stage-grid a[href="#chapter-09"]').click()
            expect(page.locator("#chapter-09-title")).to_be_in_viewport()
        finally:
            context.close()

    def test_06_unavailable_storage_does_not_break_reading(self):
        self.page.add_init_script("Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } });")
        self.page.reload()
        self.page.wait_for_load_state("networkidle")
        self.page.locator("#theme-toggle").click()
        expect(self.page.locator("html")).to_have_attribute("data-theme", "dark")
        self.page.locator("#search-open").click()
        self.page.locator("#search-input").fill("幂等")
        expect(self.page.locator(".search-result").first).to_be_visible()
        self.page.keyboard.press("Escape")
        self.page.locator('#chapter-04 .mark-read').click()
        expect(self.page.locator("#read-count")).to_have_text("1 / 15")

    def test_07_code_copy_and_print_view(self):
        self.context.grant_permissions(["clipboard-read", "clipboard-write"])
        block = self.page.locator("#chapter-04 .code-block").first
        expected = block.locator("pre").text_content()
        block.locator(".copy-code").click()
        expect(block.locator(".copy-code")).to_contain_text("已复制")
        self.assertEqual(self.page.evaluate("navigator.clipboard.readText()"), expected)
        self.page.emulate_media(media="print")
        expect(self.page.locator("#sidebar")).not_to_be_visible()
        expect(self.page.locator(".topbar")).not_to_be_visible()
        expect(self.page.locator("#chapter-14")).to_be_visible()
        self.assertEqual(self.page.locator(".table-scroll").first.evaluate("el => getComputedStyle(el).overflowX"), "visible")

    def test_08_ime_confirmation_does_not_open_search_result(self):
        self.page.locator("#search-open").click()
        self.page.locator("#search-input").fill("部署")
        expect(self.page.locator(".search-result").first).to_be_visible()
        original_url = self.page.url
        self.page.locator("#search-input").dispatch_event(
            "keydown", {"key": "Enter", "isComposing": True}
        )
        expect(self.page.locator("#search-dialog")).to_be_visible()
        self.assertEqual(self.page.url, original_url)

    def test_09_immediate_enter_never_opens_a_stale_result(self):
        self.page.locator("#search-open").click()
        expect(self.page.locator(".search-result").first).to_be_visible()
        self.page.locator("#search-input").evaluate(
            """input => {
                input.value = 'no-such-guide-term-fast-987';
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new KeyboardEvent('keydown', {
                    key: 'Enter', bubbles: true, cancelable: true
                }));
            }"""
        )
        expect(self.page.locator("#search-dialog")).to_be_visible()
        expect(self.page.locator(".search-empty")).to_contain_text("没有找到")


if __name__ == "__main__":
    unittest.main(verbosity=2)
