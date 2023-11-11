from core.models import Livre, ImageLivre, LivreItem
import os, time
import requests
from django.core.files import File
import datetime
import pytz
import django.utils.encoding


def grab_media(placeholders):
    list_media = list()
    for i in os.listdir(placeholders):
        if os.path.isdir(os.path.join(placeholders, i)):
            for j in os.listdir(os.path.join(placeholders, i)):
                list_media.append((j, os.path.join(placeholders, i, j)))
                # print(os.path.join(placeholders, i, j))
    return list_media


def check_isbn_exists(isbn):
    try:
        return Livre.objects.get(isbn=isbn)
    except Livre.DoesNotExist:
        return False


def update_product(filename, picture_path):
    isbn, file_extension = os.path.splitext(filename)
    book_instance = check_isbn_exists(isbn)
    if isinstance(book_instance, Livre):
        try:
            time.sleep(1)
            file_instance = File(open(picture_path, "rb"), name=filename)
            image_instance = ImageLivre(
                livre=book_instance,
                image=file_instance,
                alt=f"Book import image for isbn: {isbn}",
            )
            image_instance.save()
        except Exception as e:
            print(e)
    else:
        print(f"{isbn} could not be found on the db")


def update_books_into_postgres():
    MEDIA = "/home/ubuntu/Dev/ecom/ecom/frontend/static/thumbnails"
    pictures_list = grab_media(MEDIA)
    for item in pictures_list:
        (picture, picture_path) = item
        update_product(picture, picture_path)


update_books_into_postgres()

# MEDIA = "/home/ubuntu/Dev/ecom/ecom/frontend/static/thumbnails"
# pictures_list = grab_media(MEDIA)
# (picture, picture_path) = pictures_list[0]
# isbn, file_extension = os.path.splitext(picture)
# book_instance = check_isbn_exists(isbn)
# file_instance = File(open(picture_path, "rb"), name=picture)
# image_instance = ImageLivre(
# livre=book_instance,
# image=file_instance,
# alt=f"Book import image for isbn: {isbn}",
# )

# image_instance.save()

"""
check for dups
check for null values in isbn
migrate to the new model of isbns
delete existing images
"""
