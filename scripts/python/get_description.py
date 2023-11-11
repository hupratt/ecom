# isbn_list = ["9789722230896", "9789720049759", "9789720049773"]
# isbn_list = ["9789720049773"]
liste_isbn = ["9789898729590"]
import logging
import os
import io
import requests
from PIL import Image
import tempfile
from selenium.webdriver.common.keys import Keys
from django.db import IntegrityError
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import locale
import re, json
import time
import os
import pandas as pd
from google_images_download import google_images_download
from sqlite3 import Error
import sqlite3
import os
import boto3
import uuid
from botocore.exceptions import NoCredentialsError
import botocore
from selenium.webdriver.common.by import By
import pathlib
import psycopg2
import logging
from django.template.defaultfilters import slugify
from selenium.common.exceptions import (
    NoSuchElementException,
    WebDriverException,
    ElementNotVisibleException,
    ElementClickInterceptedException,
    ElementNotInteractableException,
)
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver import FirefoxProfile, Firefox
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities


def make_webdriver():
    options = Options()
    # options.add_argument('--headless')
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument(
        "--user-agent=Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 640 XL LTE) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10166"
    )
    options.add_argument(
        "user-data-dir = /home/ubuntu/.config/google-chrome/Default"
    )  # Extract this path from "chrome://version/"
    driver = webdriver.Chrome("/usr/bin/chromedriver", chrome_options=options)
    return driver


def make_firefox_webdriver():
    cap = DesiredCapabilities().FIREFOX
    cap["marionette"] = False
    profile = FirefoxProfile("/home/hugo/.mozilla/firefox/19y53y6i.default/")
    profile.set_preference("browser.download.folderList", 2)
    profile.set_preference("browser.download.manager.showWhenStarting", False)
    profile.set_preference("browser.download.manager.alertOnEXEOpen", False)
    profile.set_preference("browser.download.manager.closeWhenDone", False)
    profile.set_preference("browser.download.manager.focusWhenStarting", False)
    profile.set_preference(
        "browser.helperApps.neverAsk.saveToDisk", "application/msexcel"
    )
    driver = Firefox()
    return driver


def grab_from_amazon(url, isbn, driver):
    search_query = "site:amazon.com.br " + str(isbn)
    driver.get(url)
    time.sleep(5)
    try:
        driver.find_element("name", "agree").click()
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    try:
        retry = driver.find_element("name", "p").send_keys(search_query)
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    time.sleep(0.5)
    try:
        driver.find_element("name", "p").send_keys(Keys.RETURN)
    except NoSuchElementException:
        pass
    time.sleep(2)
    soup = BeautifulSoup(driver.page_source, features="html.parser")
    try:
        cites = soup.find_all("a", class_="s-title")
    except NoSuchElementException:
        pass
    output = ""

    if len(cites) > 0:
        if len(cites[0].attrs["href"]) > 0:
            driver.get(cites[0].attrs["href"])
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            desc = soup.find(id="main-image")
            desc_p = ""
            if desc is not None and len(desc.get("src", "")) > 0:
                desc_p = desc["src"]
            return desc_p
    else:
        try:
            driver.get("https://www.google.com")
            time.sleep(5)
            driver.find_element(By.TAG_NAME, "input").send_keys(search_query)
            time.sleep(0.5)
            driver.find_element(By.TAG_NAME, "input").send_keys(Keys.RETURN)
            try:
                # driver.find_elements_by_tag_name("input")
                # driver.find_element(By.XPATH, '//li/a/input').click()
                el = driver.find_elements(By.CSS_SELECTOR, ".box form")
                if el is not None:
                    try:
                        el[0].click()
                    except IndexError:
                        pass
            except NoSuchElementException:
                pass
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            cites = soup.find_all("a")
            src = []
            for cite in cites:
                src.append(cite.attrs["href"])
            p = []
            for s in src:
                if s.find("/url?q", 0, 6) == 0 and ("google.com" not in s):
                    p.append(s)
            if len(p) != 0:
                driver.get("https://www.google.com" + p[0])
                time.sleep(5)
                soup = BeautifulSoup(driver.page_source, features="html.parser")
                desc = soup.find(id="main-image")
                desc_p = ""
                if desc is not None and len(desc.get("src", "")) > 0:
                    desc_p = desc["src"]
                return desc_p
            else:
                driver.get(url)

        except NoSuchElementException:
            pass


