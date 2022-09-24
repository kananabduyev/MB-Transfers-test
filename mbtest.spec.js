const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
require('chromedriver');

describe('mbtest', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('mbtest', async function() {
    await driver.get("https://pre-cb.kapitalbank.az/login")
    await driver.manage().window().setRect({ width: 1527, height: 810 })
    await driver.findElement(By.css("#loginWithGoogleForm .border_bttn")).click()
    await driver.findElement(By.linkText("Köçürmələr")).click()
    await driver.findElement(By.linkText("Köçürmə yarat")).click()
    await driver.findElement(By.id("fromAccountId")).click()
    {
      const dropdown = await driver.findElement(By.id("fromAccountId"))
      await dropdown.findElement(By.xpath("//option[. = 'AZ74AIIB38060019441703544120 / 205663.75 AZN']")).click()
    }
    await driver.findElement(By.id("fromPaymentPurposeId")).click()
    await driver.findElement(By.id("fromPaymentPurposeId")).sendKeys("test")
    await driver.findElement(By.id("fromPaymentPurposeId2")).click()
    await driver.findElement(By.id("fromPaymentPurposeId2")).sendKeys("test2")
    {
      const element = await driver.findElement(By.id("approveInternalTransfer"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    await driver.findElement(By.id("approveInternalTransfer")).click()
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css(".swal-button--default")).click()
    await driver.findElement(By.css(".nav-item:nth-child(1) .link-title")).click()
    await driver.close()
  })
})