def grab_from_fnac(url, isbn, driver):
    search_query = "site:fnac.pt " + str(isbn)
    driver.get(url)
    try:
        driver.find_element("name", "agree").click()
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    try:
        search_query = driver.find_element("name", "p").send_keys(search_query)
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    try:
        driver.find_element("name", "p").send_keys(Keys.RETURN)
    except NoSuchElementException:
        pass
    time.sleep(5)
    soup = BeautifulSoup(driver.page_source, features="html.parser")
    try:
        cites = soup.find_all("a", class_="s-title")
    except NoSuchElementException:
        pass
    output = ""
    # desc['src']
    if len(cites) > 0:
        if len(cites[0].attrs["href"]) > 0:
            driver.get(cites[0].attrs["href"])
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            desc = soup.find("img", attrs={"class": "f-carousel__img"})
            desc_p = ""
            if desc is not None and len(desc.get("src", "")) > 0:
                desc_p = desc["src"]
            return desc_p
    else:
        return ""


def grab_from_bertrand(url, isbn, driver):
    search_query = "site:bertrand.pt " + str(isbn)
    time.sleep(2.5)
    driver.get(url)
    try:
        driver.find_element(By.ID, "scroll-down-btn").click()
    except NoSuchElementException:
        pass
    try:
        time.sleep(0.5)
        driver.find_element("name", "agree").click()
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    try:
        retry = driver.find_element("name", "p").send_keys(search_query)
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    time.sleep(0.5)
    try:
        driver.find_element("name", "p").send_keys(Keys.RETURN)
    except NoSuchElementException:
        pass
    time.sleep(5)
    soup = BeautifulSoup(driver.page_source, features="html.parser")
    try:
        cites = soup.find_all("a", class_="s-title")
    except NoSuchElementException:
        pass
    output = ""
    if len(cites) > 0:
        if len(cites[0].attrs["href"]) > 0:
            driver.get(cites[0].attrs["href"])
            try:
                driver.find_element(By.CLASS_NAME, "gpe-cookies-accept").click()
            except:
                ElementClickInterceptedException
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            desc = soup.find(id="productPageLeftSectionTop-images")
            desc_p = ""
            if desc != None and len(desc.find("img")) is not None:
                desc_p = desc.find("img")["src"]
            return desc_p
    else:
        try:
            driver.get("https://www.google.com")
            time.sleep(5)
            driver.find_element(By.TAG_NAME, "input").send_keys(search_query)
            time.sleep(0.5)
            driver.find_element(By.TAG_NAME, "input").send_keys(Keys.RETURN)
            try:
                # driver.find_elements_by_tag_name("input")
                # driver.find_element(By.XPATH, '//li/a/input').click()
                el = driver.find_elements(By.CSS_SELECTOR, ".box form")
                if el is not None:
                    try:
                        el[0].click()
                    except IndexError:
                        pass
            except NoSuchElementException:
                pass
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            cites = soup.find_all("a")
            src = []
            for cite in cites:
                src.append(cite.attrs["href"])
            p = []
            for s in src:
                if s.find("/url?q", 0, 6) == 0 and ("google.com" not in s):
                    p.append(s)
            if len(p) != 0:
                driver.get("https://www.google.com" + p[0])
                time.sleep(5)
                soup = BeautifulSoup(driver.page_source, features="html.parser")
                desc = soup.find(id="productPageLeftSectionTop-images")
                desc_p = ""
                if desc != None and len(desc.find("img")) is not None:
                    desc_p = desc.find("img")["src"]
                return desc_p
            else:
                return ""

        except NoSuchElementException:
            pass


def grab_from_franceloisir(url, isbn, driver):
    search_query = "site:franceloisirs.com " + str(isbn)
    time.sleep(2.5)
    driver.get(url)
    try:
        driver.find_element(By.ID, "scroll-down-btn").click()
    except NoSuchElementException:
        pass
    try:
        time.sleep(0.5)
        driver.find_element("name", "agree").click()
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    try:
        retry = driver.find_element("name", "p").send_keys(search_query)
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    time.sleep(0.5)
    try:
        driver.find_element("name", "p").send_keys(Keys.RETURN)
    except NoSuchElementException:
        pass
    time.sleep(5)
    soup = BeautifulSoup(driver.page_source, features="html.parser")
    try:
        cites = soup.find_all("a", class_="s-title")
    except NoSuchElementException:
        pass
    output = ""
    if len(cites) > 0:
        if len(cites[0].attrs["href"]) > 0:
            driver.get(cites[0].attrs["href"])
            try:
                driver.find_element(By.ID, "didomi-notice-agree-button").click()
                soup = BeautifulSoup(driver.page_source, features="html.parser")
                desc = soup.find("img", attrs={"class": "bigpic"})
                desc_p = ""
                if desc is not None and len(desc.get("src", "")) > 0:
                    desc_p = desc["src"].replace("//www", "www")
                return desc_p
            except NoSuchElementException:
                pass
    else:
        try:
            driver.get("https://www.google.com")
            time.sleep(5)
            driver.find_element(By.TAG_NAME, "input").send_keys(search_query)
            time.sleep(0.5)
            driver.find_element(By.TAG_NAME, "input").send_keys(Keys.RETURN)
            try:
                # driver.find_elements_by_tag_name("input")
                # driver.find_element(By.XPATH, '//li/a/input').click()
                el = driver.find_elements(By.CSS_SELECTOR, ".box form")
                if el is not None:
                    try:
                        el[0].click()
                    except IndexError:
                        pass
            except NoSuchElementException:
                pass
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            cites = soup.find_all("a")
            src = []
            for cite in cites:
                src.append(cite.attrs["href"])
            p = []
            for s in src:
                if s.find("/url?q", 0, 6) == 0 and ("google.com" not in s):
                    p.append(s)
            if len(p) != 0:
                driver.get("https://www.google.com" + p[0])
                time.sleep(5)
                soup = BeautifulSoup(driver.page_source, features="html.parser")
                desc = soup.find("img", attrs={"class": "bigpic"})
                desc_p = ""
                if desc is not None and len(desc.get("src", "")) > 0:
                    desc_p = desc["src"].replace("//www", "www")
                return desc_p
            else:
                return ""

        except NoSuchElementException:
            pass


def grab_from_wook(url, isbn, driver):
    search_query = "site:wook.pt " + str(isbn)
    driver.get(url)
    time.sleep(2.5)
    try:
        time.sleep(0.5)
        driver.find_element("name", "agree").click()
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    try:
        retry = driver.find_element("name", "p").send_keys(search_query)
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    time.sleep(0.5)
    try:
        driver.find_element("name", "p").send_keys(Keys.RETURN)
    except NoSuchElementException:
        pass
    time.sleep(5)
    soup = BeautifulSoup(driver.page_source, features="html.parser")
    try:
        cites = soup.find_all("a", class_="s-title")
    except NoSuchElementException:
        pass
    output = ""
    if len(cites) > 0:
        if len(cites[0].attrs["href"]) > 0:
            driver.get(cites[0].attrs["href"])
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            try:
                driver.find_element(By.CLASS_NAME, "gpe-cookies-accept").click()
            except NoSuchElementException:
                pass
            desc = soup.find("img", attrs={"class": "img-responsive"})
            desc_p = ""
            if desc is not None and len(desc.get("data-src", "")) > 0:
                desc_p = desc["data-src"]
            return desc_p.split(",")[0].split(" ")[0]
    else:
        try:
            driver.get("https://www.google.com")
            time.sleep(5)
            driver.find_element(By.TAG_NAME, "input").send_keys(search_query)
            time.sleep(0.5)
            driver.find_element(By.TAG_NAME, "input").send_keys(Keys.RETURN)
            try:
                # driver.find_elements_by_tag_name("input")
                # driver.find_element(By.XPATH, '//li/a/input').click()
                el = driver.find_elements(By.CSS_SELECTOR, ".box form")
                if el is not None:
                    try:
                        el[0].click()
                    except IndexError:
                        pass
            except NoSuchElementException:
                pass
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            cites = soup.find_all("a")
            src = []
            for cite in cites:
                src.append(cite.attrs["href"])
            p = []
            for s in src:
                if s.find("/url?q", 0, 6) == 0 and ("google.com" not in s):
                    p.append(s)
            if len(p) != 0:
                driver.get("https://www.google.com" + p[0])
                time.sleep(5)
                soup = BeautifulSoup(driver.page_source, features="html.parser")
                desc = soup.find("img", attrs={"class": "img-responsive"})
                desc_p = ""
                if desc is not None and len(desc.get("data-src", "")) > 0:
                    desc_p = desc["data-src"]
                return desc_p.split(",")[0].split(" ")[0]

        except NoSuchElementException:
            pass


def grab_from_decitre(url, isbn, driver):
    search_query = "site:decitre.fr " + str(isbn)
    driver.get(url)
    time.sleep(2.5)
    try:
        driver.find_element(By.ID, "scroll-down-btn").click()
    except NoSuchElementException:
        pass
    try:
        time.sleep(0.5)
        driver.find_element("name", "agree").click()
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    try:
        retry = driver.find_element("name", "p").send_keys(search_query)
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    time.sleep(0.5)
    try:
        driver.find_element("name", "p").send_keys(Keys.RETURN)
    except NoSuchElementException:
        pass
    time.sleep(5)
    soup = BeautifulSoup(driver.page_source, features="html.parser")
    try:
        cites = soup.find_all("a", class_="s-title")
    except NoSuchElementException:
        pass
    output = ""
    if len(cites) > 0:
        if len(cites[0].attrs["href"]) > 0:
            driver.get(cites[0].attrs["href"])
            try:
                driver.find_element(By.ID, "onetrust-accept-btn-handler").click()
            except NoSuchElementException:
                pass
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            desc = soup.find("picture", attrs={"class": "lozad lozad--loaded"})
            desc_p = ""
            if (
                desc is not None
                and len(desc.get("data-iesrc", "")) > 0
                and desc["data-iesrc"]
                != "https://products-images.di-static.com/image/rachid-benzine-les-silences-des-peres/9782021477764-200x303-1.jpg"
            ):
                desc_p = desc["data-iesrc"]
            return desc_p
    else:
        try:
            driver.get("https://www.google.com")
            time.sleep(5)
            driver.find_element(By.TAG_NAME, "input").send_keys(search_query)
            time.sleep(0.5)
            driver.find_element(By.TAG_NAME, "input").send_keys(Keys.RETURN)
            try:
                # driver.find_elements_by_tag_name("input")
                # driver.find_element(By.XPATH, '//li/a/input').click()
                el = driver.find_elements(By.CSS_SELECTOR, ".box form")
                if el is not None:
                    try:
                        el[0].click()
                    except IndexError:
                        pass
            except NoSuchElementException:
                pass
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            cites = soup.find_all("a")
            src = []
            for cite in cites:
                src.append(cite.attrs["href"])
            p = []
            for s in src:
                if s.find("/url?q", 0, 6) == 0 and ("google.com" not in s):
                    p.append(s)
            if len(p) != 0:
                driver.get("https://www.google.com" + p[0])
                time.sleep(5)
                soup = BeautifulSoup(driver.page_source, features="html.parser")
                desc = soup.find("picture", attrs={"class": "lozad lozad--loaded"})
                desc_p = ""
                if desc is not None and len(desc.get("data-iesrc", "")) > 0:
                    desc_p = desc["data-iesrc"]
                return desc_p
            else:
                return ""

        except NoSuchElementException:
            pass


def grab_from_eyrolles(url, isbn, driver):
    search_query = "site:eyrolles.com " + str(isbn)
    time.sleep(2.5)
    try:
        driver.find_element(By.ID, "scroll-down-btn").click()
    except NoSuchElementException:
        pass
    try:
        time.sleep(0.5)
        driver.find_element("name", "agree").click()
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    try:
        retry = driver.find_element("name", "p").send_keys(search_query)
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    time.sleep(0.5)
    try:
        driver.find_element("name", "p").send_keys(Keys.RETURN)
    except NoSuchElementException:
        pass
    time.sleep(5)
    soup = BeautifulSoup(driver.page_source, features="html.parser")
    try:
        cites = soup.find_all("a", class_="s-title")
    except NoSuchElementException:
        pass
    output = ""
    if len(cites) > 0:
        if len(cites[0].attrs["href"]) > 0:
            driver.get(cites[0].attrs["href"])
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            desc = soup.find("img", {"class": "w-100"})
            desc_p = ""
            if desc is not None and len(desc.get("src", "")) > 0:
                if desc["src"] != "h":
                    desc_p = desc["src"].replace("//", "https://")
                else:
                    desc_p = desc["src"]
            return desc_p
    else:
        try:
            driver.get("https://www.google.com")
            time.sleep(5)
            driver.find_element(By.TAG_NAME, "input").send_keys(search_query)
            time.sleep(0.5)
            driver.find_element(By.TAG_NAME, "input").send_keys(Keys.RETURN)
            try:
                # driver.find_elements_by_tag_name("input")
                # driver.find_element(By.XPATH, '//li/a/input').click()
                el = driver.find_elements(By.CSS_SELECTOR, ".box form")
                if el is not None:
                    try:
                        el[0].click()
                    except IndexError:
                        pass
            except NoSuchElementException:
                pass
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            cites = soup.find_all("a")
            src = []
            for cite in cites:
                src.append(cite.attrs["href"])
            p = []
            for s in src:
                if s.find("/url?q", 0, 6) == 0 and ("google.com" not in s):
                    p.append(s)
            if len(p) != 0:
                driver.get("https://www.google.com" + p[0])
                time.sleep(5)
                soup = BeautifulSoup(driver.page_source, features="html.parser")
                desc = soup.find("img", {"class": "w-100"})
                desc_p = ""
                if desc is not None and len(desc.get("src", "")) > 0:
                    if desc["src"] != "h":
                        desc_p = desc["src"].replace("//", "https://")
                    else:
                        desc_p = desc["src"]
                return desc_p
            else:
                return ""

        except NoSuchElementException:
            pass


def grab_from_ombresblanches(url, isbn, driver):
    search_query = "site:ombres-blanches.fr " + str(isbn)
    driver.get(url)
    try:
        driver.find_element("name", "agree").click()
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    try:
        retry = driver.find_element("name", "p").send_keys(search_query)
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    try:
        driver.find_element("name", "p").send_keys(Keys.RETURN)
    except NoSuchElementException:
        pass
    time.sleep(5)
    soup = BeautifulSoup(driver.page_source, features="html.parser")
    try:
        cites = soup.find_all("a", class_="s-title")
    except NoSuchElementException:
        pass
    output = ""
    if len(cites) > 0:
        if len(cites[0].attrs["href"]) > 0:
            driver.get(cites[0].attrs["href"])
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            desc = soup.find("img", {"class": "test1 imgcouv"})
            desc_p = ""
            if desc is not None and len(desc.get("src", "")) > 0:
                if desc["src"] != "h":
                    desc_p = desc["src"].replace("//", "https://")
                else:
                    desc_p = desc["src"]
            return desc_p
    else:
        try:
            driver.get("https://www.google.com")
            time.sleep(5)
            driver.find_element(By.TAG_NAME, "input").send_keys(search_query)
            time.sleep(0.5)
            driver.find_element(By.TAG_NAME, "input").send_keys(Keys.RETURN)
            try:
                # driver.find_elements_by_tag_name("input")
                # driver.find_element(By.XPATH, '//li/a/input').click()
                el = driver.find_elements(By.CSS_SELECTOR, ".box form")
                if el is not None:
                    try:
                        el[0].click()
                    except IndexError:
                        pass
            except NoSuchElementException:
                pass
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            cites = soup.find_all("a")
            src = []
            for cite in cites:
                src.append(cite.attrs["href"])
            p = []
            for s in src:
                if s.find("/url?q", 0, 6) == 0 and ("google.com" not in s):
                    p.append(s)
            if len(p) != 0:
                driver.get("https://www.google.com" + p[0])
                time.sleep(5)
                soup = BeautifulSoup(driver.page_source, features="html.parser")
                desc = soup.find("img", {"class": "test1 imgcouv"})
                desc_p = ""
                if desc is not None and len(desc.get("src", "")) > 0:
                    if desc["src"] != "h":
                        desc_p = desc["src"].replace("//", "https://")
                    else:
                        desc_p = desc["src"]
                return desc_p
            else:
                return ""

        except NoSuchElementException:
            pass


def grab_from_amazoncom(url, isbn, driver):
    search_query = "site:amazon.com " + str(isbn)
    driver.get(url)
    time.sleep(2.5)
    try:
        driver.find_element(By.ID, "scroll-down-btn").click()
    except NoSuchElementException:
        pass
    try:
        time.sleep(0.5)
        driver.find_element("name", "agree").click()
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    try:
        retry = driver.find_element("name", "p").send_keys(search_query)
    except NoSuchElementException:
        pass
    time.sleep(0.5)
    time.sleep(0.5)
    try:
        driver.find_element("name", "p").send_keys(Keys.RETURN)
    except NoSuchElementException:
        pass
    time.sleep(5)
    soup = BeautifulSoup(driver.page_source, features="html.parser")
    try:
        cites = soup.find_all("a", class_="s-title")
    except NoSuchElementException:
        pass
    output = ""
    if len(cites) > 0:
        if len(cites[0].attrs["href"]) > 0:
            driver.get(cites[0].attrs["href"])
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            desc = soup.find(id="main-image")
            desc_p = ""
            if desc is not None and len(desc.get("src", "")) > 0:
                desc_p = desc["src"]
            return desc_p
    else:
        try:
            driver.get("https://www.google.com")
            time.sleep(5)
            driver.find_element(By.TAG_NAME, "input").send_keys(search_query)
            time.sleep(0.5)
            driver.find_element(By.TAG_NAME, "input").send_keys(Keys.RETURN)
            try:
                # driver.find_elements_by_tag_name("input")
                # driver.find_element(By.XPATH, '//li/a/input').click()
                el = driver.find_elements(By.CSS_SELECTOR, ".box form")
                if el is not None:
                    try:
                        el[0].click()
                    except IndexError:
                        pass
            except NoSuchElementException:
                pass
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            cites = soup.find_all("a")
            src = []
            for cite in cites:
                src.append(cite.attrs["href"])
            p = []
            for s in src:
                if s.find("/url?q", 0, 6) == 0 and ("google.com" not in s):
                    p.append(s)
            if len(p) != 0:
                driver.get("https://www.google.com" + p[0])
                time.sleep(5)
                soup = BeautifulSoup(driver.page_source, features="html.parser")
                desc = soup.find(id="main-image")
                desc_p = ""
                if desc is not None and len(desc.get("src", "")) > 0:
                    desc_p = desc["src"]
                return desc_p
            else:
                return ""

        except NoSuchElementException:
            pass


def download_it(isbn, img_url, placeholderpath):
    filename, file_extension = os.path.splitext(img_url)
    path2file = os.path.join(placeholderpath, str(isbn))
    buffer = tempfile.SpooledTemporaryFile(max_size=1e9)
    # "Host": "img.bertrand.pt",
    headers = {
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "DNT": "1",
        "Connection": "keep-alive",
        "Cookie": "cf_bm=lCDRea5X.M9rLHBnQzgcjmil4eyON9i0cR7Bcsy.v3w-1692946198-0-Ael/iXcHHo+jOobdv247BFEV9csNb/c9e9Be6WIMasxRHckItFnPioDtoJP9h99uFvMWAPV7MBYxacGnSGFF5I8=; TS01f5daf1=01f2ba636c824a4dd72942774ce04106e6f79a68dc5b9ddb722a26497b2894fa6b64aa4b5243e29e6504ce02269a3c907145241aec",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Cache-Control": "max-age=0",
        "Sec-Ch-Ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "Windows",
        "Sec-Fetch-Site": "same-origin",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    }
    # proxies = {"http": r"http://user:password@16.170.236.181:8888"}

    r = requests.get(
        img_url,
        stream=True,
        headers=headers,
        # proxies=proxies,
    )
    if r.status_code == 200:
        downloaded = 0
        # filesize = int(r.headers["content-length"])
        for chunk in r.iter_content(chunk_size=1024):
            downloaded += len(chunk)
            buffer.write(chunk)
            # print(downloaded / filesize)
        buffer.seek(0)
        i = Image.open(io.BytesIO(buffer.read()))
        if not os.path.exists(path2file):
            os.mkdir(os.path.join(placeholderpath, str(isbn)))
        i.save(
            os.path.join(placeholderpath, str(isbn), f"{isbn}.{i.format}"), quality=100
        )
        logging.error(f"success: {isbn}: success")
    else:
        logging.error(f"{isbn},{img_url}")
    buffer.close()


def shouldDownloaded(placeholderpath, isbn):
    path2file = os.path.join(placeholderpath, str(isbn))
    if not os.path.exists(path2file):
        os.makedirs(path2file)
        return True
    if (
        len(
            [
                name
                for name in os.listdir(path2file)
                if os.path.isfile(os.path.join(path2file, name))
            ]
        )
        == 0
    ):
        return True
    print("skipping " + isbn)
    return False


def upload_to_aws(local_file, bucket, s3_file):
    s3 = boto3.client(
        "s3",
        aws_access_key_id="AKIAZUXRKAEIJ6K4QOPL",
        aws_secret_access_key="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",
    )
    try:
        s3.upload_file(local_file, bucket, s3_file)
    except FileNotFoundError:
        print("The file was not found")
    except NoCredentialsError:
        print("Credentials not available")


def uploadThis(placeholderpath, bucket):
    for folder in os.listdir(placeholderpath):
        for picture in os.listdir(os.path.join(placeholderpath, folder)):
            # isbn, file_extension = os.path.splitext(picture)
            imgpath = os.path.join(placeholderpath, folder, picture)
            # print(imgpath)
            # os.chdir(imgpath)
            if os.path.isfile(imgpath):
                try:
                    img = Image.open(imgpath)  # open the image file
                    img.verify()  # verify that it is, in fact an image
                    isbn, file_extension = os.path.splitext(imgpath)
                    s3_file = isbn + file_extension
                    # print(s3_file)
                    time.sleep(2)
                    upload_to_aws(imgpath, bucket, picture)
                except (IOError, SyntaxError) as e:
                    print(f"error: {imgpath}")
            else:
                print(f"error2: {imgpath}")


def create_connection():
    return psycopg2.connect(
        host="",
        database="",
        user="",
        password="",
    )


def select_all_books(conn):
    cur = conn.cursor()
    cur.execute("SELECT isbn FROM core_livre")
    rows = cur.fetchall()
    liste_isbn = []
    for row in rows:
        liste_isbn.append(row[0])
    return liste_isbn


def main():
    logging.basicConfig(filename="notfound.log", level=logging.ERROR)
    conn = create_connection()
    liste_isbn = select_all_books(conn)
    url = "https://fr.search.yahoo.com/"
    bucket = "bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb27"

    driver = make_webdriver()

    placeholderpath = "/home/ubuntu/Dev/ecom/ecom/frontend/static/thumbnails"

    uploadThis(placeholderpath, bucket)
    # for i, isbn in enumerate(liste_isbn):
    #     description = ""
    #     url = "https://yahoo.com.br/"
    #     # if shouldDownloaded(placeholderpath, isbn):
    #     #     description = grab_from_wook(url, str(isbn), driver)
    #     #     if description is None or len(description) == 0:
    #     #         description = grab_from_bertrand(url, str(isbn), driver)
    #     if description is None or len(description) == 0:
    #         description = grab_from_amazon(url, str(isbn), driver)
    #         if description is None or len(description) == 0:
    #             description = grab_from_decitre(url, str(isbn), driver)
    #             if description is None or len(description) == 0:
    #                 description = grab_from_eyrolles(url, str(isbn), driver)
    #                 if description is None or len(description) == 0:
    #                     description = grab_from_franceloisir(url, str(isbn), driver)
    #                     if description is None or len(description) == 0:
    #                         description = grab_from_amazoncom(url, str(isbn), driver)
    #     if len(description) != 0:
    #         if description[0] != "h":
    #             download_it(
    #                 str(isbn),
    #                 description.replace("www.", "http://www."),
    #                 placeholderpath,
    #             )
    #         else:
    #             download_it(str(isbn), description, placeholderpath)

    #         print(f"{isbn} saved on fs")
    #     else:
    #         logging.error(f"{isbn} has no img")
    #         print(f"{round(i+1 / len(liste_isbn))}%")


if __name__ == "__main__":
    main()
